import { customAxios } from "./axios";

const refreshAccessToken = async () => {
  const { data } = await customAxios.get("/auth/refresh-session");
  return data.data.token;
};

export default refreshAccessToken;
