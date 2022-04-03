import React from 'react';
import PropTypes from 'prop-types';

import './menuButton.css';
import { MenuCircle } from '../../icons';

const MenuButton = ({ text, clickFunc }) => (
    <div className="menuButton">
        <button className="menuButton" onClick={() => clickFunc()}>
            <MenuCircle color="white" width="10rem" height="35rem" />
            <h2 className="menuButton__text">{text}</h2>
        </button>
    </div>
);

MenuButton.propTypes = {
    text: PropTypes.string,
    clickFunc: PropTypes.clickFunc,
};

export default MenuButton;
