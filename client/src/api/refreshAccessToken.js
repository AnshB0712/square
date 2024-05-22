import { customAxios } from './axios'

const refreshAccessToken = async ({ fullInfo = false }) => {
  const { data } = await customAxios.get('/auth/refresh-session')
  return fullInfo ? data.data : data.data.token
}

export default refreshAccessToken
