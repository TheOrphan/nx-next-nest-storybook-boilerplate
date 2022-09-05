import { decrypt } from './crypto';

export const parseToken = (token) => (token ? decrypt(token) : '');
