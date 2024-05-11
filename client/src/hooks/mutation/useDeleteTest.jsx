import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import usePrivateAxios from "../usePrivateAxios";

const deleteTest = async (id, axiosInstance) => {
  const res = await axiosInstance.delete(`/teacher/delete-test/${id}`);
  return res;
};

const useDeleteTest = () => {
  const axios = usePrivateAxios();
  const mutate = useMutation({
    mutationFn: ({ id }) => deleteTest(id, axios),
    onSuccess: () => {
      toast("Test has been deleted.", {
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

export default useDeleteTest;
