import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import usePrivateAxios from "../usePrivateAxios";

const addStudent = async (details, axiosInstance) => {
  const res = await axiosInstance.post("/admin/add-student", details);
  return res;
};

const useAddStudent = () => {
  const axios = usePrivateAxios();
  const mutate = useMutation({
    mutationFn: (details) => addStudent(details, axios),
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

export default useAddStudent;
