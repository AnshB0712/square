import { useQuery } from "react-query";
import usePrivateAxios from "../usePrivateAxios";

const getTests = async (axios) => {
  const res = await axios.get("/teacher/tests");
  return res;
};

const useTests = () => {
  const axios = usePrivateAxios();
  const q = useQuery({
    queryKey: ["tests"],
    queryFn: () => getTests(axios),
    staleTime: 10_000,
  });
  return q;
};

export default useTests;
