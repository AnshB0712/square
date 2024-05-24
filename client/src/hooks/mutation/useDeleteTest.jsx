import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import usePrivateAxios from "../usePrivateAxios";

const deleteTest = async (id, axiosInstance) => {
  const res = await axiosInstance.delete(`/teacher/delete-test/${id}`);
  return res;
};

const useDeleteTest = () => {
  const axios = usePrivateAxios();
  const queryClient = useQueryClient();
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
      queryClient.invalidateQueries({ queryKey: ["test"] });
    },
    onError: (e) => {
      toast.error(
        `Error: ${
          e?.response?.data?.message ?? e.message ?? "Something went wrong."
        }`,
        {
          description: `${new Intl.DateTimeFormat("en-GB", {
            dateStyle: "full",
            timeStyle: "long",
            timeZone: "Asia/Kolkata",
          }).format(Date.now())}`,
        }
      );
    },
  });
  return mutate;
};

export default useDeleteTest;
