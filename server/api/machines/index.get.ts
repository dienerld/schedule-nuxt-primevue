import * as Luxon from 'luxon';

export default eventHandler(async (event) => {
  const db = useDB();
  const { date: dateTimestamp } = getQuery(event);
  const luxonDate = Luxon.DateTime.fromJSDate(
    new Date(Number(dateTimestamp?.toString())),
  ).set({
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
  });

  const date = {
    start: luxonDate.toJSDate().getTime(),
    end: luxonDate.plus({ days: 1 }).toJSDate().getTime(),
  };

  // busca maquinas que estão vazias no dia $1
  const machines = await db
    .select()
    .from(tables.machine)
    .rightJoin(tables.schedule, eq(tables.machine.id, tables.schedule.machine))
    .where(between(tables.schedule.day, date.start, date.end));

  console.log(machines);

  return machines;
});
