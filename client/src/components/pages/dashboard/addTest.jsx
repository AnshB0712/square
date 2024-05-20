import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loading } from "../../layout/loading";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import useStandards from "../../../hooks/query/useStandards";
import { useForm } from "react-hook-form";
import useSubjects from "../../../hooks/query/useSubjects";
import { CalendarIcon, Trash, UploadIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "../../../lib/utils";
import useAddTest from "../../../hooks/mutation/useAddTest";
import { buttonVariants } from "../../ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const MDX = React.lazy(() => import("./mdx"));

const FileUpload = ({ setValue }) => {
  const [f, setF] = useState([]);

  const handleChange = (e) => {
    setF(Array.from(e.target.files));
  };

  const handleDelete = (i) => {
    setF((p) => p.filter((file, index) => index !== i));
  };

  useEffect(() => {
    setValue("files", f);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [f]);

  return (
    <>
      <Label htmlFor="file">Upload Test File</Label>
      <div className="flex flex-col items-center gap-2">
        {!!f?.length && (
          <div className="flex flex-col gap-2 min-h-9 rounded-md border border-input bg-transparent p-2 text-sm w-full">
            {f?.map((file, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-2 gap-1 rounded-md text-sm font-medium border border-input bg-background shadow-sm"
              >
                {file?.name}
                <Button
                  onClick={() => handleDelete(i)}
                  variant="destructive"
                  size="icon"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
        <Button size="icon" variant="outline" className="relative w-full">
          <Input
            multiple
            onChange={handleChange}
            className={`absolute inset-0 opacity-0`}
            placeholder="Choose a file"
            type="file"
            size="lg"
          />
          <UploadIcon className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
};

const AddTest = () => {
  const navigate = useNavigate();
  const form = useForm();
  const { data: standards, isLoading: standardLoading } = useStandards();
  const { data: subjects, isLoading: subjectLoading } = useSubjects();
  const addTest = useAddTest();

  const handleAddTest = (details) => {
    addTest.mutate(details, {
      onError: (e) =>
        form.setError("formError", {
          type: "custom",
          message: e.response.data.message,
        }),
      onSuccess: () => {
        navigate(-1);
      },
    });
  };

  return (
    <>
      <div className="w-full max-h-full overflow-scroll max-w-lg rounded-lg px-1">
        <div className="mx-auto max-w-md ">
          <div className="space-y-2 text-center">
            <h1 className="text-xl font-bold">Create Test</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Enter the Test details to add them to the database.
            </p>
          </div>
          <Form {...form}>
            <form
              className="space-y-6"
              onSubmit={(e) => {
                form.clearErrors();
                form.handleSubmit((d) => {
                  console.log(d);
                  handleAddTest(d);
                })(e);
              }}
            >
              <div className="space-y-1">
                <FormField
                  control={form.control}
                  name="name"
                  rules={{ required: true }}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Unit/SA/Final/Weekly"
                            size="lg"
                            type="text"
                            className={`${
                              form.formState?.errors?.["name"]
                                ? "border-red-600 text-red-600"
                                : ""
                            }`}
                          />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
              </div>
              <div className="space-y-1">
                <FormField
                  control={form.control}
                  name="description"
                  rules={{ required: true }}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <React.Suspense fallback={<Loading />}>
                            <MDX
                              markdown={field.value}
                              setValue={form.setValue}
                            />
                          </React.Suspense>
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
              </div>
              <div className="space-y-1">
                <FormField
                  control={form.control}
                  rules={{ required: true }}
                  name="standard"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Standard</FormLabel>
                        {standardLoading ? (
                          <Loading />
                        ) : (
                          <FormControl>
                            <Select
                              id="standard"
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger
                                size="lg"
                                className={`${
                                  form.formState?.errors?.["standard"]
                                    ? "border-red-600 text-red-600"
                                    : ""
                                }`}
                              >
                                <SelectValue placeholder="Select Standard" />
                              </SelectTrigger>
                              <SelectContent>
                                {standards.data.standards.map((std) => (
                                  <SelectItem key={std._id} value={std._id}>
                                    {std.class}
                                    {std.field === "NONE"
                                      ? ""
                                      : ` - ${std.field}`}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                        )}
                      </FormItem>
                    );
                  }}
                />
              </div>
              <div className="space-y-1">
                <FormField
                  control={form.control}
                  rules={{ required: true }}
                  name="subject"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        {subjectLoading ? (
                          <Loading />
                        ) : (
                          <FormControl>
                            <Select id="subject" onValueChange={field.onChange}>
                              <SelectTrigger
                                size="lg"
                                className={`${
                                  form.formState?.errors?.["subject"]
                                    ? "border-red-600 text-red-600"
                                    : ""
                                }`}
                              >
                                <SelectValue placeholder="Select Subject" />
                              </SelectTrigger>
                              <SelectContent>
                                {subjects.data.subjects.map((sub) => (
                                  <SelectItem
                                    key={sub._id}
                                    value={sub._id}
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    {sub?.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                        )}
                      </FormItem>
                    );
                  }}
                />
              </div>

              <div className="space-y-1">
                <FormField
                  control={form.control}
                  rules={{ required: true }}
                  name="on"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Date of Test</FormLabel>
                        <FormControl>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                size="lg"
                                {...field}
                                className={`${
                                  form.formState?.errors?.["on"]
                                    ? "border-red-600 text-red-600"
                                    : ""
                                }${cn("pl-3 text-left font-normal w-full")}`}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={(e) => {
                                  field.onChange(e);
                                }}
                                disabled={(date) =>
                                  date < new Date().setHours(0, 0, 0, 0)
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
              </div>

              <div className="space-y-1">
                <FormField
                  control={form.control}
                  name="files"
                  render={() => {
                    return (
                      <FormItem>
                        <FormControl>
                          <FileUpload setValue={form.setValue} />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
              </div>

              {form.formState?.errors?.["formError"] && (
                <FormMessage className="text-[0.8rem] text-red-600 text-center">
                  {form.formState.errors["formError"].message}
                </FormMessage>
              )}

              <div className="space-y-3">
                <Button
                  disabled={addTest.isPending}
                  className="w-full"
                  type="submit"
                  size="lg"
                >
                  {addTest.isPending ? <Loading /> : "Create Test"}
                </Button>
                <Link
                  to="/dashboard"
                  style={{
                    pointerEvents: addTest.isPending ? "none" : "auto",
                  }}
                  className={`${buttonVariants({
                    variant: "outline",
                    size: "lg",
                  })} w-full`}
                >
                  Cancel
                </Link>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default AddTest;
