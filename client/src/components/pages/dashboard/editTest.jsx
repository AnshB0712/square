import { useParams,useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form'
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
import useStandards from "../../../hooks/query/useStandards";
import useSubjects from "../../../hooks/query/useSubjects";
import { CalendarIcon, Trash, UploadIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "../../../lib/utils";
import useUpdateTest from "../../../hooks/mutation/useUpdateTest";
import useGetTest from "../../../hooks/query/useGetTest";

const MDX = React.lazy(() => import("./mdx"));

const EditTest = () => {
  const { testId } = useParams();
  const { data: standards, isLoading : standardsLoading} = useStandards();
  const { data: subjects, isLoading: subjectLoading } = useSubjects();
  const { data } = useGetTest(
    {testId})
    console.log(data)
  const updateTest = useUpdateTest()
  const { register, handleSubmit, setValue, formState, setError, clearErrors }  = useForm()
  const [calendarValue, setCalendarValue] = useState();
  
  const handleUpdateStudent = (details) => {
    if (!details.standard) {
      setError("standard", {
        type: "custom",
        required: true,
      });
      return;
    }
    if (!details.subject) {
      setError("subject", {
        type: "custom",
        required: true,
      });
      return;
    }
    if (!details.on) {
      setError("on", {
        type: "custom",
        required: true,
      });
      return;
    }
    if (!details.description) {
      setError("formError", {
        type: "custom",
        required: true,
        message: "Description is Mandatory.",
      });
      return;
    }

    const { standard, subject, on, description, name, file } = details;
    const data = {
      forStandard: standard,
      forSubject: subject,
      name,
      description,
      on
    };

    updateTest.mutate({
      id:testId,
      details: data
    }, {
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
      <div className="w-full max-w-lg rounded-lg">
        <div className="mx-auto max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-xl font-bold">Update Test</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Enter the Test details to add them to the database.
            </p>
          </div>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              clearErrors();
              handleSubmit((d) => {
                console.log(d);
                handleUpdateStudent(d);
              })(e);
            }}
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
              <Label htmlFor="standard">Standard</Label>
              { standardsLoading ? (
                <p className="flex justify-center">
                  <Loading size={4} />
                </p>
              ) : (
                <Select
                  id="standard"
                  {...register("standard", { required: true })}
                  onValueChange={(e) => setValue("standard", e)}
                >
                  <SelectTrigger
                    className={`${
                      formState.errors["standard"] ? "border-red-600" : ""
                    }`}
                  >
                    <SelectValue placeholder="Select Standard" />
                  </SelectTrigger>
                  <SelectContent>
                    {standards.data.standards.map((std) => (
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
              <Label htmlFor="standard">Subject</Label>
              {subjectLoading ? (
                <p className="flex justify-center">
                  <Loading size={4} />
                </p>
              ) : (
                <Select
                  id="subject"
                  {...register("subject", { required: true })}
                  onValueChange={(e) => setValue("subject", e)}
                >
                  <SelectTrigger
                    className={`${
                      formState.errors["subject"] ? "border-red-600" : ""
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
              <Label htmlFor="standard">Date of Test</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    {...register("on", { required: true })}
                    className={`${
                      formState.errors["on"]
                        ? "border-red-600 text-red-600"
                        : ""
                    }${cn("pl-3 text-left font-normal w-full")}`}
                  >
                    {calendarValue ? (
                      format(calendarValue, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={calendarValue}
                    onSelect={(e) => {
                      setCalendarValue(e);
                      setValue("on", e);
                    }}
                    disabled={(date) => date < new Date().setHours(0, 0, 0, 0)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {formState.errors["formError"] && (
              <p className="text-[0.8rem] text-red-600 text-center">
                {formState.errors["formError"].message}
              </p>
            )}

            <div className="space-y-3">
              <Button
                disabled={updateTest.isLoading}
                className="w-full"
                type="submit"
              >
                {updateTest.isLoading ? <Loading /> : "Update"}
              </Button>
              <Button
                className="w-full border-red-500"
                variant="outline"
                onClick={() => navigate(-1)}
              >
                Delete Test
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditTest;
