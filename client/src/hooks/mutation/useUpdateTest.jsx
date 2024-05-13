import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import usePrivateAxios from "../usePrivateAxios";

const updateTest = async (id, details, axiosInstance) => {
  const res = await axiosInstance.patch(`/teacher/update-test/${id}`, details);
  return res;
};

const useUpdateTest = () => {
  const axios = usePrivateAxios();
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: ({ id, details }) => updateTest(id, details, axios),
    onSuccess: () => {
      toast("Test has been updated", {
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

export default useUpdateTest;
