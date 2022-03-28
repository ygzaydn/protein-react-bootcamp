import React, { useState, useEffect } from "react";

import "./App.css";

import Header from "./components/header/header";
import CardGrid from "./components/card/CardGrid";
import Pagination from "./components/pagination/pagination";

function App() {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(0);

    const pageChecker = () => {
        let pageToCheck = parseInt(window.location.hash.split("#")[1]);
        if (page !== pageToCheck) {
            setPage(pageToCheck);
        }
    };

    useEffect(() => {
        window.addEventListener("hashchange", () => pageChecker());
        return () =>
            window.removeEventListener("hashchange", () => pageChecker());
    }, []);

    return (
        <body>
            <Header />
            <section className="content">
                <CardGrid page={page} setLimit={setLimit} />
                <Pagination page={page} setPage={setPage} limit={limit} />
            </section>
        </body>
    );
}

export default App;
