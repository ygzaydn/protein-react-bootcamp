import React from "react";

import { InputComponent, DropdownButton } from "../";

import { languages } from "../../i18next";

const Navbar = ({ setChosen, chosen }) => {
  return (
    <section className="nav-bar">
      <InputComponent setHero={setChosen} hero={chosen} />
      <DropdownButton options={languages} />
    </section>
  );
};

export default Navbar;
