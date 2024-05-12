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
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import useStandards from "../../../hooks/query/useStandards";
import { useForm } from "react-hook-form";
import useAddStudent from "../../../hooks/mutation/useAddStudent";
import { buttonVariants } from "../../ui/button";

const AddStudent = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState, setError, clearErrors } =
    useForm();
  const { data, isLoading } = useStandards();
  const addStudent = useAddStudent();

  const handleAddStudent = (details) => {
    if (!details.standard) {
      setError("standard", {
        type: "custom",
        required: true,
      });
      return;
    }
    addStudent.mutate(details, {
      onError: (e) =>
        setError("formError", {
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
          <form
            className="space-y-6"
            onSubmit={(e) =>
              handleSubmit((d) => {
                clearErrors();
                handleAddStudent(d);
              })(e)
            }
          >
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                {...register("name", { required: true })}
                id="name"
                placeholder="Enter student's name"
                className={`${
                  formState.errors["name"] ? "border-red-600 text-red-600" : ""
                }`}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                {...register("phone", { required: true })}
                id="phone"
                placeholder="Enter student's phone number"
                type="tel"
                className={`${
                  formState.errors["phone"] ? "border-red-600 text-red-600" : ""
                }`}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fees">Fees</Label>
              <Input
                {...register("fees", { required: true })}
                id="fees"
                placeholder="Enter student's fees"
                type="number"
                className={`${
                  formState.errors["fees"] ? "border-red-600 text-red-600" : ""
                }`}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="standard">Standard</Label>
              {isLoading ? (
                <p className="flex justify-center">
                  <Loading size={4} />
                </p>
              ) : (
                <Select
                  id="standard"
                  onValueChange={(e) => setValue("standard", e)}
                >
                  <SelectTrigger
                    className={`${
                      formState.errors["standard"]
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
                        {std.field === "NONE" ? "" : ` - ${std.field}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            {formState.errors["formError"] && (
              <p className="text-[0.8rem] text-red-600 text-center">
                {formState.errors["formError"].message}
              </p>
            )}

            <div className="space-y-2 mt-auto">
              <Button
                disabled={addStudent.isPending}
                className="w-full"
                type="submit"
              >
                {addStudent.isPending ? <Loading /> : "Add Student"}
              </Button>
              <Link
                to="/dashboard"
                style={{
                  pointerEvents: addStudent.isPending ? "none" : "auto",
                }}
                className={`${buttonVariants({ variant: "outline" })} w-full`}
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </>
    </>
  );
};

export default AddStudent;
