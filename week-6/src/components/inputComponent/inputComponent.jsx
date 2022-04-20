import React, { useState, useEffect, useRef } from "react";
import { Glass } from "../../icons";
import { useTranslation } from "react-i18next";
import axios from "../../constants/axios";
import { fetchCharacter, getCharacterInfo } from "../../utils/axiosCalls";
import { useNavigate } from "react-router";
import { getInformationContext } from "../../contexts/informationContext";

const InputComponent = () => {
    const { setLoading, setChosen, chosen } = getInformationContext();
    const [visible, setVisible] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [characterNames, setCharacterNames] = useState([]);
    const [hero, setHero] = useState("");
    const searchGrid = useRef(null);
    const navigate = useNavigate();

    const { t } = useTranslation();

    useEffect(() => {
        if (hero?.id) {
            fetchCharacter(hero.id, setLoading, setChosen, navigate);
        }
    }, [hero]);

    useEffect(() => {
        getCharacterInfo(searchText, setCharacterNames, setCharacterNames);
    }, [searchText]);

    useEffect(() => {
        document.addEventListener("mousedown", clickDetector);
        return () => {
            document.removeEventListener("mousedown", clickDetector);
        };
    }, [searchGrid]);

    useEffect(() => {
        if (hero?.id) {
            navigate(`/hero:${hero.id}`);
        }
    }, []);

    const searchHero = (e) => setSearchText(e.target.value);

    const clickDetector = (e) => {
        const searchBar = searchGrid.current;

        if (!searchBar.contains(e.target)) {
            if (!e.target.className.includes("inputDiv__result")) {
                setVisible(false);
            }
        } else {
            setVisible(true);
        }
    };

    const clickHero = (item) => {
        setHero(item);
        setVisible(false);
    };

    return (
        <div className="inputDiv">
            <Glass />
            <input
                className="inputDiv__input"
                placeholder={t("searchBar.text")}
                value={searchText}
                onChange={searchHero}
                ref={searchGrid}
            />

            <div
                className="inputDiv__result"
                style={visible ? { zIndex: 50 } : { zIndex: -1 }}
            >
                {characterNames?.map((el) => (
                    <div
                        className={
                            visible
                                ? "inputDiv__result--down"
                                : "inputDiv__result--up"
                        }
                        key={el.id}
                        onClick={() => clickHero(el)}
                    >
                        {el.name}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InputComponent;
