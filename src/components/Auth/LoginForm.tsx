import { Container } from '../shared/Container';
import { Form, useYupForm } from '../shared/Form';
import { gql, useMutation } from '@apollo/client';
import { Input } from '../shared/Input';
import { object, string } from 'yup';
import { useAuthRedirect } from 'src/utils/useAuthRedirect';
import { query as HeaderQuery } from '../Header';
import {
  LoginFormMutation,
  LoginFormMutationVariables
} from './__generated__/LoginForm.generated';
import { SubmitButton } from '../shared/SubmitButton';
import { Link } from '../shared/Link';

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
      mutation LoginFormMutation($input: LoginInput!) {
        login(input: $input) {
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

        <Input
          {...form.register('password')}
          label='Contraseña'
          type='password'
        />

        <SubmitButton>Ingresar</SubmitButton>
      </Form>

      <div className='text-right mt-4'>
        <Link href='/auth/signup' preserveRedirect>
          Crear usuario
        </Link>
      </div>
    </Container>
  );
}
