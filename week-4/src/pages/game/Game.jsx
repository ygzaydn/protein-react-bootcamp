import React, { useRef } from 'react';
import { AnswerCircle, Stickman } from '../../icons';
import { Text } from '../../components';
import './game.css';

const Game = () => {
    const gridRef = useRef(null);
    const dialogRef = useRef(null);

    const answer = (answer) => {
        const gridInfo = gridRef.current;
        const dialogInfo = dialogRef.current;
        dialogInfo.style.visibility = 'visible';
        if (answer) {
            gridInfo.className = 'gamepage gamepage--correct';
        } else {
            gridInfo.className = 'gamepage gamepage--false';
        }

        setTimeout(() => {
            dialogInfo.style.visibility = 'hidden';
            gridInfo.className = 'gamepage';
        }, 3000);
    };

    return (
        <section ref={gridRef} className="gamepage">
            <div ref={dialogRef} className="gamepage__dialog">
                Correct answer, new question will appear in 3s!
            </div>
            <div className="gamepage__left">
                <Stickman text={'7 x 8'} />
            </div>
            <div className="gamepage__right">
                <div className="gamepage__right--upper">
                    <Text content="Score: 120" size="4rem" />
                    <Text content="Tour: 2" size="4rem" />
                    <Text content="Questions: 6/7" size="4rem" />
                </div>
                <div className="gamepage__right--down">
                    <AnswerCircle
                        number={47}
                        height="25%"
                        width="25%"
                        pos={1}
                        onClick={() => answer(true)}
                    />
                    <AnswerCircle
                        number={21}
                        height="25%"
                        width="25%"
                        pos={2}
                        onClick={() => answer(false)}
                    />
                    <AnswerCircle
                        number={315}
                        height="25%"
                        width="25%"
                        pos={3}
                        onClick={() => answer(false)}
                    />
                </div>
            </div>
        </section>
    );
};

export default Game;
