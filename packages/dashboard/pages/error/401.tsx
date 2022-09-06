import { Unauthorized } from '@boilerplate-project/ui-lib';

export async function getServerSideProps() {
  return {
    props: { errorCode: 401, title: 'Unauthorized' },
  };
}

export default function Page() {
  return <Unauthorized />;
}
