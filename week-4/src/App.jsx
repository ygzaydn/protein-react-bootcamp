import React from 'react';
import './styles/App.css';
import { BrowserRouter } from 'react-router-dom';
import Router from './router/Router';

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Router />
            </BrowserRouter>
        </div>
    );
};

export default App;
