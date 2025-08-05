import { useState ,createContext,useContext} from "react";
const UserContext=createContext()

export const UserProvider=({children})=>{
    const [count,setCount]=useState(10)
    const [isAuth, setIsAuth] = useState(true); 
    return(
        <UserContext.Provider value={{count,setCount,isAuth,setIsAuth}}>
            {children}
        </UserContext.Provider>
    )

}


export const useUser=()=>useContext(UserContext);