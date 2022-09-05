import Error from 'next/error';

export async function getServerSideProps() {
  return {
    props: { errorCode: 401, title: 'Unauthorized' },
  };
}

export default function Page({ errorCode, title }) {
  return <Error statusCode={errorCode} title={title} />;
}
