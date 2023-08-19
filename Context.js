import { createContext,useState } from "react";


export const State = createContext();
const Context=({children})=>{
    return(
        <State.Provider>
            {children}
        </State.Provider>
    )
}

export default Context