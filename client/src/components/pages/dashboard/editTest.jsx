import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import React from "react";
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
import { Separator } from "@/components/ui/separator";
import useStandards from "../../../hooks/query/useStandards";
import useSubjects from "../../../hooks/query/useSubjects";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "../../../lib/utils";
import useUpdateTest from "../../../hooks/mutation/useUpdateTest";
import useGetTest from "../../../hooks/query/useGetTest";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import useDeleteTest from "../../../hooks/mutation/useDeleteTest";

const MDX = React.lazy(() => import("./mdx"));

const EditTestForm = ({ data, subjects, standards, testId }) => {
  const updateTest = useUpdateTest();
  const deleteTest = useDeleteTest();
  const navigate = useNavigate();
  const { on, name, description, standard, subject } = data.data.data;
  const form = useForm({
    defaultValues: {
      on,
      name,
      description,
      standard: standard._id,
      subject: subject._id,
    },
  });

  const handleUpdateTest = (details) => {
    updateTest.mutate(
      {
        id: testId,
        details,
      },
      {
        onError: (e) =>
          form.setError("formError", {
            type: "custom",
            message: e.response.data.message,
          }),
        onSuccess: () => {
          navigate(-1);
        },
      }
    );
  };

  const handleDeleteTest = () => {
    deleteTest.mutate(
      {
        id: testId,
      },
      {
        onError: (e) =>
          form.setError("formError", {
            type: "custom",
            message: e.response.data.message,
          }),
        onSuccess: () => {
          navigate(-1);
        },
      }
    );
  };

  return (
    <>
      <div className="w-full max-w-lg rounded-lg">
        <div className="mx-auto max-w-md space-y-2 ">
          <div className="text-center">
            <h1 className="text-xl font-bold">Update Test</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Update the Test details or Delete Test.
            </p>
          </div>
          <Form {...form}>
            <form
              className="space-y-5"
              onSubmit={(e) => {
                form.clearErrors();
                form.handleSubmit((d) => {
                  handleUpdateTest(d);
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
                        <Input
                          id="name"
                          size="lg"
                          placeholder="Unit/SA/Final/Weekly"
                          value={field.value}
                          onChange={field.onChange}
                          className={`${
                            form.formState.errors["name"]
                              ? "border-red-600 text-red-600"
                              : ""
                          }`}
                        />
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
                        <React.Suspense fallback={<Loading />}>
                          <MDX
                            setValue={form.setValue}
                            markdown={field.value}
                          />
                        </React.Suspense>
                      </FormItem>
                    );
                  }}
                />
              </div>
              <div className="space-y-1">
                {
                  <FormField
                    control={form.control}
                    name="standard"
                    rules={{ required: true }}
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Standard</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger size="lg">
                                <SelectValue placeholder="Select Standard" />
                              </SelectTrigger>
                            </FormControl>
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
                        </FormItem>
                      );
                    }}
                  />
                }
              </div>
              <div className="space-y-1">
                {
                  <FormField
                    control={form.control}
                    name="subject"
                    rules={{ required: true }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger size="lg">
                              <SelectValue placeholder="Select Subject" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {subjects.data.subjects.map((sub) => (
                              <SelectItem key={sub._id} value={sub._id}>
                                {sub?.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                }
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
                                className={`${
                                  form.formState.errors["on"]
                                    ? "border-red-600 text-red-600"
                                    : ""
                                }${cn(
                                  "pl-3 text-left text-sm font-normal w-full"
                                )}`}
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
              {form.formState.errors["formError"] && (
                <FormMessage className="text-[0.8rem text-red-500 text-center italic">
                  Error: {form.formState.errors["formError"].message}
                </FormMessage>
              )}
              <Separator />
              <div className="space-y-3">
                <Button
                  disabled={updateTest.isPending || deleteTest.isPending}
                  className="w-full"
                  type="submit"
                  size="lg"
                >
                  {updateTest.isPending ? <Loading /> : "Update"}
                </Button>
                <Button
                  className="w-full border-red-500 text-red-500"
                  variant="outline"
                  onClick={handleDeleteTest}
                  size="lg"
                  disabled={updateTest.isPending || deleteTest.isPending}
                >
                  {deleteTest.isPending ? <Loading /> : "Delete Test"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

const EditTest = () => {
  const { testId } = useParams();
  const { data: standards, isLoading: standardsLoading } = useStandards();
  const { data: subjects, isLoading: subjectLoading } = useSubjects();
  const { data, isLoading } = useGetTest({ testId });

  if (isLoading || standardsLoading || subjectLoading)
    return (
      <div className="grid place-items-center h-[50vh]">
        <Loading />
      </div>
    );

  return (
    <EditTestForm
      testId={testId}
      data={data}
      standards={standards}
      subjects={subjects}
    />
  );
};

export default EditTest;
