/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import Card from "./Card";
import axios from "axios";

const CardGrid = ({ page, setLimit }) => {
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {getData()}, [page]);



  const getData = () => {
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
          setLimit(resp.data.data.total / 20);
          setHeroes(resp.data.data.results);
          setLoading(false);
        });
    } else {
      setHeroes(storageItems[page]);
      setLimit(limit);
      setLoading(false);
    }
  }

  return (
    <section className="cards">
      {heroes && <Card heroes={heroes} loading={loading} />}
    </section>
  );
};

export default CardGrid;
