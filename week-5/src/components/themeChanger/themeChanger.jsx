import React from "react";

import { SunIcon, MoonIcon } from "../../icons";
import { useThemeContext } from "../../contexts/themeContext";

const ThemeChanger = () => {
    const { state, changeToDarkTheme, changeToLightTheme } = useThemeContext();

    return (
        <div className="themeChanger">
            {state === "light" ? (
                <MoonIcon onClick={() => changeToDarkTheme()} />
            ) : (
                <SunIcon onClick={() => changeToLightTheme()} />
            )}
        </div>
    );
};

export default ThemeChanger;
