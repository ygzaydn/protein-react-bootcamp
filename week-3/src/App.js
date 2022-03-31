/* eslint-disable no-undef */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import BackgroundImage from "./assets/background2.png";
import MarvelText from "./assets/marvelText.png";
import RightArrow from "./assets/rightArrow.png";
import LeftArrow from "./assets/leftArrow.png";

function App() {
  const [page, setPage] = useState(1); // tracks current page
  const [information, setInformation] = useState({});
  const [loading, setLoading] = useState(false);
  const [paginationArray, setPaginationArray] = useState([]);
  const contentGrid = useRef(null);

  const longSkip = 4;

  useEffect(() => {
    window.addEventListener("hashchange", hashHandler);
    return () => window.addEventListener("hashchange", hashHandler);
  }, []);

  useEffect(() => {
    // Hash changer event listener to adapt hash changes. So that users can browse any page they want to. ..../#<page-number>
    getData();
    generatePaginationArray(page);
  }, [page, information.limit]);

  const getData = () => {
    // main function for query action. Helps us to store data on sessionStorage and avoids unnecessary fetch actions.
    const storageItems = JSON.parse(sessionStorage.getItem("info")) || {};
    const limit = JSON.parse(sessionStorage.getItem("limit")) || 0;
    setLoading(true);

    if (!storageItems[page]) {
      axios
        .get(
          `https://gateway.marvel.com/v1/public/characters?ts=1&apikey=${
            process.env.REACT_APP_PUBLIC_KEY
          }&hash=${process.env.REACT_APP_ENCODED_KEY}&offset=${
            (page - 1) * 20
          }&limit=20`
        )
        .then((resp) => {
          storageItems[page] = [...resp.data.data.results];
          sessionStorage.setItem("info", JSON.stringify(storageItems));
          sessionStorage.setItem(
            "limit",
            JSON.stringify(resp.data.data.total / 20)
          );
          setInformation({
            heroes: resp.data.data.results,
            limit: resp.data.data.total / 20,
          });
          setLoading(false);
        });
    } else {
      setInformation({ heroes: storageItems[page], limit });
      setLoading(false);
    }
  };

  const generatePaginationArray = (page) => {
    const pageArray = [];
    if (page <= longSkip) {
      for (let i = 1; i < longSkip + 1; i++) {
        pageArray.push(i);
      }
      if (!pageArray.includes(page + 1)) {
        pageArray.push(page + 1);
      }
      pageArray.push("DOTS");
      pageArray.push(information.limit);
      pageArray.push("RightArrow");
    } else if (longSkip < page && page <= information.limit - longSkip) {
      pageArray.push("LeftArrow");
      pageArray.push(1);
      pageArray.push("DOTS");
      for (let i = page - 1; i <= page + 1; i++) {
        pageArray.push(i);
      }
      pageArray.push("DOTS");
      pageArray.push(information.limit);
      pageArray.push("RightArrow");
    } else {
      pageArray.push("LeftArrow");
      pageArray.push(1);
      pageArray.push("DOTS");
      if (page === information.limit - 3) {
        pageArray.push(information.limit - 4);
      }
      for (let i = information.limit - 3; i <= information.limit; i++) {
        pageArray.push(i);
      }
    }
    setPaginationArray([...pageArray]);
  };

  const hashHandler = () => {
    setPage(parseInt(window.location.hash.substring(1)));
    contentGrid.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const generatePaginationJSX = (paginationArrayElement, ind) => {
    switch (paginationArrayElement) {
      case "LeftArrow":
        return (
          <span
            key={"larr"}
            className="pagination__arrow"
            onClick={() => changePage(page - longSkip)}
          >
            <img src={LeftArrow} alt="leftArrow" />
          </span>
        );

      case "RightArrow":
        return (
          <span
            key={"rarr"}
            className="pagination__arrow"
            onClick={() => changePage(page + 4)}
          >
            <img src={RightArrow} alt="rightArrow" />
          </span>
        );

      case "DOTS":
        return (
          <span key={paginationArrayElement + ind} className="pagination__dots">
            ...
          </span>
        );

      default:
        return (
          <span
            key={paginationArrayElement + ind}
            className={
              paginationArrayElement === page
                ? "pagination__number pagination__number-active"
                : "pagination__number"
            }
            onClick={
              paginationArrayElement !== page
                ? () => changePage(paginationArrayElement)
                : null
            }
          >
            {paginationArrayElement}
          </span>
        );
    }
  };

  const changePage = (myPage = page) => {
    window.location.hash = myPage;
  };

  return (
    <body>
      <section className="header">
        <img
          src={BackgroundImage}
          alt="Background"
          className="header__background"
        />
        <img
          src={MarvelText}
          alt="Marvel Text"
          className="header__marvelText"
        />
      </section>
      <section className="content" ref={contentGrid}>
        <section className="cards">
          {information?.heroes?.map((el) => (
            <div className="cardItem" key={el.id}>
              <div
                className={
                  loading
                    ? "cardItem__heroImage--gridloading cardItem__heroImage--grid"
                    : "cardItem__heroImage--grid"
                }
              >
                <img
                  src={
                    !loading
                      ? el.thumbnail.path +
                        "/portrait_xlarge." +
                        el.thumbnail.extension
                      : null
                  }
                  alt={el.name + "-img"}
                  className={
                    loading
                      ? "cardItem__heroImage--image cardItem__heroImage--loading"
                      : "cardItem__heroImage--image"
                  }
                />
              </div>

              <p className={"cardItem__text"}>
                {!loading ? el.name : "Loading..."}
              </p>
            </div>
          ))}
        </section>
        <section className="pagination">
          {information?.heroes &&
            paginationArray?.map((el, ind) => generatePaginationJSX(el, ind))}
        </section>
      </section>
    </body>
  );
}

export default App;
