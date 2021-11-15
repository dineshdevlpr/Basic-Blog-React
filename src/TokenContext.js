import React, { useState } from 'react';

const TokenContext = React.createContext();

export default TokenContext;

export const TokenProvider = ({children})=>{

    const [ authToken, setauthToken ] = useState("")

    return (<TokenContext.Provider value = {{ authToken, setauthToken }}>
        {children}
    </TokenContext.Provider>)

}