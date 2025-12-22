import { ColumnDef } from '@tanstack/react-table';

// Define the type of the data for the table
export type TableProps<T> = {
  data: T[];
  columns: ColumnDef<T, any>[];
  pageSizeOptions?: number[];
  initialPageSize?: number;
  onPageChange?: (pageIndex: number) => void;
  isLoading?: boolean;
};
