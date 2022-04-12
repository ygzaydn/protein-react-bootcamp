import React, { useReducer, useContext } from "react";

const initialState = "light";

const reducer = (state, action) => {
    switch (action.type) {
        case "light":
            return "light";
        case "dark":
            return "dark";
        default:
            throw new Error();
    }
};

const ThemeContext = React.createContext();

export const ThemeContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const changeToLightTheme = () => dispatch({ type: "light" });
    const changeToDarkTheme = () => dispatch({ type: "dark" });

    return (
        <ThemeContext.Provider
            value={{ state, changeToDarkTheme, changeToLightTheme }}
        >
            {children}
        </ThemeContext.Provider>
    );
};

export const useThemeContext = () => {
    const { state, changeToDarkTheme, changeToLightTheme } =
        useContext(ThemeContext);
    return { state, changeToDarkTheme, changeToLightTheme };
};
