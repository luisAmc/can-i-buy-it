import { GetServerSideProps } from 'next';
import { authenticatedRoute } from 'src/utils/redirects';

export const getServerSideProps: GetServerSideProps = authenticatedRoute;

export { Transactions as default } from 'src/components/Transactions';
