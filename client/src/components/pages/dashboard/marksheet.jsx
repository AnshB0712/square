import { useParams } from "react-router-dom";
import React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
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

const T = ({ data }) => {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});

  const columns = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      id: "actions",
      header: () => <p className="text-center">Actions</p>,
      cell: ({ row }) => {
        return (
          <div className="flex gap-1">
            <FormField
              control={form.control}
              name={`${row.original["_id"]}.marks`}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Marks</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" placeholder="marks..." />
                    </FormControl>
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name={`${row.original["_id"]}.remark`}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Remark</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="can do better..."
                        className="max-w-sm"
                      />
                    </FormControl>
                  </FormItem>
                );
              }}
            />
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: data.students,
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
    values: {
      name: table.getColumn("name")?.getFilterValue() ?? "",
    },
  });

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={(e) => {
            form.clearErrors();
            form.handleSubmit((d) => {
              console.log(d);
            })(e);
          }}
          className="space-y-6"
        >
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
                        onChange={(event) =>
                          table
                            .getColumn("name")
                            ?.setFilterValue(event.target.value)
                        }
                      />
                    </FormControl>
                  </FormItem>
                );
              }}
            />
            {
              <FormField
                control={form.control}
                name="fullmarks"
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

          {form.formState.errors["formError"] && (
            <FormMessage className="text-[0.8rem text-red-500 text-center italic">
              Error: {form.formState.errors["formError"].message}
            </FormMessage>
          )}

          <Separator />

          <div className="space-y-3">
            <Button className="w-full" type="submit" size="lg">
              {"Create Marksheet"}
            </Button>
            <Button className="w-full" variant="outline" size="lg">
              {"Cancel"}
            </Button>
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
