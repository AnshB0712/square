import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import usePrivateAxios from "../usePrivateAxios";

const addTest = async (details, axiosInstance) => {
  const res = await axiosInstance.postForm("/teacher/new-test", details);
  return res;
};

const useAddTest = () => {
  const axios = usePrivateAxios();
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: (details) => addTest(details, axios),
    onSuccess: () => {
      toast("Test has been created", {
        description: `${new Intl.DateTimeFormat("en-GB", {
          dateStyle: "full",
          timeStyle: "long",
          timeZone: "Asia/Kolkata",
        }).format(Date.now())}`,
      });
      queryClient.invalidateQueries({ queryKey: ["tests"] });
    },
  });
  return mutate;
};

export default useAddTest;
