import { useQuery } from 'react-query';
import { customAxios } from '../../api/axios.js'
import { SplashScreen } from './splashScreen.jsx'

const refreshSession = async () => {
  const { data } = await customAxios("/auth/refresh-session")
  return data
}

export const PersistUser = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['refresh-session'],
    queryFn: refreshSession,
    staleTime: Infinity,
    onSuccess: e => console.log(e)
  });

  if (isLoading) return <SplashScreen/>;
  
  if (isError) {
    console.error('Error refreshing token');
    return null;
  }

  return <Outlet />
};
