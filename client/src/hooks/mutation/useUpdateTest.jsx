import { useMutation } from "react-query";
import { toast } from "sonner";
import usePrivateAxios from "../usePrivateAxios";

const updateTest = async (id, details, axiosInstance) => {
  const res = await axiosInstance.patch(`/teacher/update-test/${id}`, details);
  return res;
};

const useUpdateTest = () => {
  const axios = usePrivateAxios();
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
    },
  });
  return mutate;
};

export default useUpdateTest;
