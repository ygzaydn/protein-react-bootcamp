import React from "react";
import ReactDOM from "react-dom";
import "./styles/main.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import InformationContextProvier from "./contexts/informationContext";

import "./i18next";

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <InformationContextProvier>
                <App />
            </InformationContextProvier>
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
