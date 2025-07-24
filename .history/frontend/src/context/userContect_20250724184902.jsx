import { useState ,createContext,useContext} from "react";

const UserContext=createContext()

export const userProvider=({childrens})=>{
    const [count,setCount]=useState(10)
    return(
        <UserContext.Provider value={{count,setCount}}>
            {childrens}
        </UserContext.Provider>
    )

}
export const useUser=()=>useContext(UserContext);