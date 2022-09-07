import {
  NotFound,
  ServerBusy,
  ServerError,
  ErrorPage,
} from '@boilerplate-project/ui-lib';

function Error({ statusCode }) {
  return (
    <>
      {statusCode === 404 ? (
        <NotFound />
      ) : statusCode === 500 ? (
        <ServerError />
      ) : statusCode === 503 ? (
        <ServerBusy />
      ) : statusCode ? (
        <ErrorPage statusCode={statusCode} isServer />
      ) : (
        <ErrorPage />
      )}
    </>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
