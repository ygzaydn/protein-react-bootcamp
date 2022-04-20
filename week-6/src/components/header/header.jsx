import React, { useEffect } from "react";
import { useNavigate } from "react-router";

import { BackgroundImage, MarvelText } from "../../assets/";
import { getInformationContext } from "../../contexts/informationContext";

const Header = () => {
    const { setChosen, chosen } = getInformationContext();
    const navigate = useNavigate();
    useEffect(() => {
        if (!chosen?.id) {
            navigate("/");
        }
    }, [chosen]);

    return (
        <section className="header">
            <img
                src={BackgroundImage}
                alt="Background"
                className="header__background"
            />
            <img
                src={MarvelText}
                alt="Marvel Text"
                onClick={() => setChosen({})}
                className="header__marvelText"
            />
        </section>
    );
};

export default Header;
