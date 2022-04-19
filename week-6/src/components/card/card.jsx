import React from "react";
import axios from "../../constants/axios";
import { useNavigate } from "react-router";

const Card = ({ el, loading, setChosen }) => {
  const navigate = useNavigate();
  const fetchHero = (id) => {
    if (id) {
      axios
        .get(
          `/characters/${id}?ts=1&apikey=${process.env.REACT_APP_PUBLIC_KEY}&hash=${process.env.REACT_APP_ENCODED_KEY}`
        )
        .then((resp) => {
          setChosen(resp.data.data.results[0]);
          navigate(`/hero:${resp.data.data.results[0].id}`);
        });
    }
  };

  return (
    <div className="cardItem" onClick={() => fetchHero(el.id)}>
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
              ? el.thumbnail?.path +
                "/portrait_xlarge." +
                el.thumbnail?.extension
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
      <p className={"cardItem__text"}>{!loading ? el.name : "Loading..."}</p>
    </div>
  );
};

export default Card;
