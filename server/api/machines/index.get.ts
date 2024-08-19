import * as Luxon from 'luxon';
import { z } from 'zod';
import { zh } from 'h3-zod';
export default eventHandler(async (event) => {
  const db = useDB();
  const { date: dateTimestamp, shift } = await zh.useValidatedQuery(
    event,
    z.object({
      date: z.coerce.number(),
      shift: z.enum(['afternoon', 'morning']),
    }),
  );
  const luxonDate = Luxon.DateTime.fromJSDate(new Date(dateTimestamp)).set({
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
  });

  const date = {
    start: luxonDate.toJSDate().getTime(),
    end: luxonDate.plus({ days: 1 }).toJSDate().getTime(),
  };

  /**
   * Busca máquinas que estão habilitadas e não possuem agendamentos no intervalo de data especificado (date.start e date.end) para o turno especificado (shift).
   * A consulta utiliza um LEFT JOIN para associar máquinas com seus agendamentos, e o filtro `isNull(tables.schedule.id)` garante que apenas as máquinas
   * que sem agendamentos para o período e turno especificados sejam retornadas. Isso permite identificar as máquinas disponíveis para novos agendamentos.
   */
  const machines = await db
    .select({
      id: tables.machine.id,
      name: tables.machine.name,
      enabled: tables.machine.enabled,
    })
    .from(tables.machine)
    .leftJoin(
      tables.schedule,
      and(
        eq(tables.machine.id, tables.schedule.machine),
        eq(tables.schedule.shift, shift),
        between(tables.schedule.day, date.start, date.end),
      ),
    )
    .where(
      and(
        eq(tables.machine.enabled, true),
        isNull(tables.schedule.id), // Filtra para máquinas que não têm agendamento
      ),
    );

  return machines;
});
