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
import { useForm } from "react-hook-form";
import { PlusIcon, MinusIcon } from "lucide-react";
import useSubjects from "../../../hooks/query/useSubjects";
import { useEffect, useState } from "react";
import useAddTeacher from "../../../hooks/mutation/useAddTeacher";
import { Loading } from "../../layout/loading";
import { buttonVariants } from "../../ui/button";

const SelectPicker = ({
  standards,
  subjects,
  index,
  removeInput,
  setValue,
}) => {
  const [details, setDetails] = useState({ index });

  useEffect(() => {
    if (Object.keys(details).length === 3) {
      setValue((p) => [...p, details]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [details]);

  return (
    <div className="flex justify-between items-center gap-2">
      <Select
        onValueChange={(e) => {
          setDetails((p) => ({ ...p, standard: e }));
        }}
      >
        <SelectTrigger className="w-18">
          <SelectValue placeholder="Standard" />
        </SelectTrigger>
        <SelectContent>
          {standards.map((std) => (
            <SelectItem key={std._id} value={std._id}>
              {std.class}
              {std.field === "NONE" ? "" : ` - ${std.field}`}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button
        onClick={() => removeInput?.(index)}
        size="icon"
        className="h-8 w-8 rounded-full"
        variant="outline"
      >
        <MinusIcon className="h-4 w-4 text-red-500" />
      </Button>
      <Select
        onValueChange={(e) => {
          setDetails((p) => ({ ...p, subject: e }));
        }}
      >
        <SelectTrigger className="w-18">
          <SelectValue placeholder="Subject" />
        </SelectTrigger>
        <SelectContent>
          {subjects.map((sub) => (
            <SelectItem key={sub._id} value={sub._id}>
              {sub.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

const StandardAssigned = ({ standards, subjects, onChange }) => {
  const [value, setValue] = useState([]);
  const [component, setcomponent] = useState([
    <SelectPicker
      standards={standards}
      setValue={setValue}
      subjects={subjects}
      key={0}
      index={0}
    />,
  ]);

  useEffect(() => {
    if (value.length) onChange(value);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const addInput = () => {
    setcomponent([
      ...component,
      <SelectPicker
        standards={standards}
        subjects={subjects}
        key={component.length}
        index={component.length}
        removeInput={removeInput}
        setValue={setValue}
      />,
    ]);
  };

  const removeInput = (index) => {
    setcomponent((p) => p.filter((c) => c.props.index !== index));
    setValue((v) => v.filter((p) => p.index !== index));
  };
  return (
    <>
      <div className="flex items-center justify-between">
        <Label htmlFor="standard-assigned">Standard Assigned</Label>
        <Button
          onClick={addInput}
          size="icon"
          className="h-8 w-8 rounded-full"
          variant="outline"
        >
          <PlusIcon className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex flex-col justify-center items-center gap-1">
        {component.map((c) => c)}
      </div>
    </>
  );
};

const AddTeacher = () => {
  const { data: standards, isLoading: standardLoading } = useStandards();
  const { data: subjects, isLoading: subjectLoading } = useSubjects();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState, setError, clearErrors } =
    useForm();

  const addTeacher = useAddTeacher();

  const handleAddTeacher = (details) => {
    if (!details.standardAssigned) {
      setError("standardAssigned", {
        type: "custom",
        required: true,
      });
      return;
    }

    addTeacher.mutate(details, {
      onError: (e) => {
        setError("formError", {
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
            <h1 className="text-xl font-bold">Add a Teacher</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Fill out the form to add a new teacher.
            </p>
          </div>
          <form onSubmit={handleSubmit(handleAddTeacher)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                {...register("name", { required: true })}
                id="name"
                className={`${
                  formState.errors["name"] ? "border-red-600 text-red-600" : ""
                }`}
                placeholder="Enter the teacher's name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                {...register("phone", { required: true })}
                className={`${
                  formState.errors["phone"] ? "border-red-600 text-red-600" : ""
                }`}
                placeholder="Enter the teacher's phone number"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                {...register("mail", { required: true })}
                className={`${
                  formState.errors["mail"] ? "border-red-600 text-red-600" : ""
                }`}
                placeholder="Enter the teacher's email"
                type="email"
              />
            </div>
            <div className="space-y-2">
              {!subjectLoading && !standardLoading && (
                <StandardAssigned
                  onChange={(e) => setValue("standardAssigned", e)}
                  subjects={subjects.data.subjects}
                  standards={standards.data.standards}
                />
              )}
            </div>

            {formState.errors["formError"] && (
              <p className="text-[0.8rem] text-red-600 text-center">
                {formState.errors["formError"].message}
              </p>
            )}

            <div className="space-y-2">
              <Button
                disabled={addTeacher.isPending}
                className="w-full"
                onClick={() => {
                  clearErrors();
                }}
                type="submit"
              >
                {addTeacher.isPending ? <Loading /> : "Add Teacher"}
              </Button>
              <Link
                to="/dashboard"
                style={{
                  pointerEvents: addTeacher.isPending ? "none" : "auto",
                }}
                className={`${buttonVariants({ variant: "outline" })} w-full`}
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddTeacher;
