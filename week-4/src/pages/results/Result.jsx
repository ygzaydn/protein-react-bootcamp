import React from 'react';

import { Text, Title, MenuButton } from '../../components';
import './result.css';

const Game = () => {
    return (
        <section className="resultpage">
            <div className="resultpage__leftgrid">
                <Title title="Final" />
                <Text content="Point: 129" padding="1rem 0" />
                <Text content="Questions: 10" padding="1rem 0" />
                <Text content="Correct Answer: 8" padding="1rem 0" />
                <MenuButton
                    text="Restart"
                    clickFunc={() => console.log('asd')}
                />
            </div>
            <div className="resultpage__rightgrid">
                <Title title="All Question" />
                <Text
                    content="3 x 4 = 12"
                    padding=".5rem 0"
                    size="4.5rem"
                    icon
                    iconText="correct"
                />
                <Text
                    content="3 x 4 = 12"
                    padding=".5rem 0"
                    size="4.5rem"
                    icon
                    iconText="false"
                />
                <Text
                    content="3 x 4 = 12"
                    padding=".5rem 0"
                    size="4.5rem"
                    icon
                    iconText="correct"
                />
                <Text
                    content="3 x 4 = 12"
                    padding=".5rem 0"
                    size="4.5rem"
                    icon
                    iconText="false"
                />
                <Text
                    content="3 x 4 = 12"
                    padding=".5rem 0"
                    size="4.5rem"
                    icon
                    iconText="correct"
                />
                <Text
                    content="3 x 4 = 12"
                    padding=".5rem 0"
                    size="4.5rem"
                    icon
                    iconText="correct"
                />
                <Text
                    content="3 x 4 = 12"
                    padding=".5rem 0"
                    size="4.5rem"
                    icon
                    iconText="correct"
                />
                <Text
                    content="3 x 4 = 12"
                    padding=".5rem 0"
                    size="4.5rem"
                    icon
                    iconText="correct"
                />
            </div>
        </section>
    );
};

export default Game;
