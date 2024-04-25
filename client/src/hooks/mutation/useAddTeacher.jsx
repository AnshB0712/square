import { useMutation } from "react-query";
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
      toast("Student has been created", {
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
