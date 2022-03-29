import { GetServerSidePropsContext } from 'next';
import { resolveSession } from 'src/utils/sessions';

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await resolveSession(ctx);

  return { props: {} };
}

export { Home as default } from 'src/components/Home';
