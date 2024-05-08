import { useQuery } from "react-query";
import usePrivateAxios from "../usePrivateAxios";

const getTest = async (axios, testId) => {
  const res = await axios.get(`/teacher/tests/${testId}`);
  return res;
};

const useGetTest = ({ testId }) => {
  const axios = usePrivateAxios();
  const q = useQuery({
    queryKey: ["tests", testId],
    queryFn: () => getTest(axios, testId),
    staleTime: 10_000,
    enabled: !!testId,
  });
  return q;
};

export default useGetTest;
