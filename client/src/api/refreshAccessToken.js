import { customAxios } from "./axios";

const refreshAccessToken = async () => {
  const { data } = await customAxios.get("/auth/refesh-session");
  return data.token;
};

export default refreshAccessToken;
