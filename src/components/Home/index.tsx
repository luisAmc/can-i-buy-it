import { LoginForm } from "../Auth/LoginForm";
import { Dashboard } from "../Dashboard";

interface Props {
  data?: {
    me?: {
      username: string;
    };
  };
}

export function Home({ data }: Props) {
  if (!data || !data.me) return <LoginForm />;

  return <Dashboard />;
}
