import type { NextApiRequest, NextApiResponse } from 'next';
import { getCookie } from 'cookies-next';
import { parseToken } from '@boilerplate-project/util-lib';

type Data = {
  status: boolean;
};

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const token = getCookie('_o', { req, res });
  const authCheck = await fetch(`http://localhost:3333/api/auth/check`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + parseToken(token),
    },
  });
  if (authCheck.status === 200) {
    res.status(200).json({ status: true });
  } else {
    res.status(403).json({ status: false });
  }
};
