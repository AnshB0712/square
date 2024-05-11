import { useQuery } from "@tanstack/react-query";
import usePrivateAxios from "../usePrivateAxios";

const getMarksheet = async (testId, axios) => {
  const res = await axios.get(`/teacher/marksheet/${testId}`);
  return res;
};

const useGetMarksheet = ({ testId }) => {
  const axios = usePrivateAxios();
  const q = useQuery({
    queryKey: ["marksheet", testId],
    queryFn: () => getMarksheet(testId, axios),
    staleTime: Infinity,
    enabled: !!testId,
  });

  return q;
};

export default useGetMarksheet;
