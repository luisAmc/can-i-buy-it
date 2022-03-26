import { Form, useYupForm } from '../shared/Form';
import { gql, useMutation } from '@apollo/client';
import { LoginFormMutation, LoginFormMutationVariables } from 'src/graphql/__generated__/generated';
import { object, string } from 'yup';
import { useAuthRedirect } from 'src/utils/useAuthRedirect';

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
    <div className='w-full mx-auto max-w-lg border border-gray-300 rounded-xl shadow-lg'>
      <div className='p-6'>
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
          <h1 className='text-3xl'>Iniciar sesión</h1>

          <input
            {...form.register('username')}
            className='border-gray-300 border'
          />

          <input
            {...form.register('password')}
            className='border-gray-300 border'
          />

          <button
            type='submit'
            className='border rounded-md py-2 px-5 bg-red-200 hover:opacity-75'
          >
            Ingresar
          </button>
        </Form>
      </div>
    </div>
  );
}
