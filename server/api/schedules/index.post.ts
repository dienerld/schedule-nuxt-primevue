import * as luxon from 'luxon';
import { between } from 'drizzle-orm';
import { zh } from 'h3-zod';
import { z } from 'zod';

export default eventHandler(async (event) => {
  const db = useDB();
  const { user } = await getUserSession(event);
  const body = await zh.useValidatedBody(
    event,
    z.object({
      machine: z.number(),
      day: z.number(),
      shift: z.enum(['afternoon', 'morning']),
    }),
  );

  if (!user) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized',
    });
  }
  const luxonDate = luxon.DateTime.fromJSDate(new Date(body.day)).set({
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
  });
  const day = {
    start: luxonDate.toJSDate().getTime(),
    end: luxonDate.plus({ days: 1 }).toJSDate().getTime(),
  };
  const schedule = await db
    .select()
    .from(tables.schedule)
    .where(
      and(
        eq(tables.schedule.machine, body.machine),
        between(tables.schedule.day, day.start, day.end),
        eq(tables.schedule.shift, body.shift),
      ),
    )
    .get();

  if (schedule) {
    throw createError({
      statusCode: 409,
      message: 'Schedule already exists',
    });
  }

  const scheduleSaved = await db
    .insert(tables.schedule)
    .values({
      day: body.day,
      machine: body.machine,
      shift: body.shift,
      userId: user.id,
    })
    .returning()
    .get();

  return {
    success: true,
    data: scheduleSaved,
  };
});
