/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import Card from "./Card";
import axios from "axios";

const CardGrid = ({ page }) => {
  const [heroes, setHeroes] = useState([]);
  useEffect(() => {
    axios
      .get(
        `https://gateway.marvel.com/v1/public/characters?ts=1&apikey=${
          process.env.REACT_APP_PUBLIC_KEY
        }&hash=${process.env.REACT_APP_ENCODED_KEY}&offset=${
          (page - 1) * 20
        }&limit=20`
      )
      .then((resp) => {
        setHeroes(resp.data.data);
      });
  }, []);
  console.log(heroes?.results);
  return (
    <section className="cards">
      {heroes?.results && <Card heroes={heroes.results} />}
    </section>
  );
};

export default CardGrid;
