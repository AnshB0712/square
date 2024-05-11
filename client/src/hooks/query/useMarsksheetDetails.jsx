import { useQuery } from "react-query";
import usePrivateAxios from "../usePrivateAxios";

const getMarksheetDetails = async (testId, axios) => {
  const res = await axios.get(`/teacher/marksheet-details/${testId}`);
  return res;
};

const useMarsksheetDetails = ({ testId }) => {
  const axios = usePrivateAxios();
  const q = useQuery({
    queryKey: ["marksheet", "details", testId],
    queryFn: () => getMarksheetDetails(testId, axios),
    staleTime: Infinity,
    enabled: !!testId,
  });

  return q;
};

export default useMarsksheetDetails;
