import { gql, useMutation, useQuery } from '@apollo/client';
import { CheckIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FieldValues } from 'react-hook-form';
import { numberShape } from 'src/utils/shapes';
import { object } from 'yup';
import { BudgetInput } from '../shared/BudgetInput';
import { Container } from '../shared/Container';
import { Form, useYupForm } from '../shared/Form';
import { SubmitButton } from '../shared/SubmitButton';
import { BudgetFragment, query as BudgetQuery } from './ViewBudget';
import {
  UpdateBudgetMutation,
  UpdateBudgetMutationVariables
} from './__generated__/UpdateBudget.old.generated';
import {
  ViewBudgetQuery,
  ViewBudgetQueryVariables
} from './__generated__/ViewBudget.generated';

const updateBudgetSchema = object().shape({
  limit: numberShape.moreThan(0, 'El límite tiene que ser mayor que cero.')
});

export function UpdateBudget() {
  const router = useRouter();

  const { data, loading, error } = useQuery<
    ViewBudgetQuery,
    ViewBudgetQueryVariables
  >(BudgetQuery, {
    variables: { id: router.query.budgetId as string },
    skip: !router.isReady
  });

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
      onCompleted(data) {
        router.push(`/budgets/${data.updateBudget.id}`);
      }
    }
  );

  useEffect(() => {
    if (data?.budget) {
      form.setValue('limit', data.budget.limit);
    }
  }, [data]);

  const form = useYupForm({
    schema: updateBudgetSchema,
    defaultValues: { limit: 0 }
  });

  async function onSubmit(values: FieldValues) {
    commit({
      variables: {
        input: {
          id: router.query.budgetId as string,
          limit: values.limit
        }
      }
    });
  }

  return (
    <Container title='Editar presupuesto'>
      {loading && <p>Cargando...</p>}

      {!loading && data?.budget && (
        <Form form={form} onSubmit={onSubmit}>
          <BudgetInput
            {...form.register('limit')}
            label={data.budget.category}
          />

          <SubmitButton>
            <CheckIcon className='w-4 h-4 mr-1' />
            <span>Guardar cambios</span>
          </SubmitButton>
        </Form>
      )}
    </Container>
  );
}
