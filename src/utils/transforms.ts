import { format } from 'date-fns';
import { es as esLocale } from 'date-fns/locale';

export function formatSimpleDate(givenDate: Date | string) {
  if (givenDate == null || isNaN(Date.parse(givenDate.toString()))) {
    return '-';
  }

  const date = new Date(givenDate);

  return format(date, 'yyyy-MM-dd');
}

export function formatDate(givenDate: Date) {
  return format(givenDate, 'EEEE, dd MMMM yy', { locale: esLocale });
}
