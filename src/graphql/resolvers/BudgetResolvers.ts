import { CATEGORY } from '@prisma/client';
import { db } from 'src/utils/prisma';
import { builder } from '../builder';

builder.prismaObject('Budget', {
  findUnique: (budget) => ({ id: budget.id }),
  fields: (t) => ({
    id: t.exposeID('id'),
    category: t.exposeString('category'),
    limit: t.exposeFloat('limit'),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' })
  })
});

builder.queryField('budget', (t) =>
  t.prismaField({
    type: 'Budget',
    args: { id: t.arg.id() },
    resolve: (query, _parent, { id }, { session }) => {
      return db.budget.findFirst({
        ...query,
        where: {
          id: id,
          userId: session!.userId
        },
        rejectOnNotFound: true
      });
    }
  })
);

const UpdateBudgetInput = builder.inputType('UpdateBudgetInput', {
  fields: (t) => ({
    id: t.id(),
    limit: t.float(),
    category: t.string()
  })
});

builder.mutationField('updateBudget', (t) =>
  t.prismaField({
    type: 'Budget',
    args: { input: t.arg({ type: UpdateBudgetInput }) },
    resolve: async (query, _parent, { input }, { session }) => {
      const budget = await db.budget.findFirst({
        where: {
          id: input.id,
          userId: session!.userId
        },
        rejectOnNotFound: true
      });

      return db.budget.update({
        ...query,
        where: {
          id: budget.id
        },
        data: {
          limit: input.limit,
          category: CATEGORY[input.category as keyof typeof CATEGORY]
        }
      });
    }
  })
);
