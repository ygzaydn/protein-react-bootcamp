import React, { useEffect, useRef, useState } from 'react';
import { AnswerCircle, Stickman } from '../../icons';
import { Text } from '../../components';
import './game.css';
import { getContext } from '../../context/scoreContext';

const Game = () => {
    const gridRef = useRef(null);
    const dialogRef = useRef(null);
    const [question, setQuestion] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [correct, setCorrect] = useState(false);

    const { generateQuestion, generateAnswers, setInformation, information } =
        getContext();

    useEffect(() => {
        setQuestion(generateQuestion());
        setInformation({
            question: {
                total: 0,
                correct: 0,
            },
            score: 0,
            tour: 1,
            summary: [],
        });
    }, []);

    useEffect(() => {
        if (question[0] && question[1]) {
            setAnswers(generateAnswers(question));
        }
    }, [question]);

    const answerChecker = (answer) => {
        return answer === question[0] * question[1];
    };

    const answer = (answer) => {
        const gridInfo = gridRef.current;
        const dialogInfo = dialogRef.current;
        dialogInfo.style.visibility = 'visible';
        if (answerChecker(answer)) {
            gridInfo.className = 'gamepage gamepage--correct';
            setCorrect(true);
        } else {
            gridInfo.className = 'gamepage gamepage--false';
            setCorrect(false);
        }

        setTimeout(() => {
            dialogInfo.style.visibility = 'hidden';
            gridInfo.className = 'gamepage';
        }, 3000);
    };

    return (
        <section ref={gridRef} className="gamepage">
            <div ref={dialogRef} className="gamepage__dialog">
                {correct ? 'Correct' : 'Wrong'} answer, new question will appear
                in 3s!
            </div>
            <div className="gamepage__left">
                <Stickman text={`${question[0]} x ${question[1]}`} />
            </div>
            <div className="gamepage__right">
                <div className="gamepage__right--upper">
                    <Text content={`Score: ${information.score}`} size="4rem" />
                    <Text content={`Tour: ${information.tour}`} size="4rem" />
                    <Text
                        content={`Questions: ${information.question.correct}/${information.question.total}`}
                        size="4rem"
                    />
                </div>
                <div className="gamepage__right--down">
                    {answers?.map((el, ind) => (
                        <AnswerCircle
                            key={el}
                            number={el}
                            height="30%"
                            width="30%"
                            pos={ind + 1}
                            onClick={() => answer(el)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Game;
