import { getCookie } from 'cookies-next';
import { parseToken } from '../lib/parse-token';
import Module from '../modules/auth/login';

export async function getServerSideProps({ req, res, resolvedUrl }) {
  const token = getCookie('_o', { req, res });
  const page = resolvedUrl.substring(1);
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + parseToken(token),
  };
  const tokenCheck = await fetch(`http://localhost:3333/api/auth/check`, {
    method: 'GET',
    headers,
  });
  const permissions = await fetch(
    `http://localhost:3333/api/auth/permission?page=${page}&list=true`,
    {
      method: 'GET',
      headers,
    }
  );
  return {
    props: {
      tokenCheck: await tokenCheck.json(),
      permissions: await permissions.json(),
      resolvedUrl,
    },
  };
}

export default function IndexPage({ tokenCheck, permissions, resolvedUrl }) {
  console.log(tokenCheck, permissions, resolvedUrl);
  return <Module />;
}
