import { createContext,useState } from "react";


export const State = createContext();
const Context=({children})=>{
    const [gid,setgid]=useState('')
    return(
        <State.Provider value={{
            gid,setgid
        }}>
            {children}
        </State.Provider>
    )
}

export default Context