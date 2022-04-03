import React from 'react';
import { Title, Text } from '../../components/';
import MenuButton from '../../components/MenuButton/MenuButton';
import { useNavigate } from 'react-router';

import './home.css';

const Home = () => {
    const navigate = useNavigate();
    return (
        <div className="homepage">
            <Title title="Mathematics Game" />
            <Text content="Total Point: 129" />
            <Text content="Total Questions: 40" />
            <Text content="Correct Answers: 32" />
            <MenuButton text="Start" clickFunc={() => navigate('/game')} />
        </div>
    );
};

export default Home;
