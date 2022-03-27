import { GetServerSidePropsContext } from 'next';
import { resolveSession } from 'src/utils/sessions';

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await resolveSession(ctx);

  if (session) {
    return { props: {} };
  }
}

export { Home as default } from 'src/components/Home';
