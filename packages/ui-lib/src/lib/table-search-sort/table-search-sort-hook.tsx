import { useEffect, useState } from 'react';
import { TableFormStateTypes } from './table-search-sort-types';

// TODO: Pakai cookies sebagai alat ngobrol lib dan app yg pakai
// pindahkan shared util function di util-lib
export function useFormTableState(initialValues = TableFormStateTypes.View) {
  const [formState, setFormState] = useState(initialValues);
  return [formState, setFormState] as const;
}
