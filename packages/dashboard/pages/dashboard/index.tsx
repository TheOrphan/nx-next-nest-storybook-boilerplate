import { getCookie } from 'cookies-next';
import { checkAccess } from 'packages/dashboard/lib/useAccess';

function Page() {
  return 'HELLO WORLD';
}

export async function getServerSideProps({ req, res, resolvedUrl }) {
  const token = getCookie('_o', { req, res });
  const { session, authCheck, permission } = await checkAccess({
    token,
    page: resolvedUrl,
  });
  const { access } = permission || {};
  if (!session || !authCheck) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }
  if (!access?.view) {
    return {
      redirect: {
        destination: '/error/401',
        permanent: false,
      },
    };
  }

  return { props: { access } };
}

export default Page;
