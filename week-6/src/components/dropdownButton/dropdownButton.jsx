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

    useEffect(() => {
        if (!open) {
            langRef.current.className = "dropdown__menu dropdown__menu--hidden";
        } else {
            langRef.current.className =
                "dropdown__menu dropdown__menu--visible";
        }
    }, [open]);

    const openDropdown = () => {
        if (open) {
            setOpen(false);
        } else {
            setOpen(true);
        }
    };

    const clickDetector = (e) => {
        const button = buttonRef.current;
        const className = e.target.className;
        console.log(!e.target.contains(button));

        if (e.target.contains(button)) {
            setOpen(false);
        } else {
            setOpen(true);
        }
    };

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
        setOpen(false);
    };

    const returnLang = () => {
        const as = options.find((el) => el.code === i18n.language);
        return as.name;
    };

    return (
        <div className="dropdown" ref={buttonRef}>
            <button className="dropdown__button">
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
