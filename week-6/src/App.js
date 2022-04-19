/* eslint-disable no-undef */
import React, { useState, useEffect, useRef } from "react";
import axios from "./constants/axios";

import { Header, Navbar, Pagination } from "./components";

import RoutePath from "./router/router";
import { useLocation } from "react-router-dom";

function App() {
  const [page, setPage] = useState(1); // tracks current page
  const [loading, setLoading] = useState(false);
  const [information, setInformation] = useState({
    heroes: Array(20).fill({}),
  });
  const [chosen, setChosen] = useState({});
  const contentGrid = useRef(null);

  const { pathname } = useLocation();

  useEffect(() => {
    // Hash changer event listener to adapt hash changes. So that users can browse any page they want to. ..../#<page-number>
    window.addEventListener("hashchange", hashHandler);
    return () => window.addEventListener("hashchange", hashHandler);
  }, []);

  useEffect(() => {
    getData();
  }, [page, information.limit]);

  const getData = () => {
    // main function for query action. Helps us to store data on sessionStorage and avoids unnecessary fetch actions.
    const storageItems = JSON.parse(sessionStorage.getItem("info")) || {};
    const limit = JSON.parse(sessionStorage.getItem("limit")) || 0;
    setLoading(true);

    if (!storageItems[page]) {
      axios
        .get(
          `/characters?ts=1&apikey=${process.env.REACT_APP_PUBLIC_KEY}&hash=${
            process.env.REACT_APP_ENCODED_KEY
          }&offset=${(page - 1) * 20}&limit=20`
        )
        .then((resp) => {
          storageItems[page] = [...resp.data.data.results];
          sessionStorage.setItem("info", JSON.stringify(storageItems));
          sessionStorage.setItem(
            "limit",
            JSON.stringify(Math.ceil(resp.data.data.total / 20))
          );
          setInformation({
            heroes: resp.data.data.results,
            limit: Math.ceil(resp.data.data.total / 20),
          });

          setLoading(false);
        });
    } else {
      setInformation({ heroes: storageItems[page], limit });
      setLoading(false);
    }
  };

  const hashHandler = () => {
    // Defines the behaviour when hash changes
    setPage(parseInt(window.location.hash.substring(1)));
    contentGrid.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div>
      <Header setChosen={setChosen} chosen={chosen} />
      <section className="content" ref={contentGrid}>
        <Navbar setChosen={setChosen} chosen={chosen} />
        <RoutePath
          information={information}
          page={page}
          setChosen={setChosen}
          chosen={chosen}
        />
        {pathname === "/" && (
          <Pagination information={information} page={page} />
        )}
      </section>
    </div>
  );
}

export default App;
