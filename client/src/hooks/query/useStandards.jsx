import { useQuery } from "@tanstack/react-query";
import usePrivateAxios from "../usePrivateAxios";

const getStandards = async (axios) => {
  const res = await axios.get("/utils/standards");
  return res;
};

const useStandards = () => {
  const axios = usePrivateAxios();
  const q = useQuery({
    queryKey: ["standards"],
    queryFn: () => getStandards(axios),
    staleTime: Infinity,
  });

  return q;
};

export default useStandards;
