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
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import useStandards from "../../../hooks/query/useStandards";
import { useForm } from "react-hook-form";
import useAddStudent from "../../../hooks/mutation/useAddStudent";
import useSubjects from "../../../hooks/query/useSubjects";
import { Trash, UploadIcon } from "lucide-react";

const MDX = React.lazy(() => import("./mdx"));

const FileUpload = () => {
  const [files, setFiles] = useState([]);

  const handleChange = (e) => {
    setFiles(e.target.files);
  };

  useEffect(() => {
    console.log(files);
  }, [files]);

  return (
    <>
      <Label htmlFor="file">Upload Test File</Label>
      <div className="flex flex-col items-center gap-2">
        <div className="flex flex-col min-h-9 min-w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors">
          {Array.from(files).map((file, i) => (
            <div key={i} className="flex min-w-full border border-input">
              <div className="truncate w-[50px]">{file?.name}</div>
              <Button size="icon" variant="outline">
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
        <Button size="icon" variant="outline" className="relative w-full">
          <Input
            id="file"
            multiple
            className="absolute inset-0 opacity-0"
            placeholder="Choose a file"
            type="file"
            onChange={handleChange}
          />
          <UploadIcon className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
};

const AddTest = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState, setError, clearErrors } =
    useForm();
  const { data, isLoading } = useStandards();
  const { data: subjects, isLoading: subjectLoading } = useSubjects();
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
      <AlertDialogContent className="w-[95%] max- max-w-lg rounded-lg">
        <div className="mx-auto max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-xl font-bold">Create Test</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Enter the Test details to add them to the database.
            </p>
          </div>
          <form
            encType="multipart/form-data"
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
                placeholder="Unit/SA/Final/Weekly"
                className={`${
                  formState.errors["name"] ? "border-red-600 text-red-600" : ""
                }`}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="phone">Description</Label>
              <React.Suspense fallback={<Loading />}>
                <MDX setValue={setValue} />
              </React.Suspense>
            </div>
            <div className="space-y-1">
              <Label htmlFor="standard">Subject</Label>
              {subjectLoading ? (
                <p className="flex justify-center">
                  <Loading size={4} />
                </p>
              ) : (
                <Select
                  id="standard"
                  onValueChange={(e) => setValue("subject", e)}
                >
                  <SelectTrigger
                    className={`${
                      formState.errors["standard"]
                        ? "border-red-600 text-red-600"
                        : ""
                    }`}
                  >
                    <SelectValue placeholder="Select Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.data.subjects.map((sub) => (
                      <SelectItem key={sub._id} value={sub._id}>
                        {sub?.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
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
                    <SelectValue placeholder="Select Standard" />
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

            <div className="space-y-1">
              <FileUpload />
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
                {addStudent.isLoading ? <Loading /> : "Create Test"}
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

export default AddTest;
