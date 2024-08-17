export default eventHandler(async (event) => {
  // const { date: dateTimestamp } = getQuery(event);
  // const date = new Date(Number(dateTimestamp));

  const machines = await useDB().select().from(tables.machine).all();

  return machines;
});
