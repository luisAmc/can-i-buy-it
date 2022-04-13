import { gql, useMutation } from '@apollo/client';
import { object, string } from 'yup';
import { Container } from '../shared/Container';
import { Form, useYupForm } from '../shared/Form';
import { Input } from '../shared/Input';
import { SubmitButton } from '../shared/SubmitButton';
import { query as HeaderQuery } from '../Header';
import { useAuthRedirect } from 'src/utils/useAuthRedirect';
import {
  SignupFormMutation,
  SignupFormMutationVariables
} from './__generated__/SignUpForm.generated';

const signUpSchema = object().shape({
  username: string().trim().required('Ingrese el nombre de usuario.'),
  password: string()
    .trim()
    .min(6, 'El tamaño mínimo de la conrtaseña es seis caracteres.')
    .required('Ingrese la contraseña.'),
  confirmPassword: string()
    .trim()
    .test(
      'does-password-match',
      'Las contraseñas no coinciden.',
      function (value) {
        return this.parent.password === value;
      }
    )
});

export function SignUpForm() {
  const authRedirect = useAuthRedirect();

  const form = useYupForm({ schema: signUpSchema });

  const [signup] = useMutation<SignupFormMutation, SignupFormMutationVariables>(
    gql`
      mutation SignupFormMutation($input: SignupInput!) {
        signup(input: $input) {
          id
        }
      }
    `,
    {
      refetchQueries: [{ query: HeaderQuery }],
      onCompleted() {
        authRedirect();
      }
    }
  );

  return (
    <Container title='Crear usuario'>
      <Form
        form={form}
        onSubmit={(values) => {
          signup({
            variables: {
              input: {
                username: values.username,
                password: values.password
              }
            }
          });
        }}
      >
        <Input {...form.register('username')} label='Usuario' />

        <Input
          {...form.register('password')}
          label='Contraseña'
          type='password'
        />

        <Input
          {...form.register('confirmPassword')}
          label='Confirmar contraseña'
          type='password'
        />

        <SubmitButton>Crear Usuario</SubmitButton>
      </Form>
    </Container>
  );
}
