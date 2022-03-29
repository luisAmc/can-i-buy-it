import { AmountInput } from '../shared/AmountInput';
import { CATEGORY, TRANSACTION_TYPE } from '@prisma/client';
import { CategorySelector } from './CategorySelector';
import { Container } from '../shared/Container';
import { date, number, object, string } from 'yup';
import { Form, useYupForm } from '../shared/Form';
import { formatSimpleDate } from 'src/utils/transforms';
import { Input } from '../shared/Input';
import { TextArea } from '../shared/TextArea';
import { gql, useMutation } from '@apollo/client';
import { FieldValues } from 'react-hook-form';
import {
  CreateTransactionMutation,
  CreateTransactionMutationVariables
} from './__generated__/CreateTransaction.generated';
import { useRouter } from 'next/router';

const createTransactionSchema = object().shape({
  date: date(),
  amount: number(),
  notes: string(),
  category: string()
});

export function CreateTransaction() {
  const router = useRouter();

  const [commit] = useMutation<
    CreateTransactionMutation,
    CreateTransactionMutationVariables
  >(
    gql`
      mutation CreateTransactionMutation($input: CreateTransactionInput!) {
        createTransaction(input: $input) {
          id
        }
      }
    `,
    {
      update(cache, { data }) {
        if (!data?.createTransaction) return;

        cache.modify({
          fields: {
            transactions(existingTransactions = []) {
              return [data.createTransaction, ...existingTransactions];
            }
          }
        });
      },
      onCompleted() {
        router.push('/transactions');
      }
    }
  );

  const form = useYupForm({
    schema: createTransactionSchema,
    defaultValues: {
      date: formatSimpleDate(new Date()),
      category: ''
    }
  });

  async function onSubmit(values: FieldValues) {
    commit({
      variables: {
        input: {
          amount: values.amount,
          category: values.category,
          date: values.date,
          notes: values.notes,
          type: TRANSACTION_TYPE.EXPENSE
        }
      }
    });
  }

  return (
    <Container title='Crear transacción'>
      <Form form={form} onSubmit={onSubmit}>
        <AmountInput
          {...form.register('amount')}
          label='Cantidad'
          type='number'
          placeholder='0.0'
        />

        <CategorySelector
          name='category'
          label='Categoría'
          options={[
            { label: 'Entretenimiento', value: CATEGORY.ENTERTAINMENT },
            { label: 'Comida', value: CATEGORY.FOOD },
            { label: 'Vehículo', value: CATEGORY.CAR },
            { label: 'Hogar', value: CATEGORY.HOME },
            { label: 'Servicio', value: CATEGORY.SERVICE },
            { label: 'Otro', value: CATEGORY.OTHER }
          ]}
        />

        <Input {...form.register('date')} label='Fecha' type='date' />

        <TextArea {...form.register('notes')} label='Notas (Opcional)' />

        <button
          type='submit'
          className='bg-brand-200 px-3 py-2 rounded-md font-medium text-brand-700 hover:opacity-75'
        >
          Crear transacción
        </button>
      </Form>
    </Container>
  );
}
