import { between, count } from 'drizzle-orm';
import * as Luxon from 'luxon';
type Shift = 'morning' | 'afternoon';

const shifts: Record<Shift, { name: string; available: number }> = {
  morning: { name: 'Manhã', available: 0 },
  afternoon: { name: 'Tarde', available: 0 },
};

// Define luxon timezone
Luxon.Settings.defaultLocale = 'pt-BR';
Luxon.Settings.defaultZone = 'America/Sao_Paulo';

export default eventHandler(
  async (
    event,
  ): Promise<
    Array<{
      id: string;
      name: string;
      available: number;
    }>
  > => {
    const db = useDB();
    const { date: dateTimestamp } = getQuery(event);
    const jsDate = new Date(Number(dateTimestamp?.toString()));

    const startDay = Luxon.DateTime.fromJSDate(jsDate).set({
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    });
    const endDay = startDay.plus({ days: 1 });

    const schedules = await db
      .select()
      .from(tables.schedule)
      .where(
        between(
          tables.schedule.day,
          startDay.toJSDate().getTime(),
          endDay.toJSDate().getTime(),
        ),
      );

    // marcações por turno
    const schedulesByShift = schedules.reduce((acc, schedule) => {
      if (!acc[schedule.shift]) {
        acc[schedule.shift] = 1;
      } else {
        acc[schedule.shift] += 1;
      }
      return acc;
    }, {} as Record<Shift, number>);

    const machines = await db
      .select({ total: count(tables.machine.name) })
      .from(tables.machine)
      .where(eq(tables.machine.enabled, true))
      .get();

    if (!machines) {
      return [];
    }

    // Quantidade de maquinas é a qtd de marcações do turno disponível
    shifts.morning.available = machines.total;
    shifts.afternoon.available = machines.total;

    // remove de available o qtd de marcações do turno que foram marcadas
    for (const _key in schedulesByShift) {
      const key = _key as Shift;
      shifts[key].available -= schedulesByShift[key];
    }

    const shiftToReturn = [];

    for (const _key in shifts) {
      const key = _key as Shift;
      const shift = shifts[key];
      if (shift.available > 0) {
        shiftToReturn.push({
          id: key,
          name: shift.name,
          available: shift.available,
        });
      }
    }

    return shiftToReturn;
  },
);
