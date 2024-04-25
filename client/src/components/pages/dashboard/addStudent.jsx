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
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import useStandards from "../../../hooks/query/useStandards";
import { useForm } from "react-hook-form";
import useAddStudent from "../../../hooks/mutation/useAddStudent";

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
    <AlertDialog open>
      <AlertDialogContent className="w-[95%] max-w-lg rounded-lg">
        <div className="mx-auto max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-xl font-bold">Add Student</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Enter the student details to add them to the database.
            </p>
          </div>
          <form
            className="space-y-4"
            onSubmit={(e) =>
              handleSubmit((d) => {
                clearErrors();
                handleAddStudent(d);
              })(e)
            }
          >
            <div className="space-y-1">
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
            <div className="space-y-1">
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
            <div className="space-y-1">
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
            <div className="space-y-1">
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

            <div className="space-y-3">
              <Button
                disabled={addStudent.isLoading}
                className="w-full"
                type="submit"
              >
                {addStudent.isLoading ? <Loading /> : "Add Student"}
              </Button>
              <Button
                className="w-full"
                variant="outline"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddStudent;
