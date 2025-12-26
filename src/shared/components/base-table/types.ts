export interface TableColumn<T = Record<string, unknown>> {
  dataKey: string;
  label: string;
  width?: string;
  align?: "left" | "center" | "right";
  cellRenderer?: (params: { row: T; value: unknown }) => string;
}

export interface TableProps<T = Record<string, unknown>> {
  data: T[];
}

export interface ColumnProps<T = Record<string, unknown>> {
  dataKey: string;
  label: string;
  width?: string;
  align?: "left" | "center" | "right";
  cellRenderer?: (params: { row: T; value: unknown }) => string;
}
