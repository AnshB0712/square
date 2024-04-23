import axios from 'axios';

const customAxios = axios.create({
  baseURL: `${FRONTEND_URL}`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default customAxios;