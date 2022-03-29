import { format } from 'date-fns';

export function formatSimpleDate(givenDate: Date | string) {
  if (givenDate == null || isNaN(Date.parse(givenDate.toString()))) {
    return '-';
  }

  const date = new Date(givenDate);

  return format(date, 'yyyy-MM-dd');
}
