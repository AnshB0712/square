import usePrivateAxios from '../usePrivateAxios'
import { useQuery } from '@tanstack/react-query'

const getIndividualMark = ({ testId, axios }) => {
  const res = axios.get(`/student/marks/test/${testId}`)
  return res
}

const useIndividualTestMark = ({ testId }) => {
  const axios = usePrivateAxios()
  const q = useQuery({
    queryKey: ['marks', testId],
    queryFn: () => getIndividualMark({ testId, axios }),
    enabled: Boolean(testId),
  })
  return q
}

export default useIndividualTestMark
