import * as Luxon from 'luxon';
import { z, zh } from 'h3-zod';
import { authMiddleware } from '~~/server/middlewares/auth.middleware';

type ScheduleWithUser = Omit<Schedule, 'userId'> & {
  user: Omit<User, 'password' | 'phone' | 'apartment'> & {
    number: number;
  };
};

export default eventHandler(async (event) => {
  await authMiddleware(event);
  const db = useDB();
  const { date: dateQuery } = await zh.useValidatedQuery(
    event,
    z.object({
      date: z.coerce.number().optional().default(new Date().getTime()),
    }),
  );

  const luxonDate = Luxon.DateTime.fromJSDate(new Date(dateQuery)).set({
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
  });

  const date = {
    start: luxonDate.toJSDate().getTime(),
    end: luxonDate
      .set({
        hour: 23,
        minute: 59,
        second: 59,
      })
      .toJSDate()
      .getTime(),
  };

  const schedules = await db
    .select({
      id: tables.schedule.id,
      machine: tables.machine.name,
      day: tables.schedule.day,
      shift: tables.schedule.shift,
      user: {
        name: tables.user.name,
        number: tables.user.apartment,
        id: tables.user.id,
      },
    })
    .from(tables.schedule)
    .leftJoin(tables.machine, eq(tables.machine.id, tables.schedule.machine))
    .innerJoin(tables.user, eq(tables.user.id, tables.schedule.userId))
    .where(between(tables.schedule.day, date.start, date.end));

  // agrupa os agendamentos por turno
  const groupByShift = schedules.reduce((acc, schedule) => {
    const scheduleAdapter = {
      ...schedule,
      machine: Number(schedule.machine),
    };

    if (!acc[schedule.shift]) {
      acc[schedule.shift] = [scheduleAdapter];
    } else {
      acc[schedule.shift].push(scheduleAdapter);
    }
    return acc;
  }, {} as Record<string, ScheduleWithUser[]>);

  return groupByShift;
});
