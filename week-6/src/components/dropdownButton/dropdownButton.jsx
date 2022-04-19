import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { Language } from "../../icons";

const DropdownButton = ({ options }) => {
    const [open, setOpen] = useState(false);
    const buttonRef = useRef(null);
    const langRef = useRef(null);

    const { t, i18n } = useTranslation();

    useEffect(() => {
        document.addEventListener("mousedown", clickDetector);

        return () => {
            document.removeEventListener("mousedown", clickDetector);
        };
    }, [buttonRef]);

    const openDropdown = () => {
        if (langRef.current) {
            if (open) {
                setOpen(false);
                langRef.current.className =
                    "dropdown__menu dropdown__menu--hidden";
            } else {
                setOpen(true);
                langRef.current.className =
                    "dropdown__menu dropdown__menu--visible";
            }
        }
    };

    const clickDetector = (e) => {
        const button = buttonRef.current;
        const className = e.target.className;

        if (button && className !== "dropdown__menu--span") {
            setOpen(false);
            langRef.current.className = "dropdown__menu dropdown__menu--hidden";
        }
    };

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
        setOpen(false);
        openDropdown();
    };

    const returnLang = () => {
        const as = options.find((el) => el.code === i18n.language);
        return as.name;
    };

    return (
        <div className="dropdown">
            <button
                className="dropdown__button"
                onClick={() => openDropdown()}
                ref={buttonRef}
            >
                <Language />
                <p>{returnLang()}</p>

                <strong
                    style={
                        open
                            ? {
                                  transform: "rotate(180deg)",
                                  transition: ".2s all",
                              }
                            : {
                                  transform: "rotate(0deg)",
                                  transition: ".2s all",
                              }
                    }
                >
                    &darr;
                </strong>
            </button>
            <div
                ref={langRef}
                className="dropdown__menu dropdown__menu--hidden"
            >
                {options.map((el) => (
                    <div
                        key={el.code}
                        className="dropdown__menu--span"
                        onClick={() => changeLanguage(el.code)}
                    >
                        {el.name}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DropdownButton;
