import { Props as PillProps } from '../../shared/Pill';
import { CATEGORY } from '@prisma/client';

export function getCategoryProps(category: CATEGORY): PillProps {
  switch (category) {
    case CATEGORY.CAR:
      return { label: 'Vehículo', color: 'sky' };

    case CATEGORY.ENTERTAINMENT:
      return { label: 'Entretenimiento', color: 'purple' };

    case CATEGORY.FOOD:
      return { label: 'Comida', color: 'rose' };

    case CATEGORY.HOME:
      return { label: 'Hogar', color: 'yellow' };

    case CATEGORY.PAYMENT:
      return { label: 'Pago', color: 'teal' };

    case CATEGORY.SERVICE:
      return { label: 'Servicio', color: 'pink' };

    case CATEGORY.OTHER:
      return { label: 'Otro', color: 'teal' };

    default:
      return { label: 'ERROR', color: 'gray' };
  }
}
