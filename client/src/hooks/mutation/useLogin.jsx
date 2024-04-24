import { useMutation } from 'react-query'
import { customAxios } from '../../api/axios.js'
import { useAuthCtx } from "../../context/authContext.jsx"
const login = async ({url,data}) => {
  console.log(data)
  const res = await customAxios.post(url,data)
  return res;
}

export const useLogin = (url) => {
  const {setUser} = useAuthCtx()
  const mutate = useMutation({
    mutationFn: ({data}) => login({url, data}),
    onSuccess: (data) => console.log(data)
  })
  
  return mutate
}