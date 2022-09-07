export enum TableFormStateTypes {
  View = 'view',
  Edit = 'edit',
  Add = 'add',
}

export interface TableSortProps {
  data: Array<any>;
  access: { add: boolean; remove: boolean; edit: boolean };
  forceNoAdd?: boolean;
  FormAdd?: React.ReactNode | null;
  FormEdit?: React.ReactNode | null;
  formState?: TableFormStateTypes;
}

export interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  style: React.CSSProperties;
  onSort(): void;
}
