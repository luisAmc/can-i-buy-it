import { Form, useYupForm } from '../shared/Form';
import { gql, useMutation } from '@apollo/client';
import {
  LoginFormMutation,
  LoginFormMutationVariables
} from 'src/graphql/__generated__/generated';
import { object, string } from 'yup';
import { useAuthRedirect } from 'src/utils/useAuthRedirect';
import { Container } from '../shared/Container';
import { Input } from '../shared/Input';

const loginSchema = object().shape({
  username: string().trim().required('Ingrese el nombre de usuario.'),
  password: string()
    .trim()
    .min(6, 'El tamaño mínimo de la conrtaseña es seis caracteres.')
    .required('Ingrese la contraseña.')
});

export function LoginForm() {
  const authRedirect = useAuthRedirect();

  const [login] = useMutation<LoginFormMutation, LoginFormMutationVariables>(
    gql`
      mutation LoginForm($input: LoginInput!) {
        login(input: $input) {
          id
        }
      }
    `,
    {
      onCompleted() {
        authRedirect();
      }
    }
  );

  const form = useYupForm({ schema: loginSchema });

  return (
    <Container title='Iniciar sesión'>
      <Form
        form={form}
        onSubmit={(values) => {
          login({
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

        <Input {...form.register('password')} label='Contraseña' />

        <button
          type='submit'
          className='border rounded-md py-2 px-5 bg-red-200 hover:opacity-75'
        >
          Ingresar
        </button>
      </Form>
    </Container>
  );
}
