import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

import { Glass } from "../../icons";
import { useTranslation } from "react-i18next";

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [characterNames, setCharacterNames] = useState([]);
    const [language, setLanguage] = useState("tr");
    const searchGrid = useRef(null);
    const resultGrid = useRef(null);

    const { t, i18n } = useTranslation();

    useEffect(() => {
        getCharacterInfo(searchText, setCharacterNames);
    }, [searchText]);

    useEffect(() => {
        document.addEventListener("mousedown", clickDetector);
        return () => {
            document.removeEventListener("mousedown", clickDetector);
        };
    }, [searchGrid]);

    const searchHero = (e) => setSearchText(e.target.value);

    const getCharacterInfo = (text, setFunction) => {
        const storage = JSON.parse(sessionStorage.getItem("search")) || {};
        if (text.length > 0) {
            if (!storage[`${text}`]) {
                axios
                    .get(
                        `https://gateway.marvel.com/v1/public/characters?ts=1&apikey=${process.env.REACT_APP_PUBLIC_KEY}&hash=${process.env.REACT_APP_ENCODED_KEY}&nameStartsWith=${text}`
                    )
                    .then((resp) => {
                        const item = resp.data.data.results.slice(0, 5);
                        const itemToAdd = item.map((el) => ({
                            name: el.name,
                            id: el.id,
                        }));
                        sessionStorage.setItem(
                            "search",
                            JSON.stringify({
                                ...storage,
                                [text]: [...itemToAdd],
                            })
                        );
                        setFunction([...itemToAdd]);
                    });
            } else {
                setFunction([...storage[`${text}`]]);
            }
        } else {
            setCharacterNames([]);
        }
    };

    const clickDetector = (e) => {
        const grid = resultGrid.current;
        const searchBar = searchGrid.current;
        if (searchBar && !searchBar.contains(e.target)) {
            setVisible(false);
            //grid.style.visibility = "hidden";
        } else {
            setVisible(true);
            //grid.style.visibility = "visible";
        }
    };

    const changeLanguage = () => {
        if (language === "tr") {
            setLanguage("en");
            i18n.changeLanguage("en");
        } else {
            setLanguage("tr");
            i18n.changeLanguage("tr");
        }
    };

    return (
        <section className="nav-bar">
            <div className="nav-bar__input--div">
                <Glass />
                <input
                    className="nav-bar__input--input"
                    placeholder={t("searchBar.text")}
                    value={searchText}
                    onChange={searchHero}
                    ref={searchGrid}
                />
                <div className="nav-bar__input--resultdiv" ref={resultGrid}>
                    {characterNames?.map((el) => (
                        <span
                            className={
                                visible
                                    ? "nav-bar__input--result--down"
                                    : "nav-bar__input--result--up"
                            }
                            key={el.id}
                        >
                            {el.name}
                        </span>
                    ))}
                </div>
            </div>

            <button
                className="nav-bar__button"
                onClick={() => changeLanguage()}
            >
                {language === "tr" ? (
                    <>
                        <strong>TR</strong> / EN
                    </>
                ) : (
                    <>
                        TR / <strong>EN</strong>
                    </>
                )}
            </button>
        </section>
    );
};

export default Navbar;
