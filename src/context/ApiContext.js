import React, { createContext, useState } from 'react';

export const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
    const [apiUrl, setApiUrl] = useState('');
    const [webService, setWebService] = useState('WS_Purchase_Expose_Data');
    const [functionName, setFunctionName] = useState('f_RFQConfirmed');

    const value = {
        apiUrl,
        setApiUrl,
        webService,
        setWebService,
        functionName,
        setFunctionName,
    };

    return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};
