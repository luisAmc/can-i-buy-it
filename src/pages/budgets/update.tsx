import { GetServerSideProps } from 'next';
import { authenticatedRoute } from 'src/utils/redirects';

export const getServerSideProps: GetServerSideProps = authenticatedRoute;

export { UpdateBudget as default } from 'src/components/Budgets/UpdateBudget.old';
