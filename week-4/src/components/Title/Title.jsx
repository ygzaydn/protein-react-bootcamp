import React from 'react';
import PropTypes from 'prop-types';
import { UnderlineSVG } from '../../icons';
import './title.css';

const Title = ({ title }) => (
    <div className="title">
        <h2 className="title__text">{title}</h2>
        <UnderlineSVG />
    </div>
);

Title.propTypes = {
    title: PropTypes.string,
};

export default Title;
