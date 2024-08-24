import { between } from 'drizzle-orm';
import { zh, z } from 'h3-zod';
import { authMiddleware } from '~~/server/middlewares/auth.middleware';

export default eventHandler(async (event) => {
  await authMiddleware(event);
  const { schedules: scheduleConfig } = useRuntimeConfig().app;
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

  const day = useLuxon(body.day);

  if (!user) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized',
    });
  }

  const schedule = await db
    .select()
    .from(tables.schedule)
    .where(
      and(
        eq(tables.schedule.machine, body.machine),
        between(tables.schedule.day, day.start.toMillis(), day.end.toMillis()),
        eq(tables.schedule.shift, body.shift),
      ),
    )
    .get();

  if (schedule) {
    throw createError({
      statusCode: 409,
      message: 'Agendamento já existe.',
    });
  }

  const dateBetween = useLuxon(body.day);

  dateBetween.start = dateBetween.start.minus({
    days: scheduleConfig.cooldownInDays,
  });
  dateBetween.end = dateBetween.end.plus({
    days: scheduleConfig.cooldownInDays,
  });

  const nearestSchedules = await db
    .select({
      day: tables.schedule.day,
    })
    .from(tables.schedule)
    .where(
      and(
        eq(tables.schedule.userId, user.id),
        between(
          tables.schedule.day,
          dateBetween.start.toMillis(),
          dateBetween.end.toMillis(),
        ),
      ),
    );

  if (nearestSchedules.length > 0) {
    throw createError({
      statusCode: 400,
      message: 'Você possui agendamentos próximos, não é possível agendar.',
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
