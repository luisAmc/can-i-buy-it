import { object, string } from 'yup';
import { Form, useYupForm } from '../shared/Form';

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
  const form = useYupForm({ schema: signUpSchema });

  return (
    <div className='w-full mx-auto max-w-lg border border-gray-300 rounded-xl shadow-lg'>
      <div className='p-6'>
        <Form form={form} onSubmit={() => {}}>
          <h1 className='text-3xl'>Crear usuario</h1>

          <input
            {...form.register('username')}
            className='border-gray-300 border'
          />
          <input
            {...form.register('password')}
            className='border-gray-300 border'
          />
          <input
            {...form.register('confirmPassword')}
            className='border-gray-300 border'
          />
          <button
            type='submit'
            className='border rounded-md py-2 px-5 bg-red-200 hover:opacity-75'
          >
            Crear Usuario
          </button>
        </Form>
      </div>
    </div>
  );
}
