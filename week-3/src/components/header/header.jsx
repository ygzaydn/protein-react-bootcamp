import React from "react";
import BackgroundImage from "../../assets/background2.png";
import MarvelText from "../../assets/marvelText.png";

const Header = () => {
  return (
    <section className="header">
      <img
        src={BackgroundImage}
        alt="Background"
        className="header__background"
      />

      <img src={MarvelText} alt="Marvel Text" className="header__marvelText" />
    </section>
  );
};

export default Header;
