import { parseToken } from '@boilerplate-project/util-lib';

type GetAllTypes = {
  endpoint: string;
  page: number;
  token: any;
};

export const getAllData = async ({ endpoint, page, token }: GetAllTypes) => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + parseToken(token),
    },
  };
  const fetchAll = await fetch(
    `${process.env.PUBLIC_API_GATEWAY}${endpoint}?page=${page}`,
    options
  );
  const resStatus = fetchAll.status !== 200 ? false : true;
  const data = await fetchAll.json();
  return resStatus ? data : [];
};
