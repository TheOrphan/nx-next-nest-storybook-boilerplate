import { useEffect, useState } from 'react';
import { TableFormStateTypes } from './table-search-sort-types';
import { getCookie, setCookie } from 'cookies-next';
import { encrypt, parseToken } from '@boilerplate-project/util-lib';
import ms from 'ms';

// TODO: Pakai cookies sebagai alat ngobrol lib dan app yg pakai
const setFormState = (state = TableFormStateTypes.View) => {
  const encrypted = encrypt(state);
  setCookie('_ftbs', encrypted, {
    maxAge: ms('12h') / 1000,
  });
  return encrypted;
};

const getFormState = () => {
  const encrypted = getCookie('_ftbs');
  const decrypted = parseToken(encrypted as TableFormStateTypes);
  return decrypted as TableFormStateTypes;
};

export function useFormTableState() {
  useEffect(() => {
    window.onbeforeunload = () => setFormState(TableFormStateTypes.View);
  }, []);
  return { formState: getFormState(), setFormState } as const;
}
