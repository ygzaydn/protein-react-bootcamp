import React from 'react';
import { Title, Text, MenuButton } from '../../components/';
import { useNavigate } from 'react-router';
import { getContext } from '../../context/scoreContext';

import './home.css';

const Home = () => {
    const { readLocalhost } = getContext();

    console.log(readLocalhost());

    const { total } = readLocalhost();
    const navigate = useNavigate();
    return (
        <div className="homepage">
            <Title title="Mathematics Game" />
            {total ? (
                <>
                    <Text content="Total Point: 129" />
                    <Text content="Total Questions: 40" />
                    <Text content="Correct Answers: 32" />
                </>
            ) : (
                <>
                    <Text content="You don't have previous score data, click Start to begin" />
                </>
            )}

            <MenuButton text="Start" clickFunc={() => navigate('/game')} />
        </div>
    );
};

export default Home;
