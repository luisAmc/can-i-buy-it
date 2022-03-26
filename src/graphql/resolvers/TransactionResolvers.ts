import { builder } from '../builder';

builder.prismaObject('Transaction', {
  findUnique: (transaction) => ({ id: transaction.id }),
  fields: (t) => ({
    id: t.exposeID('id'),
    date: t.expose('date', { type: 'DateTime' }),
    amount: t.exposeFloat('amount'),
    notes: t.exposeString('notes', { nullable: true }),
    category: t.exposeString('category')
  })
});
