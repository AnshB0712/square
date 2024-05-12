import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loading } from "../../layout/loading.jsx";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../../hooks/mutation/useLogin.jsx";

const FormFieldRender = ({ role, register, errors }) => {
  let content;

  switch (role) {
    case "teacher":
      content = (
        <>
          <div className="grid gap-2">
            <Label htmlFor="email">Email/Phone</Label>
            <Input
              {...register("uniqueField", { required: true })}
              id="email"
              name="uniqueField"
              type="text"
              className={`${
                errors["uniqueField"] ? "border-red-600 text-red-600" : ""
              }`}
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
            </div>
            <Input
              {...register("password", { required: true })}
              id="password"
              name="password"
              type="password"
              className={`${
                errors["password"] ? "border-red-600 text-red-600" : ""
              }`}
            />
          </div>
        </>
      );
      break;
    case "admin":
      content = (
        <>
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              {...register("phone", { required: true })}
              id="phone"
              name="phone"
              type="phone"
              className={`${
                errors["phone"] ? "border-red-600 text-red-600" : ""
              }`}
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
            </div>
            <Input
              {...register("password", { required: true })}
              id="password"
              name="password"
              type="password"
              className={`${
                errors["password"] ? "border-red-600 text-red-600" : ""
              }`}
            />
          </div>
        </>
      );
      break;
    case "student":
      content = (
        <>
          <div className="grid gap-2">
            <Label htmlFor="roll">Roll No.</Label>
            <Input
              {...register("roll", { required: true })}
              id="roll"
              name="roll"
              type="number"
              placeholder="000000"
              className={`${
                errors["roll"] ? "border-red-600 text-red-600" : ""
              }`}
            />
            <p className="text-[0.8rem] text-muted-foreground">
              Enter the unique roll that class have provided to you.
            </p>
          </div>
        </>
      );
      break;
    default:
      content = "";
  }

  return content;
};

export function LoginForm() {
  const [role, setRole] = useState("");
  const { register, handleSubmit, reset, formState, setError, clearErrors } =
    useForm();
  const navigate = useNavigate();
  const login = useLogin(`auth/login/${role}`);

  const handleLogin = async (details) => {
    login.mutate(
      {
        details,
      },
      {
        onError: (e) =>
          setError("formError", {
            type: "custom",
            message: e.response.data.message,
          }),
        onSuccess: () => navigate("/dashboard"),
      }
    );
  };

  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role]);

  return (
    <Card className="mx-auto max-w-sm my-5">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your detials below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Who are you?</Label>
            <Select onValueChange={(e) => setRole(e)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select you Role" value={role} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="teacher">Teacher</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <form
            className="grid gap-3"
            onSubmit={(e) => {
              clearErrors();
              handleSubmit(handleLogin)(e);
            }}
          >
            <FormFieldRender
              role={role}
              register={register}
              errors={formState.errors}
            />

            {formState.errors["formError"] && (
              <p className="text-[0.8rem] font-medium italic text-red-600 text-center">
                Error: {formState.errors["formError"].message}
              </p>
            )}

            <Button
              disabled={!role}
              className="w-full my-2"
              size="lg"
              type="submit"
            >
              {login.isPending ? <Loading /> : "Login"}
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
