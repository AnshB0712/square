import { Link, useNavigate, useParams } from "react-router-dom";
import React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
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
import { Loading } from "../../layout/loading";
import useGetMarksheet from "../../../hooks/query/useGetMarksheet";
import useUpdateMarksheet from "../../../hooks/mutation/useUpdateMarkseet";
import { buttonVariants } from "../../ui/button";

const T = ({ testId, data, form, columns }) => {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const table = useReactTable({
    data,
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
  const updateMarksheet = useUpdateMarksheet();
  const navigate = useNavigate();

  const handleSubmit = (d) => {
    const { sheet, fullMarksOfTest } = d;

    const marksGreaterThanFullmarks = Object.entries(sheet).filter(
      /* eslint-disable no-unused-vars */
      ([_, val]) => +val.marks > +fullMarksOfTest
    );

    if (marksGreaterThanFullmarks.length) {
      form.setError("formError", {
        type: "custom",
        required: true,
        message: "Marks cannot be greater than the Fullmarks.",
      });
      form.setFocus(`sheet.${marksGreaterThanFullmarks[0][0]}.marks`);
      return;
    }

    updateMarksheet.mutate(
      { details: { sheet, fullMarksOfTest }, testId },
      {
        onError: (e) =>
          form.setError("formError", {
            type: "custom",
            message: e.response.data.message,
          }),
        onSuccess: () => {
          navigate("/dashboard");
        },
      }
    );
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={(e) => {
            form.clearErrors();
            form.handleSubmit((d) => {
              handleSubmit(d);
            })(e);
          }}
          className="space-y-6"
        >
          <div className="flex gap-2 justify-center items-center py-4">
            <div className="space-y-2">
              <FormLabel>Filter by Name</FormLabel>
              <Input
                placeholder="Filter name..."
                className="max-w-sm "
                onChange={(event) =>
                  table.getColumn("name")?.setFilterValue(event.target.value)
                }
              />
            </div>

            <FormField
              control={form.control}
              name="fullMarksOfTest"
              rules={{ required: true, valueAsNumber: true }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fullmarks</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="fullmarks..."
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
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
            <Button
<<<<<<< HEAD
              disabled={updateMarksheet.isLoading}
=======
              disable={updateMarksheet.isPending}
>>>>>>> main
              className="w-full"
              type="submit"
              size="lg"
            >
              {updateMarksheet.isPending ? <Loading /> : "Update Marksheet"}
            </Button>
            <Link
              to="/dashboard"
              style={{
                pointerEvents: updateMarksheet.isPending ? "none" : "auto",
              }}
              className={`${buttonVariants({ variant: "outline" })} w-full`}
            >
              Cancel
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};

const EditMarksheet = () => {
  const { testId } = useParams();
  const { data, isLoading } = useGetMarksheet({ testId });

  const form = useForm({
    defaultValues: {},
    values: data?.data?.data?.m,
  });
  const columns = React.useMemo(
    () => [
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
                rules={{ required: true, valueAsNumber: true }}
                name={`sheet.${row.original["_id"]}.marks`}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Marks</FormLabel>
                      <Input {...field} type="number" placeholder="marks..." />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name={`sheet.${row.original["_id"]}.remark`}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Remark</FormLabel>
                      <Input
                        {...field}
                        placeholder="can do better..."
                        className="max-w-sm"
                      />
                    </FormItem>
                  );
                }}
              />
            </div>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  if (isLoading) return <Loading />;

  return (
    <>
      <div className="w-full max-w-lg rounded-lg">
        <div className="mx-auto max-w-md space-y-2 ">
          <div className="text-center">
            <h1 className="text-xl font-bold">Marksheet</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Update a Marksheet for Test.
            </p>
          </div>
          <br />
          <T
            data={data.data.data.students}
            form={form}
            columns={columns}
            testId={testId}
          />
        </div>
      </div>
    </>
  );
};
export default EditMarksheet;
