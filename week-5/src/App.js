import React from "react";

import { ThemeChanger, ImageGrid, FormGrid } from "./components";

import { useThemeContext } from "./contexts/themeContext";

const App = () => {
    const { state } = useThemeContext();

    return (
        <section
            className={`app ${state === "light" ? "app--light" : "app--dark"}`}
        >
            <div
                className={`app__container ${
                    state === "light"
                        ? "app__container--light"
                        : "app__container--dark"
                }`}
            >
                <ThemeChanger />
                <ImageGrid />
                <FormGrid />
            </div>
        </section>
    );
};

export default App;
