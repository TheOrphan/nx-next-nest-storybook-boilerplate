import { getCookie } from 'cookies-next';
import { checkAccess } from 'packages/dashboard/lib/useAccess';
import Module from '../../modules/auth/login';

function Page() {
  return <Module />;
}

export async function getServerSideProps({ req, res, resolvedUrl }) {
  const token = getCookie('_o', { req, res });
  const { session, authCheck } = await checkAccess({
    token,
    page: resolvedUrl,
  });
  if (session && authCheck) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  }
  return { props: {} };
}

export default Page;
