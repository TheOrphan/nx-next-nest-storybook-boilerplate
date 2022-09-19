import type { NextApiRequest, NextApiResponse } from 'next';
import { getCookie } from 'cookies-next';
import { parseToken } from '@boilerplate-project/util-lib';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let {
    page,
    accessType = 'view',
    includeLists = false,
  }: { page: string; accessType: string; includeLists: boolean } = JSON.parse(
    req.body
  );
  const token = getCookie('_o', { req, res });
  const response = await fetch(
    `${process.env.PUBLIC_API_GATEWAY}/auth/permission?page=${page}&list=${includeLists}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + parseToken(token),
      },
    }
  );
  const data = await response.json();
  res
    .status(response.status)
    .json(includeLists ? { data } : { [accessType]: data[accessType] });
};
