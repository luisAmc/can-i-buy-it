import { Session, User } from '@prisma/client';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { resolveSession } from './sessions';

export async function unauthenticatedRoute(
  ctx: GetServerSidePropsContext,
  redirect: string = '/'
) {
  const session = await resolveSession(ctx);

  if (session) {
    return {
      redirect: {
        destination: redirect,
        permanent: false
      }
    };
  }

  return {
    props: {}
  };
}

export interface SessionWithUser extends Session {
  user: User;
}

export async function authenticatedRoute(
  ctx: GetServerSidePropsContext,
  redirect = '/auth/login'
): Promise<GetServerSidePropsResult<{}>> {
  const session = await resolveSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: `${redirect}?redirect=${encodeURIComponent(
          ctx.resolvedUrl
        )}`,
        permanent: false
      }
    };
  }

  const sessionWithUser = session as SessionWithUser;

  return {
    props: {
      me: {
        username: sessionWithUser.user.username
      }
    }
  };
}
