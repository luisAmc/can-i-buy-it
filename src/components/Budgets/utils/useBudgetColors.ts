import { CATEGORY } from '@prisma/client';

export function useBudgetColors(category: CATEGORY) {
  switch (category) {
    case CATEGORY.ENTERTAINMENT:
      return 'bg-category-entertainment-100 border-category-entertainment-200';

    case CATEGORY.HOME:
      return 'bg-category-home-100 border-category-home-200';

    case CATEGORY.CAR:
      return 'bg-category-car-100 border-category-car-200';

    case CATEGORY.SERVICE:
      return 'bg-category-service-100 border-category-service-200';

    case CATEGORY.FOOD:
      return 'bg-category-food-100 border-category-food-200';

    case CATEGORY.OTHER:
      return 'bg-gray-100 border-gray-200';

    default:
      return '';
  }
}
