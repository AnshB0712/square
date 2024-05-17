import { useQuery } from "@tanstack/react-query";
import usePrivateAxios from "../usePrivateAxios";

const getTest = async (axios, testId, isStudent) => {
  const res = await axios.get(
    isStudent ? `student/test-info/${testId}` : `/teacher/tests/${testId}`
  );
  return res;
};

const useGetTest = ({ testId, isStudent }) => {
  const axios = usePrivateAxios();
  const q = useQuery({
    queryKey: ["tests", testId],
    queryFn: () => getTest(axios, testId, isStudent),
    enabled: !!testId,
  });
  return q;
};

export default useGetTest;
