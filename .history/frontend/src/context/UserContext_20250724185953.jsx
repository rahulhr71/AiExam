import { useState ,createContext,useContext} from "react";

const UserContext=createContext()

export const UserProvider=({children})=>{
    const [count,setCount]=useState(10)
    return(
        <UserContext.Provider value={{count,setCount}}>
            {children}
        </UserContext.Provider>
    )

}
export const useUser=()=>useContext(UserContext);