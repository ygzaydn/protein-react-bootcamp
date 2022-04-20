import React from "react";
import { useNavigate } from "react-router";

import { BackgroundImage, MarvelText } from "../../assets/";
import { getInformationContext } from "../../contexts/informationContext";

const Header = () => {
    const { setChosen, chosen } = getInformationContext();
    const navigate = useNavigate();

    const goHome = () => {
        setChosen({});
        navigate("/");
    };

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
                onClick={() => goHome()}
                className="header__marvelText"
            />
        </section>
    );
};

export default Header;
