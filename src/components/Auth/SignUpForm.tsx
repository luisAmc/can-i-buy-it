import { object, string } from 'yup';
import { Container } from '../shared/Container';
import { Form, useYupForm } from '../shared/Form';
import { Input } from '../shared/Input';

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
    <Container title='Crear usuario'>
      <Form form={form} onSubmit={() => {}}>
        <Input {...form.register('username')} label='Usuario' />

        <Input {...form.register('password')} label='Contraseña' />

        <Input
          {...form.register('confirmPassword')}
          label='Confirmar contraseña'
        />

        <button
          type='submit'
          className='border rounded-md py-2 px-5 bg-red-200 hover:opacity-75'
        >
          Crear Usuario
        </button>
      </Form>
    </Container>
  );
}
