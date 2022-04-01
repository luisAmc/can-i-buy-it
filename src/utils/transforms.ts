import { format } from 'date-fns';
import { es as esLocale } from 'date-fns/locale';

export function formatSimpleDate(givenDate: Date | string) {
  if (givenDate == null || isNaN(Date.parse(givenDate.toString()))) {
    return '-';
  }

  const date = new Date(givenDate);

  return format(date, 'yyyy-MM-dd');
}

export function formatDate(
  givenDate: Date | string,
  type: 'extended' | 'short' = 'short'
) {
  const date = new Date(givenDate);
  return format(date, type === 'extended' ? 'EEEE, dd MMMM yy' : 'dd/MM/yy', {
    locale: esLocale
  });
}

export function formatDatetime(
  givenDate: Date | string,
  type: 'extended' | 'short' = 'short'
) {
  const date = new Date(givenDate);
  return format(date, type === 'extended' ? 'EEEE, dd MMMM yy hh:mm aaa' : 'dd/MM/yy hh:mm aaa', {
    locale: esLocale
  });
}

export function formatCurrency(amount: number) {
  if (amount == null || isNaN(amount)) {
    return '-';
  }

  const currencyAmount = new Intl.NumberFormat('es-HN', {
    style: 'currency',
    currency: 'HNL'
  }).format(amount);

  return currencyAmount;
}
