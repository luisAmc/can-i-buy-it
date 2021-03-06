import { AmountInput } from '../shared/AmountInput';
import { CATEGORY, TRANSACTION_TYPE } from '@prisma/client';
import { CategorySelector } from './CategorySelector';
import { Container } from '../shared/Container';
import { date, object, string } from 'yup';
import { Form, useYupForm } from '../shared/Form';
import { formatSimpleDate } from 'src/utils/transforms';
import { Input } from '../shared/Input';
import { TextArea } from '../shared/TextArea';
import { gql, useMutation } from '@apollo/client';
import { FieldValues } from 'react-hook-form';
import { useRouter } from 'next/router';
import { TransactionFragment } from './ViewTransaction';
import { numberShape } from 'src/utils/shapes';
import { SubmitButton } from '../shared/SubmitButton';
import { PlusIcon } from '@heroicons/react/outline';
import {
  CreateTransactionMutation,
  CreateTransactionMutationVariables
} from './__generated__/CreateTransaction.generated';

const createTransactionSchema = object().shape({
  date: date(),
  amount: numberShape.moreThan(0, 'La cantidad tiene que ser mayor que cero.'),
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
          ...Transaction_transaction
        }
      }
      ${TransactionFragment}
    `,
    {
      update(cache, { data }) {
        if (!data?.createTransaction) return;

        cache.modify({
          id: 'User',
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
    // TODO: add validation to check if the transactions is not going to tip over the budget.
    // If it is, then we need to display a confirmation modal to the user
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
    <div className='relative md:flex md:px-12 xl:p-4'>
      {/* eslint-disable-next-line */}
      <img
        src='/images/purchasing.png'
        className='absolute hidden md:block h-[90%] right-0 aspect-auto'
        alt=''
      />
      <div className='relative'>
        <Container title='Crear transacci??n'>
          <Form form={form} onSubmit={onSubmit}>
            <AmountInput
              {...form.register('amount')}
              label='Cantidad'
              type='number'
              placeholder='0.0'
            />

            <CategorySelector
              name='category'
              label='Categor??a'
              options={[
                { label: 'Entretenimiento', value: CATEGORY.ENTERTAINMENT },
                { label: 'Comida', value: CATEGORY.FOOD },
                { label: 'Veh??culo', value: CATEGORY.CAR },
                { label: 'Hogar', value: CATEGORY.HOME },
                { label: 'Servicio', value: CATEGORY.SERVICE },
                { label: 'Otro', value: CATEGORY.OTHER }
              ]}
            />

            <Input {...form.register('date')} label='Fecha' type='date' />

            <TextArea {...form.register('notes')} label='Notas (Opcional)' />

            <SubmitButton>
              <PlusIcon className='w-4 h-4 mr-1' />
              <span>Crear Transacci??n</span>
            </SubmitButton>
          </Form>
        </Container>
      </div>
    </div>
  );
}
