import { z, zh } from 'h3-zod';
import { authMiddleware } from '~~/server/middlewares/auth.middleware';

export default eventHandler(async (event) => {
  await authMiddleware(event);
  const db = useDB();
  const { user } = await getUserSession(event);
  const { id } = await zh.useValidatedParams(
    event,
    z.object({ id: z.coerce.number() }),
  );

  const res = await db
    .delete(tables.schedule)
    .where(
      and(eq(tables.schedule.id, id), eq(tables.schedule.userId, user!.id)),
    )
    .run();

  if (res.rowsAffected === 0) {
    throw createError({
      statusCode: 404,
      message: 'Schedule not found',
    });
  }
});
