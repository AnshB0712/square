import { useParams } from "react-router-dom";
import React from "react";
import { EllipsisVertical } from "lucide-react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useForm } from "react-hook-form";
import useMarsksheetDetails from "../../../hooks/query/useMarsksheetDetails";
import { Loading } from "../../layout/loading";

export const columns = [
  {
    accessorKey: "name",
    header: "Student Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    id: "actions",
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <EllipsisVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Marksheet</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const T = ({ data }) => {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});

  const table = useReactTable({
    data: [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  const form = useForm({
    // values: {
    //   name: table.getColumn("name")?.getFilterValue() ?? "",
    // },
  });

  return (
    <div>
      <Form {...form}>
        <form>
          <div className="flex gap-2 justify-center items-center py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Filter by Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Filter name..."
                        className="max-w-sm"
                      />
                    </FormControl>
                  </FormItem>
                );
              }}
            />
            {
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>FullMarks</FormLabel>
                    <FormControl>
                      <Input placeholder="fullmarks..." {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            }
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => {
                    return (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </form>
      </Form>
    </div>
  );
};

const Marksheet = () => {
  const { testId } = useParams();
  const { data, isLoading } = useMarsksheetDetails({ testId });

  if (isLoading) return <Loading />;

  return (
    <>
      <div className="w-full max-w-lg rounded-lg">
        <div className="mx-auto max-w-md space-y-2 ">
          <div className="text-center">
            <h1 className="text-xl font-bold">Marksheet</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Create a Marksheet for Test.
            </p>
          </div>
          <br />
          <div className="space-y-2">
            <div className="flex justify-start items-center gap-2">
              <p className="font-semibold text-sm">Standard:</p>
              <Badge variant="outline">
                {data.data.data.t.standard.class}-
                {data.data.data.t.standard.field}
              </Badge>
            </div>
            <div className="flex justify-start items-center gap-2">
              <p className="font-semibold text-sm">Subject:</p>
              <Badge variant="outline">{data.data.data.t.subject.name}</Badge>
            </div>
          </div>
          <T data={data.data.data} />
        </div>
      </div>
    </>
  );
};
export default Marksheet;
