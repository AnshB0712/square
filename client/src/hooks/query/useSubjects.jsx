import { useQuery } from "@tanstack/react-query";
import usePrivateAxios from "../usePrivateAxios";

const getSubjects = async (axios) => {
  const res = await axios.get("/utils/subjects");
  return res;
};

const useSubjects = () => {
  const axios = usePrivateAxios();
  const q = useQuery({
    queryKey: ["subjects"],
    queryFn: () => getSubjects(axios),
    staleTime: Infinity,
  });

  return q;
};

export default useSubjects;
