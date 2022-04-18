/* eslint-disable no-undef */
import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";

import BackgroundImage from "./assets/background2-min.png";
import MarvelText from "./assets/marvelText.png";
import RightArrow from "./assets/rightArrow.png";
import LeftArrow from "./assets/leftArrow.png";

import Glass from "./icons/glass";
import { useTranslation } from "react-i18next";

function App() {
    const [page, setPage] = useState(1); // tracks current page
    const [information, setInformation] = useState({
        heroes: Array(20).fill({}),
    });
    const [loading, setLoading] = useState(false);
    const [paginationArray, setPaginationArray] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [characterNames, setCharacterNames] = useState([]);
    const [language, setLanguage] = useState("tr");
    const contentGrid = useRef(null);
    const searchGrid = useRef(null);
    const resultGrid = useRef(null);

    const { t, i18n } = useTranslation();

    const longSkip = 4;

    useEffect(() => {
        // Hash changer event listener to adapt hash changes. So that users can browse any page they want to. ..../#<page-number>
        window.addEventListener("hashchange", hashHandler);
        return () => window.addEventListener("hashchange", hashHandler);
    }, []);

    useEffect(() => {
        document.addEventListener("mousedown", clickDetector);
        return () => {
            document.removeEventListener("mousedown", clickDetector);
        };
    }, [searchGrid]);

    useEffect(() => {
        getData();
        generatePaginationArray(page);
    }, [page, information.limit]);

    useEffect(() => {
        getCharacterInfo(searchText, setCharacterNames);
    }, [searchText]);

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

    const getData = () => {
        // main function for query action. Helps us to store data on sessionStorage and avoids unnecessary fetch actions.
        const storageItems = JSON.parse(sessionStorage.getItem("info")) || {};
        const limit = JSON.parse(sessionStorage.getItem("limit")) || 0;
        setLoading(true);

        if (!storageItems[page]) {
            axios
                .get(
                    `https://gateway.marvel.com/v1/public/characters?ts=1&apikey=${
                        process.env.REACT_APP_PUBLIC_KEY
                    }&hash=${process.env.REACT_APP_ENCODED_KEY}&offset=${
                        (page - 1) * 20
                    }&limit=20`
                )
                .then((resp) => {
                    storageItems[page] = [...resp.data.data.results];
                    sessionStorage.setItem(
                        "info",
                        JSON.stringify(storageItems)
                    );
                    sessionStorage.setItem(
                        "limit",
                        JSON.stringify(Math.ceil(resp.data.data.total / 20))
                    );
                    setInformation({
                        heroes: resp.data.data.results,
                        limit: Math.ceil(resp.data.data.total / 20),
                    });

                    setLoading(false);
                });
        } else {
            setInformation({ heroes: storageItems[page], limit });
            setLoading(false);
        }
    };

    const generatePaginationArray = (page) => {
        // For pagination, I've created paginationArray, which will be rendered on the page and changes whenever a page change
        const pageArray = [];
        if (page <= longSkip) {
            for (let i = 1; i < longSkip + 1; i++) {
                pageArray.push(i);
            }
            if (!pageArray.includes(page + 1)) {
                pageArray.push(page + 1);
            }
            pageArray.push("DOTS");
            pageArray.push(information.limit);
            pageArray.push("RightArrow");
        } else if (longSkip < page && page <= information.limit - longSkip) {
            pageArray.push("LeftArrow");
            pageArray.push(1);
            pageArray.push("DOTS");
            for (let i = page - 1; i <= page + 1; i++) {
                pageArray.push(i);
            }
            pageArray.push("DOTS");
            pageArray.push(information.limit);
            pageArray.push("RightArrow");
        } else {
            pageArray.push("LeftArrow");
            pageArray.push(1);
            pageArray.push("DOTS");
            if (page === information.limit - 3) {
                pageArray.push(information.limit - 4);
            }
            for (let i = information.limit - 3; i <= information.limit; i++) {
                pageArray.push(i);
            }
        }
        setPaginationArray([...pageArray]);
    };

    const hashHandler = () => {
        // Defines the behaviour when hash changes
        setPage(parseInt(window.location.hash.substring(1)));
        contentGrid.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    const generatePaginationJSX = useCallback(
        (paginationArrayElement, ind) => {
            switch (paginationArrayElement) {
                case "LeftArrow":
                    return (
                        <span
                            key={"larr"}
                            className="pagination__arrow"
                            onClick={() => changePage(page - longSkip)}
                        >
                            <img src={LeftArrow} alt="leftArrow" />
                        </span>
                    );

                case "RightArrow":
                    return (
                        <span
                            key={"rarr"}
                            className="pagination__arrow"
                            onClick={() => changePage(page + 4)}
                        >
                            <img src={RightArrow} alt="rightArrow" />
                        </span>
                    );

                case "DOTS":
                    return (
                        <span
                            key={paginationArrayElement + ind}
                            className="pagination__dots"
                        >
                            ...
                        </span>
                    );

                default:
                    return (
                        <span
                            key={paginationArrayElement + ind}
                            className={
                                paginationArrayElement === page
                                    ? "pagination__number pagination__number-active"
                                    : "pagination__number"
                            }
                            onClick={
                                paginationArrayElement !== page
                                    ? () => changePage(paginationArrayElement)
                                    : null
                            }
                        >
                            {paginationArrayElement}
                        </span>
                    );
            }
        },
        [page]
    );

    const changePage = (myPage = page) => {
        // Hash change triggers 'hashchange' eventlistener that I've created at the top of the component, whenever hash changes page state will also change.
        window.location.hash = myPage;
    };

    const searchHero = (e) => setSearchText(e.target.value);

    const clickDetector = (e) => {
        const grid = resultGrid.current;
        const searchBar = searchGrid.current;
        if (searchBar && !searchBar.contains(e.target)) {
            grid.style.visibility = "hidden";
        } else {
            grid.style.visibility = "visible";
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
        <div>
            <section className="header">
                <img
                    src={BackgroundImage}
                    alt="Background"
                    className="header__background"
                />
                <img
                    src={MarvelText}
                    alt="Marvel Text"
                    className="header__marvelText"
                />
            </section>
            <section className="content" ref={contentGrid}>
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
                        <div
                            className="nav-bar__input--resultdiv"
                            ref={resultGrid}
                        >
                            {characterNames?.map((el) => (
                                <span
                                    className="nav-bar__input--result"
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
                <section className="cards">
                    {information?.heroes?.map((el, ind) => (
                        <div className="cardItem" key={el?.id ? el.id : ind}>
                            <div
                                className={
                                    loading
                                        ? "cardItem__heroImage--gridloading cardItem__heroImage--grid"
                                        : "cardItem__heroImage--grid"
                                }
                            >
                                <img
                                    src={
                                        !loading
                                            ? el.thumbnail?.path +
                                              "/portrait_xlarge." +
                                              el.thumbnail?.extension
                                            : null
                                    }
                                    alt={el.name + "-img"}
                                    className={
                                        loading
                                            ? "cardItem__heroImage--image cardItem__heroImage--loading"
                                            : "cardItem__heroImage--image"
                                    }
                                />
                            </div>
                            <p className={"cardItem__text"}>
                                {!loading ? el.name : "Loading..."}
                            </p>
                        </div>
                    ))}
                </section>
                <section className="pagination">
                    {information?.heroes &&
                        paginationArray?.map((el, ind) =>
                            generatePaginationJSX(el, ind)
                        )}
                </section>
            </section>
        </div>
    );
}

export default App;
