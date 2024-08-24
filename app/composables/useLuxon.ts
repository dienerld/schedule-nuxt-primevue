import * as luxon from 'luxon';

/**
 * Use luxon to format dates
 * @param date
 * @default Date.now()
 * @returns {import('luxon').DateTime}
 */
export function useLuxon(date: Date | number = Date.now()): luxon.DateTime {
  if (typeof date === 'number') {
    date = new Date(date);
  }

  return luxon.DateTime.fromJSDate(date);
}
