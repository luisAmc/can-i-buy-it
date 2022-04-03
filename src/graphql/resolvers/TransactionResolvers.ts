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
    type: t.exposeString('type'),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' })
  })
});

builder.queryField('transaction', (t) =>
  t.prismaField({
    type: 'Transaction',
    args: { id: t.arg.id() },
    resolve: (query, _parent, { id }, { session }) => {
      return db.transaction.findFirst({
        ...query,
        where: { id: id, userId: session!.userId },
        rejectOnNotFound: true
      });
    }
  })
);

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

const EditTransactionInput = builder.inputType('EditTransactionInput', {
  fields: (t) => ({
    id: t.id(),
    date: t.field({ type: 'DateTime' }),
    amount: t.float(),
    notes: t.string(),
    category: t.string(),
    type: t.string()
  })
});

builder.mutationField('editTransaction', (t) =>
  t.prismaField({
    type: 'Transaction',
    args: { input: t.arg({ type: EditTransactionInput }) },
    resolve: async (query, _parent, { input }, { session }) => {
      const transaction = await db.transaction.findFirst({
        where: {
          id: input.id,
          userId: session!.userId
        },
        rejectOnNotFound: true
      });

      return db.transaction.update({
        ...query,
        where: {
          id: transaction.id
        },
        data: {
          date: input.date,
          amount: input.amount,
          notes: input.notes,
          category: CATEGORY[input.category as keyof typeof CATEGORY],
          type: TRANSACTION_TYPE[input.type as keyof typeof TRANSACTION_TYPE]
        }
      });
    }
  })
);

const DeleteTransactionInput = builder.inputType('DeleteTransactionInput', {
  fields: (t) => ({
    id: t.id()
  })
});

builder.mutationField('deleteTransaction', (t) =>
  t.prismaField({
    type: 'Transaction',
    args: { input: t.arg({ type: DeleteTransactionInput }) },
    resolve: async (query, _parent, { input }, { session }) => {
      const transaction = await db.transaction.findFirst({
        where: {
          id: input.id,
          userId: session!.userId
        },
        rejectOnNotFound: true
      });

      return db.transaction.delete({
        ...query,
        where: { id: transaction.id }
      });
    }
  })
);
