import { useQuery } from "@tanstack/react-query";
import usePrivateAxios from "../usePrivateAxios";

const getEnrolledSubjects = ({ axios }) => {
  const res = axios.get(`student/enrolled-subjects`);
  return res;
};

const useGetEnrolledSubjects = () => {
  const axios = usePrivateAxios();
  const q = useQuery({
    queryKey: ["enrolled-subjects"],
    queryFn: () => getEnrolledSubjects({ axios }),
    staleTime: Infinity,
  });
  return q;
};

export default useGetEnrolledSubjects;
