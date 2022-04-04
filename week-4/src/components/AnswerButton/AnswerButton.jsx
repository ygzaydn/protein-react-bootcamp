import React from 'react';
import PropTypes from 'prop-types';

import './answerbutton.css';
import { AnswerCircle } from '../../icons';

const AnswerButton = ({ info, ind, clickFunc, disabled }) => (
    <div className={`answerButton answerButton${ind + 1}`}>
        <button className="answerButton">
            <AnswerCircle
                number={info}
                pos={ind + 1}
                disabled={disabled}
                onClick={() => (!disabled ? clickFunc(info) : null)}
            />
        </button>
    </div>
);

AnswerButton.propTypes = {
    ind: PropTypes.number,
    clickFunc: PropTypes.clickFunc,
    info: PropTypes.number,
    disabled: PropTypes.bool,
};

export default AnswerButton;
