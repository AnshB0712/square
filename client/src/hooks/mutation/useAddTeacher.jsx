import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import usePrivateAxios from "../usePrivateAxios";

const addTeacher = async (details, axiosInstance) => {
  const res = await axiosInstance.post("/auth/register/teacher", details);
  return res;
};

const useAddTeacher = () => {
  const axios = usePrivateAxios();
  const mutate = useMutation({
    mutationFn: (details) => addTeacher(details, axios),
    onSuccess: () => {
      toast("Teacher has been registered", {
        description: `${new Intl.DateTimeFormat("en-GB", {
          dateStyle: "full",
          timeStyle: "long",
          timeZone: "Asia/Kolkata",
        }).format(Date.now())}`,
      });
    },
  });
  return mutate;
};

export default useAddTeacher;
