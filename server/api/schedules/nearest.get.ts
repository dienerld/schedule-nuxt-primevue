import { asc, desc } from 'drizzle-orm';
import { authMiddleware } from '~~/server/middlewares/auth.middleware';

type ScheduleWithoutUserId = Omit<Schedule, 'userId'>;
export default eventHandler(async (event) => {
  await authMiddleware(event);

  const db = useDB();
  const { user } = await getUserSession(event)!;

  const todayTimestamp = Date.now();

  const schedules = await db
    .select({
      id: tables.schedule.id,
      machine: tables.schedule.machine,
      day: tables.schedule.day,
      shift: tables.schedule.shift,
    })
    .from(tables.schedule)
    .where(
      or(
        and(
          lte(tables.schedule.day, todayTimestamp),
          eq(tables.schedule.userId, user!.id),
        ),
        and(
          gte(tables.schedule.day, todayTimestamp),
          eq(tables.schedule.userId, user!.id),
        ),
      ),
    )
    .orderBy(
      asc(tables.schedule.day), // Primeiro, ordena pelo dia em ordem crescente para pegar o mais próximo no futuro
      asc(tables.schedule.shift), // Em seguida, ordena pelo turno em ordem crescente para o futuro
      desc(tables.schedule.day), // Então, ordena pelo dia em ordem decrescente para pegar o mais próximo no passado
      desc(tables.schedule.shift), // Finalmente, ordena pelo turno em ordem decrescente para o passado
    )
    .limit(2); // Limita o resultado a 2, um do passado e um do futuro

  const response: Record<'older' | 'newer', ScheduleWithoutUserId | undefined> =
    {
      older: undefined,
      newer: undefined,
    };

  if (schedules.length === 1) {
    if (schedules[0].day < todayTimestamp) response.older = schedules[0];
    else response.newer = schedules[0];
  } else if (schedules.length === 2) {
    response.older = schedules[0];
    response.newer = schedules[1];
  }

  return response;
});
