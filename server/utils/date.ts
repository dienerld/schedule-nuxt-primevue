import * as luxon from 'luxon';
luxon.Settings.defaultLocale = 'pt-BR';
luxon.Settings.defaultZone = 'America/Sao_Paulo';

export function useLuxon(date: Date | number) {
  if (typeof date === 'number') {
    date = new Date(date);
  }

  const luxonDate = luxon.DateTime.fromJSDate(date).set({
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
  });

  return {
    start: luxonDate,
    end: luxonDate.set({
      hour: 23,
      minute: 59,
      second: 59,
    }),
  };
}
