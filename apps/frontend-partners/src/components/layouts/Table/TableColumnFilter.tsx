import React from 'react';

import EmptyDirectory from '../../../assets/svg/EmptyTable.svg';
import './index.scss';

import {
  Column,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  RowData,
  useReactTable,
} from '@tanstack/react-table';

import { TableProps } from '../../../types/table.type.ts';

export default function TableColumnFilter<TData extends RowData>({
  data,
  columns,
  pageSizeOptions = [10, 20, 30, 50],
  initialPageSize = 10,
  onPageChange,
  isLoading,
}: TableProps<TData>) {
  const rerender = React.useReducer(() => ({}), {})[1];

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const table = useReactTable({
    data,
    columns,
    filterFns: {},
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), //client side filtering
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
    initialState: {
      pagination: { pageSize: initialPageSize },
    },
  });

  React.useEffect(() => {
    if (onPageChange) {
      onPageChange(table.getState().pagination.pageIndex);
    }
  }, [table.getState().pagination.pageIndex, onPageChange]);

  return (
    <div className='p-2' style={{ width: '100%' }}>
      <div className='table-responsive'>
        <div className='table-responsive-header'>
          {table.getHeaderGroups().map((headerGroup) => (
            <div className='table-responsive-header-item' key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <div key={header.id}>
                    {header.isPlaceholder ? null : (
                      <>
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? 'cursor-pointer select-none'
                              : '',
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: ' 🔼',
                            desc: ' 🔽',
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                        {header.column.getCanFilter() ? (
                          <div>
                            <Filter column={header.column} />
                          </div>
                        ) : null}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div className='table-responsive-body'>
          {isLoading ? (
            <p>Chargement des données...</p>
          ) : table.getRowModel().rows?.length > 0 ? (
            table.getRowModel().rows?.map((row) => {
              return (
                <div className='table-responsive-body-item' key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <div
                        className='table-responsive-body-item-cell'
                        key={cell.id}
                      >
                        <div>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })
          ) : (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img
                src={EmptyDirectory}
                alt='Le table est vide'
                style={{
                  width: '150px',
                  height: '150px',
                  objectFit: 'cover',
                }}
              />
            </div>
          )}
        </div>
      </div>
      <div className='h-2' />
      <div
        className='table-footer'
        style={{
          backgroundColor: '#f5f5f5',
          padding: '1rem',
        }}
      >
        <div className='table-footer-navigation'>
          <div className='table-footer-buttons'>
            <button
              className='border rounded p-1'
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              {'<<'}
            </button>
            <button
              className='border rounded p-1'
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {'<'}
            </button>
            <button
              className='border rounded p-1'
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              {'>'}
            </button>
            <button
              className='border rounded p-1'
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              {'>>'}
            </button>
          </div>

          <div className='table-footer-info'>
            <span>
              Page <strong>{table.getState().pagination.pageIndex + 1}</strong>{' '}
              sur <strong>{table.getPageCount()}</strong>
            </span>
          </div>

          <div className='table-footer-controls'>
            <div className='table-footer-goto'>
              <span>Aller à la page:</span>
              <input
                type='number'
                min='1'
                max={table.getPageCount()}
                defaultValue={table.getState().pagination.pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  table.setPageIndex(page);
                }}
                className='border p-1 rounded w-16'
              />
            </div>

            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
              className='table-footer-select'
            >
              {pageSizeOptions.map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Afficher {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

function Filter({ column }: { column: Column<any, unknown> }) {
  const columnFilterValue = column.getFilterValue();
  const { filterVariant } = column.columnDef.meta ?? {};

  return filterVariant === 'range' ? (
    <div>
      <div className='flex space-x-2'>
        {/* See faceted column filters example for min max values functionality */}
        <DebouncedInput
          type='number'
          value={(columnFilterValue as [number, number])?.[0] ?? ''}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [value, old?.[1]])
          }
          placeholder={`Min`}
          className='w-24 border shadow rounded'
        />
        <DebouncedInput
          type='number'
          value={(columnFilterValue as [number, number])?.[1] ?? ''}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [old?.[0], value])
          }
          placeholder={`Max`}
          className='w-24 border shadow rounded'
        />
      </div>
      <div className='h-1' />
    </div>
  ) : filterVariant === 'select' ? (
    <select
      onChange={(e) => column.setFilterValue(e.target.value)}
      value={columnFilterValue?.toString()}
    >
      {/* See faceted column filters example for dynamic select options */}
      <option value=''>All</option>
      <option value='complicated'>complicated</option>
      <option value='relationship'>relationship</option>
      <option value='single'>single</option>
    </select>
  ) : (
    <DebouncedInput
      className='w-36 border shadow rounded'
      onChange={(value) => column.setFilterValue(value)}
      placeholder={`Reacherche...`}
      type='text'
      value={(columnFilterValue ?? '') as string}
    />
    // See faceted column filters example for datalist search suggestions
  );
}

// A typical debounced input react component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
