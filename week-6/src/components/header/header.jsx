import React from "react";

import { BackgroundImage, MarvelText } from "../../assets/";

const Header = () => (
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
);

export default Header;
