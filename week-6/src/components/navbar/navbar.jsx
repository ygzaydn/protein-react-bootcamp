import React, { useEffect, useRef, useState } from "react";
import axios from "../../constants/axios";

import { Glass } from "../../icons";
import { useTranslation } from "react-i18next";
import { InputComponent, DropdownButton } from "../";

import { languages } from "../../i18next";

const Navbar = () => {
    return (
        <section className="nav-bar">
            <InputComponent />
            <DropdownButton options={languages} />
        </section>
    );
};

export default Navbar;
