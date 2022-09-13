import type { NextApiRequest, NextApiResponse } from 'next';
import ms from 'ms';
import { setCookie } from 'cookies-next';
import { encrypt } from '@boilerplate-project/util-lib';

type Data = {
  message: string;
};

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { email, password } = JSON.parse(req.body);
  const loggingIn = await fetch(`http://localhost:3333/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: email, password }),
  });
  if (loggingIn.status === 201) {
    const token = await loggingIn.json();
    setCookie('_o', encrypt(token.access_token), {
      req,
      res,
      maxAge: ms('12h') / 1000,
    });
  }
  res.status(200).json({ message: 'Login successful' });
};
