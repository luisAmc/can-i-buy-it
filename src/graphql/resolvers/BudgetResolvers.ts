import { db } from 'src/utils/prisma';
import { builder } from '../builder';
import { TransactionRef } from './TransactionResolvers';

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

const BudgetTransactionsInput = builder.inputType('BudgetTransactionsInput', {
  fields: (t) => ({
    id: t.id(),
    start: t.field({ type: 'DateTime' }),
    end: t.field({ type: 'DateTime' })
  })
});

const BudgetTransactions = builder.simpleObject('BudgetTransactions', {
  fields: (t) => ({
    total: t.float(),
    transactions: t.field({ type: [TransactionRef] })
  })
});

builder.queryField('budgetTransactions', (t) =>
  t.field({
    type: BudgetTransactions,
    args: { input: t.arg({ type: BudgetTransactionsInput }) },
    resolve: async (_parent, { input }, { session }) => {
      const budget = await db.budget.findFirst({
        where: {
          id: input.id,
          userId: session!.userId
        },
        rejectOnNotFound: true
      });

      // TODO: Fetch only the transactions made between input.start and input.end
      const transactions = await db.transaction.findMany({
        where: {
          category: budget.category,
          userId: session!.userId
        }
      });

      const total = transactions.reduce(
        (total, transaction) => total + transaction.amount,
        0
      );

      return {
        transactions,
        total
      };
    }
  })
);

const UpdateBudgetInput = builder.inputType('UpdateBudgetInput', {
  fields: (t) => ({
    id: t.id(),
    limit: t.float()
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
          limit: input.limit
        }
      });
    }
  })
);
