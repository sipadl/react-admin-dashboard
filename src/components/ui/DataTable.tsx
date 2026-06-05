import * as React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
} from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, ChevronsUpDown, ChevronUp, ChevronDown, Search, Download } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  searchPlaceholder?: string;
  searchColumn?: string;
  pageSizeOptions?: number[];
  onRowClick?: (row: TData) => void;
  enableSelection?: boolean;
}

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);
  React.useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}

export function DataTable<TData extends object, TValue>({
  columns,
  data,
  isLoading = false,
  searchPlaceholder = "Search...",
  searchColumn,
  pageSizeOptions = [10, 20, 50],
  onRowClick,
  enableSelection = false,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [rowSelection, setRowSelection] = React.useState({});
  const [pagination, setPagination] = React.useState({ pageIndex: 0, pageSize: pageSizeOptions[0] });

  const debouncedFilter = useDebounce(globalFilter, 300);

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnFilters, globalFilter: debouncedFilter, pagination, rowSelection },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableRowSelection: enableSelection,
  });

  const exportCSV = () => {
    const headers = columns.map((c) => (c.header as string) ?? (c.id ?? ""));
    const rows = table.getFilteredRowModel().rows.map((row) =>
      row.getVisibleCells().map((cell) => String(cell.getValue() ?? ""))
    );
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "export.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        <div className="h-10 bg-gray-200 rounded w-full animate-pulse" />
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-12 bg-gray-100 rounded w-full animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="h-10 w-64 rounded-md border border-input bg-background pl-8 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          {enableSelection && Object.keys(rowSelection).length > 0 && (
            <span className="text-sm text-muted-foreground">
              {Object.keys(rowSelection).length} row(s) selected
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={exportCSV} className="inline-flex items-center gap-1.5 rounded-md border px-3 py-2 text-sm hover:bg-accent">
            <Download className="h-4 w-4" /> Export
          </button>
          <select
            value={pagination.pageSize}
            onChange={(e) => setPagination({ pageIndex: 0, pageSize: Number(e.target.value) })}
            className="h-10 rounded-md border border-input bg-background px-3 text-sm"
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>{size} rows</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    className={cn(
                      "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground",
                      header.column.getCanSort() && "cursor-pointer select-none hover:text-foreground"
                    )}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center gap-1.5">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getCanSort() && (
                        header.column.getIsSorted() === "asc" ? <ChevronUp className="h-3.5 w-3.5" /> :
                        header.column.getIsSorted() === "desc" ? <ChevronDown className="h-3.5 w-3.5" /> :
                        <ChevronsUpDown className="h-3.5 w-3.5 opacity-40" />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="py-8 text-center text-muted-foreground">
                  No data found.
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className={cn(
                    "border-t hover:bg-muted/50 transition-colors",
                    onRowClick && "cursor-pointer",
                    row.getIsSelected() && "bg-muted"
                  )}
                  onClick={() => onRowClick?.(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}–
          {Math.min(
            (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length
          )} of {table.getFilteredRowModel().rows.length}
        </span>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          {Array.from({ length: table.getPageCount() }, (_, i) => i)
            .filter((i) => i === 0 || i === table.getPageCount() - 1 || Math.abs(i - table.getState().pagination.pageIndex) <= 1)
            .map((pageIndex, idx, arr) => (
              <React.Fragment key={pageIndex}>
                {idx > 0 && arr[idx - 1] !== pageIndex - 1 && <span className="px-1">…</span>}
                <button
                  onClick={() => table.setPageIndex(pageIndex)}
                  className={cn(
                    "inline-flex h-9 min-w-[36px] items-center justify-center rounded-md border px-2 text-sm",
                    table.getState().pagination.pageIndex === pageIndex && "bg-primary text-primary-foreground border-primary"
                  )}
                >
                  {pageIndex + 1}
                </button>
              </React.Fragment>
            ))}
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
