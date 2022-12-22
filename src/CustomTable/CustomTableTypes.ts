/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
export interface Row {
  [key: string]: string | number | boolean | undefined | null;
}
export declare interface CustomTableProps {
  rows: Row[];
  headers: string[];
}

export interface TableRowsProps {
  rows: Row[];
  checkedRows?: number[];
  onRowCheck: (id: number) => void;
}

export enum Order {
  Ascending,
  Descensing,
}
export interface Sort {
  by: string;
  order: Order;
}

export interface TableHeaderProps {
  sort: Sort;
  onSort: (sort: Sort) => void;
  headers: string[];
  isAllChecked?: boolean;
  onCheckAll: (checked: boolean) => void;
}

export interface TableRowProps {
  row: Row;
  columns: string[];
  isChecked?: boolean;
  onRowCheck: () => void;
}
