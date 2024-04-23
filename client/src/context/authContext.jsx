import {createContext, useContext} from 'react'

const AuthContext = createContext();

export const useAuthCtx = () => useContext(AuthContext)

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: '',
    token: ''
  })
  
  return(
  <AuthContext.Provider value={{
    user,setUser
  }}>
    {children}
  </AuthContext.Provider>
  )
}
