import { useQuery } from "react-query";
import { customAxios } from "../../api/axios";

const getStudentsfromStandard = async (stdId) => {
  const res = await customAxios.get(`/utils/students/standard/${stdId}`);
  return res;
};

const useStudentsFromStandard = ({ stdId }) => {
  const q = useQuery({
    queryKey: ["standard", "students", stdId],
    queryFn: () => getStudentsfromStandard(stdId),
    staleTime: Infinity,
    enabled: !!stdId,
  });

  return q;
};

export default useStudentsFromStandard;
