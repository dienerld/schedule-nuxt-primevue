import * as Luxon from 'luxon';

export function getDate(dateJS: Date): Date {
  const dateLuxon = Luxon.DateTime.fromJSDate(dateJS);
  dateLuxon.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });

  return dateLuxon.toJSDate();
}
