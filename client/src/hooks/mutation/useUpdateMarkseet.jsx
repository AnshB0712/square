import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import usePrivateAxios from "../usePrivateAxios";

const updateMarksheet = async ({ details, testId }, axiosInstance) => {
  const res = await axiosInstance.patch(
    `teacher/update-marksheet/${testId}`,
    details
  );
  return res;
};

const useUpdateMarksheet = () => {
  const axios = usePrivateAxios();
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: ({ details, testId }) =>
      updateMarksheet({ details, testId }, axios),
    onSuccess: () => {
      toast("Marksheet has been updated", {
        description: `${new Intl.DateTimeFormat("en-GB", {
          dateStyle: "full",
          timeStyle: "long",
          timeZone: "Asia/Kolkata",
        }).format(Date.now())}`,
      });
      queryClient.invalidateQueries({ queryKey: ["marksheet"] });
    },
  });
  return mutate;
};

export default useUpdateMarksheet;
