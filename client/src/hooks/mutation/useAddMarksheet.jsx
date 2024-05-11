import { useMutation } from "react-query";
import { toast } from "sonner";
import usePrivateAxios from "../usePrivateAxios";

const addMarksheet = async ({ details, testId }, axiosInstance) => {
  const res = await axiosInstance.post(
    `teacher/new-marksheet/${testId}`,
    details
  );
  return res;
};

const useAddMarksheet = () => {
  const axios = usePrivateAxios();
  const mutate = useMutation({
    mutationFn: ({ details, testId }) =>
      addMarksheet({ details, testId }, axios),
    onSuccess: () => {
      toast("Marksheet has been created", {
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

export default useAddMarksheet;
