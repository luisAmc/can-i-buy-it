import { GetServerSidePropsContext } from 'next';
import { SessionWithUser } from 'src/utils/redirects';
import { resolveSession } from 'src/utils/sessions';

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await resolveSession(ctx);

  if (session) {
    const sessionWithUser = session as SessionWithUser;

    return {
      redirect: {
        destination: '/home',
        permanent: false
      },
      props: {
        me: {
          username: sessionWithUser.user.username
        }
      }
    };
  }

  return { props: {} };
}

export { Home as default } from 'src/components/Home';
