import { builder } from '../builder';

builder.prismaObject('Budget', {
  findUnique: (budget) => ({ id: budget.id }),
  fields: (t) => ({
    id: t.exposeID('id'),
    category: t.exposeString('category'),
    limit: t.exposeFloat('limit')
  })
});
