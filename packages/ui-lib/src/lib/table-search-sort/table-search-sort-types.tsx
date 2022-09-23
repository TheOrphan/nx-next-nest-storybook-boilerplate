export enum TableFormStateTypes {
  View = 'view',
  Edit = 'edit',
  Add = 'add',
}

export interface TableSortProps {
  data: Array<any>;
  access: { add: boolean; delete: boolean; edit: boolean };
  forceNoAdd?: boolean;
  FormAddURI?: string | '';
  FormEditURI?: string | '';
  uniqueKey?: string | '';
  FormAdd?: React.ReactNode | null;
  FormEdit?: React.ReactNode | null;
  formState?: TableFormStateTypes;
  onDeleteConfirm?: () => void;
  onDeleteAbort?: () => void;
}

export interface ThProps {
  children: React.ReactNode;
  sortActive: boolean;
  reversed: boolean;
  sorted: boolean;
  ThColStyle: React.CSSProperties;
  style: React.CSSProperties;
  onSort(): void;
}
