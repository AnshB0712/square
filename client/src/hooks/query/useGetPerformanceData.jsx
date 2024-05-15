import { useQuery } from "@tanstack/react-query";
import usePrivateAxios from "../usePrivateAxios";

const getPerformanceData = ({ axios, subjectId }) => {
  const res = axios.get(`student/performance-data/${subjectId}`);
  return res;
};

const useGetPerformanceData = ({ subjectId }) => {
  const axios = usePrivateAxios();
  const q = useQuery({
    queryKey: [
      "performance-data",
      {
        subjectId,
      },
    ],
    queryFn: () => getPerformanceData({ axios, subjectId }),
    enabled: !!subjectId,
  });
  return q;
};

export default useGetPerformanceData;
