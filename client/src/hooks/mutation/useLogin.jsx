import { useMutation } from "react-query";
import { customAxios } from "../../api/axios.js";
import { useAuthCtx } from "../../context/authContext.jsx";

const login = async ({ url, details }) => {
  const res = await customAxios.post(url, details);
  return res;
};

export const useLogin = (url) => {
  const { setUser } = useAuthCtx();
  const mutate = useMutation({
    mutationFn: ({ details }) => login({ url, details }),
    onSuccess: (res) => setUser(res.data.data),
  });

  return mutate;
};
