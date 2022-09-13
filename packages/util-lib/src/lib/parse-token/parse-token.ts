import { decrypt } from '../crypto/crypto';

export const parseToken = (token: any) => (token ? decrypt(token) : '');
