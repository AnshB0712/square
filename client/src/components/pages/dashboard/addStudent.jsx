import { Input } from "@/components/ui/input";
import { Loading } from "../../layout/loading";
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
import { useForm } from "react-hook-form";
import useAddStudent from "../../../hooks/mutation/useAddStudent";
import { buttonVariants } from "../../ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const AddStudent = () => {
  const navigate = useNavigate();
  const form = useForm();
  const { data, isLoading } = useStandards();
  const addStudent = useAddStudent();

  const handleAddStudent = (details) => {
    addStudent.mutate(details, {
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
      <>
        <div className="mx-auto max-w-md">
          <div className="space-y-2 text-center">
            <h1 className="text-xl font-bold">Add Student</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Enter the student details to add them to the database.
            </p>
          </div>
          <Form {...form}>
            <form
              className="space-y-6"
              onSubmit={(e) =>
                form.handleSubmit((d) => {
                  form.clearErrors();
                  handleAddStudent(d);
                })(e)
              }
            >
              <div className="space-y-1">
                <FormField
                  control={form.control}
                  rules={{ required: true }}
                  name="name"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            size="lg"
                            placeholder="student name..."
                            type="text"
                            className={`${
                              form.formState.errors?.["name"]
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
                  rules={{ required: true }}
                  name="phone"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="student's guardian phone..."
                            size="lg"
                            type="number"
                            className={`${
                              form.formState.errors?.["phone"]
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
                  rules={{ required: true }}
                  name="fees"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Fees</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="annual fees of a student..."
                            size="lg"
                            type="number"
                            className={`${
                              form.formState.errors?.["fees"]
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
                  rules={{ required: true }}
                  name="standard"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Standard</FormLabel>
                        {isLoading ? (
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
                                <SelectValue placeholder="Select standard" />
                              </SelectTrigger>
                              <SelectContent>
                                {data.data.standards.map((std) => (
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

              {form.formState?.errors?.["formError"] && (
                <FormMessage className="text-[0.8rem] text-red-600 text-center">
                  {form.formState?.errors?.["formError"].message}
                </FormMessage>
              )}

              <br />
              <br />

              <div className="space-y-2">
                <Button
                  disabled={addStudent.isPending}
                  className="w-full"
                  size="lg"
                  type="submit"
                >
                  {addStudent.isPending ? <Loading /> : "Add Student"}
                </Button>
                <Link
                  to="/dashboard"
                  style={{
                    pointerEvents: addStudent.isPending ? "none" : "auto",
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
      </>
    </>
  );
};

export default AddStudent;
