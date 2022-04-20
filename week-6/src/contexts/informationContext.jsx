import React, { useState, useContext } from "react";

export const InformationContext = React.createContext("");

const InformationContextProvider = ({ children }) => {
    const [page, setPage] = useState(1); // tracks current page
    const [loading, setLoading] = useState(false);
    const [information, setInformation] = useState({
        heroes: Array(20).fill({}),
    });
    const [chosen, setChosen] = useState({});

    const ret = {
        page,
        setPage,
        loading,
        setLoading,
        information,
        setInformation,
        chosen,
        setChosen,
    };

    return (
        <InformationContext.Provider value={{ ...ret }}>
            {children}
        </InformationContext.Provider>
    );
};

export default InformationContextProvider;

export const getInformationContext = () => useContext(InformationContext);
