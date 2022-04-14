import { gql, useMutation } from '@apollo/client';
import { CheckIcon } from '@heroicons/react/outline';
import { CATEGORY } from '@prisma/client';
import { useRouter } from 'next/router';
import { FieldValues } from 'react-hook-form';
import { numberShape } from 'src/utils/shapes';
import { object } from 'yup';
import { BudgetInput } from '../shared/BudgetInput';
import { Container } from '../shared/Container';
import { Form, useYupForm } from '../shared/Form';
import { SubmitButton } from '../shared/SubmitButton';
import { BudgetFragment } from './ViewBudget';
import {
  UpdateBudgetMutation,
  UpdateBudgetMutationVariables
} from './__generated__/UpdateBudget.generated';

const updateBudgetSchema = object().shape({
  limit: numberShape.moreThan(0, 'El límite tiene que ser mayor que cero.')
});

export function UpdateBudget() {
  const router = useRouter();

  const [commit] = useMutation<
    UpdateBudgetMutation,
    UpdateBudgetMutationVariables
  >(
    gql`
      mutation UpdateBudgetMutation($input: UpdateBudgetInput!) {
        updateBudget(input: $input) {
          id
          ...Budget_budget
        }
      }
      ${BudgetFragment}
    `,
    {
      // update(cache, { data }) {
      //   if (!data?.updateBudgets) return;

      //   cache.modify({
      //     id: 'User',
      //     fields: {
      //       budgets(existingBudgets = []) {
      //         return [data.updateBudgets, ...existingBudgets];
      //       }
      //     }
      //   });
      // },
      onCompleted() {
        router.push('/budgets');
      }
    }
  );

  const form = useYupForm({
    schema: updateBudgetSchema,
    defaultValues: {}
  });

  async function onSubmit(values: FieldValues) {
    commit({
      variables: {
        input: {
          id: router.query.budgetId as string,
          limit: values.limit,
          category: values.category
        }
      }
    });
  }

  return (
    <div className='relative md:flex md:px-12 xl:p-4'>
      <img
        src='/images/planning.png'
        className='absolute hidden md:block h-[90%] right-20 aspect-auto'
      />

      <div className='relative'>
        <Container title='Presupuestos'>
          <Form form={form} onSubmit={onSubmit}>
            <div className='flex flex-col divide-y'>
              <BudgetInput
                {...form.register(CATEGORY.ENTERTAINMENT)}
                label='Entretenimiento'
              />

              <BudgetInput {...form.register(CATEGORY.FOOD)} label='Comida' />

              <BudgetInput {...form.register(CATEGORY.CAR)} label='Vehículo' />

              <BudgetInput {...form.register(CATEGORY.HOME)} label='Hogar' />

              <BudgetInput
                {...form.register(CATEGORY.SERVICE)}
                label='Servicios'
              />

              <BudgetInput {...form.register(CATEGORY.OTHER)} label='Otros' />
            </div>

            <SubmitButton>
              <CheckIcon className='w-4 h-4 mr-1' />
              <span>Guardar Presupuestos</span>
            </SubmitButton>
          </Form>
        </Container>
      </div>
    </div>
  );
}
