import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import useStandards from "../../../hooks/query/useStandards";
import { useFieldArray, useForm } from "react-hook-form";
import { PlusIcon, MinusIcon } from "lucide-react";
import useSubjects from "../../../hooks/query/useSubjects";
import useAddTeacher from "../../../hooks/mutation/useAddTeacher";
import { Loading } from "../../layout/loading";
import { buttonVariants } from "../../ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const SelectPicker = ({
  standards,
  subjects,
  index,
  control,
  remove,
  errors,
}) => {
  return (
    <div className="flex justify-between items-center gap-2">
      <FormField
        control={control}
        name={`standardAssigned.${index}.standard`}
        rules={{ required: true }}
        render={({ field }) => {
          return (
            <FormItem>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger
                    size="lg"
                    className={`${
                      errors?.["stanadardAssigned"]?.[index]?.["standard"]
                        ? "border-red-600 text-red-600"
                        : ""
                    }`}
                  >
                    <SelectValue placeholder="Standard" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {standards.map((std) => (
                    <SelectItem key={std._id} value={std._id}>
                      {std.class}
                      {std.field === "NONE" ? "" : ` - ${std.field}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          );
        }}
      />

      <Button
        onClick={() => remove(index)}
        size="icon"
        className="h-8 w-8 rounded-full"
        variant="outline"
      >
        <MinusIcon className="h-4 w-4 text-red-500" />
      </Button>

      <FormField
        control={control}
        name={`standardAssigned.${index}.subject`}
        rules={{ required: true }}
        render={({ field }) => {
          return (
            <FormItem>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                className={`${
                  errors?.["stanadardAssigned"]?.[index]?.["subject"]
                    ? "border-red-600 text-red-600"
                    : ""
                }`}
              >
                <FormControl>
                  <SelectTrigger className="w-18">
                    <SelectValue placeholder="Subject" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {subjects.map((sub) => (
                    <SelectItem key={sub._id} value={sub._id}>
                      {sub.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          );
        }}
      />
    </div>
  );
};

const StandardAssigned = ({
  standards,
  subjects,
  fields,
  append,
  remove,
  control,
  errors,
}) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Label htmlFor="standard-assigned">Standard Assigned</Label>
        <Button
          onClick={() => append({ standard: "", subject: "" })}
          size="icon"
          className="h-8 w-8 rounded-full"
          variant="outline"
        >
          <PlusIcon className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex flex-col justify-center items-center gap-1">
        {fields.map((item, i) => {
          return (
            <SelectPicker
              errors={errors}
              key={item.id}
              index={i}
              remove={remove}
              control={control}
              standards={standards}
              subjects={subjects}
            />
          );
        })}
      </div>
    </>
  );
};

const AddTeacher = () => {
  const { data: standards, isLoading: standardLoading } = useStandards();
  const { data: subjects, isLoading: subjectLoading } = useSubjects();
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      standardAssigned: [{ standard: "", subject: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "standardAssigned",
    rules: { required: true },
  });

  const addTeacher = useAddTeacher();

  const handleAddTeacher = (details) => {
    if (!details.standardAssigned.length) {
      form.setError("standardAssigned", {
        type: "custom",
        message: "At least assign one subject and standard.",
        required: true,
      });
    }

    addTeacher.mutate(details, {
      onError: (e) => {
        form.setError("formError", {
          type: "custom",
          message: e.response.data.message,
        });
      },
      onSuccess: () => {
        navigate(-1);
      },
    });
  };

  return (
    <>
      <div className="max-w-lg rounded-lg">
        <div className="mx-auto max-w-md ">
          <div className="space-y-2 text-center">
            {/* <h1 className="text-xl font-bold">Add a Teacher</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Fill out the form to add a new teacher.
            </p> */}
          </div>
          <Form {...form}>
            <form
              onSubmit={(e) => {
                form.handleSubmit((d) => {
                  form.clearErrors();
                  handleAddTeacher(d);
                })(e);
              }}
              className="space-y-6"
            >
              <div className="space-y-2">
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
                            placeholder="Enter teacher name..."
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
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="phone"
                  rules={{ required: true }}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter teacher phone..."
                            size="lg"
                            type="number"
                            className={`${
                              form.formState?.errors?.["phone"]
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
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="mail"
                  rules={{ required: true }}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>E-Mail</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter teacher mail..."
                            size="lg"
                            type="email"
                            className={`${
                              form.formState?.errors?.["mail"]
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
              <div className="space-y-2">
                {!subjectLoading && !standardLoading && (
                  <StandardAssigned
                    fields={fields}
                    append={append}
                    remove={remove}
                    errors={form.formState.errors}
                    control={form.control}
                    subjects={subjects.data.subjects}
                    standards={standards.data.standards}
                  />
                )}
              </div>

              {form.formState.errors["formError"] && (
                <FormMessage className="text-[0.8rem] text-red-600 text-center">
                  {form.formState.errors["formError"].message}
                </FormMessage>
              )}

              <div>
                <Button
                  disabled={addTeacher.isPending}
                  className="w-full"
                  type="submit"
                >
                  {addTeacher.isPending ? <Loading /> : "Add Teacher"}
                </Button>
              </div>
            </form>
          </Form>
          <Link
            to="/dashboard"
            style={{
              pointerEvents: addTeacher.isPending ? "none" : "auto",
            }}
            className={`${buttonVariants({ variant: "outline" })} w-full mt-3`}
          >
            Cancel
          </Link>
        </div>
      </div>
    </>
  );
};

export default AddTeacher;
