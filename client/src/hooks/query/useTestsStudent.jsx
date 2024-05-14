import { useQuery } from "@tanstack/react-query";
import usePrivateAxios from "../usePrivateAxios";

const getTests = async (axios) => {
  const res = await axios.get("/student/upcoming-tests");
  return res;
};

const useTestsStudent = () => {
  const axios = usePrivateAxios();
  const q = useQuery({
    queryKey: ["student-tests"],
    queryFn: () => getTests(axios),
    staleTime: 10_000,
  });
  return q;
};

export default useTestsStudent;
