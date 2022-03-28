import React, { useState, useEffect } from "react";

import "./App.css";

import Header from "./components/header/header";
import CardGrid from "./components/card/CardGrid";
import Pagination from "./components/pagination/pagination";

function App() {
    const [page, setPage] = useState(1); // tracks current page
    const [limit, setLimit] = useState(0); // tracks max number of page

    const pageChecker = () => {
        let pageToCheck = parseInt(window.location.hash.split("#")[1]);
        if (page !== pageToCheck) {
            setPage(pageToCheck);
        }
    };

    useEffect(() => {
        // Hash changer event listener to adapt hash changes. So that users can browse any page they want to. ..../#<page-number>
        window.addEventListener("hashchange", () => pageChecker());
        return () =>
            window.removeEventListener("hashchange", () => pageChecker());
    }, []);

    return (
        <body>
            <Header />{" "}
            {/* Header Component, responsible for marvel image and text */}
            <section className="content">
                <CardGrid page={page} setLimit={setLimit} />{" "}
                {/* CardGrid Component, responsible card grids, it has inner CardItem component along itself. */}
                <Pagination page={page} setPage={setPage} limit={limit} />{" "}
                {/* Pagination Component, responsible for pagination actions */}
            </section>
        </body>
    );
}

export default App;
