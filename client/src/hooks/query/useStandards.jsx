import { useQuery } from "react-query";
import { customAxios } from "../../api/axios";

const getStandards = async () => {
  const res = await customAxios.get("/utils/standards");
  return res;
};

const useStandards = () => {
  const q = useQuery({
    queryKey: ["standards"],
    queryFn: getStandards,
    staleTime: Infinity,
  });

  return q;
};

export default useStandards;
