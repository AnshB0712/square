import { useQuery } from "react-query";
import { customAxios } from "../../api/axios";

const getSubjects = async () => {
  const res = await customAxios.get("/utils/subjects");
  return res;
};

const useSubjects = () => {
  const q = useQuery({
    queryKey: ["subjects"],
    queryFn: getSubjects,
    staleTime: Infinity,
  });

  return q;
};

export default useSubjects;
