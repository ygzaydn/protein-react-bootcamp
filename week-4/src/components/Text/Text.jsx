import React from 'react';
import PropTypes from 'prop-types';

import './text.css';

const Text = ({ content, size }) => (
    <div className="text">
        <h2 className="text__content" style={{ fontSize: size || 'default' }}>
            {content}
        </h2>
    </div>
);

Text.propTypes = {
    content: PropTypes.string,
    size: PropTypes.string,
};

export default Text;
