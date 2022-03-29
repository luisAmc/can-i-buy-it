import { CATEGORY, TRANSACTION_TYPE } from '@prisma/client';
import { db } from 'src/utils/prisma';
import { builder } from '../builder';

builder.prismaObject('Transaction', {
  findUnique: (transaction) => ({ id: transaction.id }),
  fields: (t) => ({
    id: t.exposeID('id'),
    date: t.expose('date', { type: 'DateTime' }),
    amount: t.exposeFloat('amount'),
    notes: t.exposeString('notes', { nullable: true }),
    category: t.exposeString('category'),
    type: t.exposeString('type')
  })
});

const CreateTransactionInput = builder.inputType('CreateTransactionInput', {
  fields: (t) => ({
    date: t.field({ type: 'DateTime' }),
    amount: t.float(),
    notes: t.string(),
    category: t.string(),
    type: t.string()
  })
});

builder.mutationField('createTransaction', (t) =>
  t.prismaField({
    type: 'Transaction',
    args: { input: t.arg({ type: CreateTransactionInput }) },
    resolve: async (query, _parent, { input }, { session }) => {
      return db.transaction.create({
        ...query,
        data: {
          date: input.date,
          amount: input.amount,
          notes: input.notes,
          category: CATEGORY[input.category as keyof typeof CATEGORY],
          type: TRANSACTION_TYPE[input.type as keyof typeof TRANSACTION_TYPE],
          userId: session!.userId
        }
      });
    }
  })
);
