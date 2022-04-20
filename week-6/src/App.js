/* eslint-disable no-undef */
import React, { useState, useEffect, useRef } from "react";
import { getData } from "./utils/axiosCalls";

import { Header, Navbar, Pagination } from "./components";

import RoutePath from "./router/router";
import { useLocation } from "react-router-dom";
import { getInformationContext } from "./contexts/informationContext";

const App = () => {
    const { page, setLoading, setInformation, information, setPage } =
        getInformationContext();

    const contentGrid = useRef(null);

    const { pathname } = useLocation();

    useEffect(() => {
        // Hash changer event listener to adapt hash changes. So that users can browse any page they want to. ..../#<page-number>
        window.addEventListener("hashchange", hashHandler);
        return () => window.addEventListener("hashchange", hashHandler);
    }, []);

    useEffect(() => {
        getData(setLoading, setInformation, page);
    }, [page, information.limit]);

    const hashHandler = () => {
        // Defines the behaviour when hash changes
        setPage(parseInt(window.location.hash.substring(1)));
        contentGrid?.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    return (
        <div>
            <Header />
            <section className="content" ref={contentGrid}>
                <Navbar />
                <RoutePath />
                {pathname === "/" && <Pagination />}
            </section>
        </div>
    );
};

export default App;
