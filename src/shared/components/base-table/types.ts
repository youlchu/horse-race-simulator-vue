export interface TableColumn {
  dataKey: string;
  label: string;
  width?: string;
  align?: "left" | "center" | "right";
  cellRenderer?: (params: { row: any; value: any }) => string;
}

export interface TableProps {
  data: any[];
}

export interface ColumnProps {
  dataKey: string;
  label: string;
  width?: string;
  align?: "left" | "center" | "right";
  cellRenderer?: (params: { row: any; value: any }) => string;
}
