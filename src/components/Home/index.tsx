import { gql, useQuery } from '@apollo/client';
import { LoginForm } from '../Auth/LoginForm';
import { Dashboard } from '../Dashboard';
import { MeQuery } from './__generated__/index.generated';

const LayoutQuery = gql`
  query MeQuery {
    me {
      username
    }
  }
`;

export function Home() {
  const { data, loading } = useQuery<MeQuery>(LayoutQuery);

  if (loading) return <div>Cargando...</div>;

  if (!data || !data.me) return <LoginForm />;

  return <Dashboard />;
}
