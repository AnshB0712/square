import { useQuery } from 'react-query';

const refreshSession = async () => {
  const { data } = await customAxios("/auth/refresh-session")
  return data
}

const PersistUser = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['refresh-session'],
    queryFn: refreshSession,
    staleTime: Infinity,
  },{
    
  });

  if (isLoading) return null;
  
  if (isError) {
    console.error('Error refreshing token');
    return null;
  }

  return <Outlet />
};

export default PersistUser;