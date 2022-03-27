import React from "react";
import Gray from "../../assets/gray.png";

const Card = ({ heroes, loading }) => {
  return (
    <>
      {heroes.map((el) => (
        <div className="cardItem" key={el.id}>
          <img
            src={
              !loading
                ? el.thumbnail.path +
                  "/portrait_xlarge." +
                  el.thumbnail.extension
                : Gray
            }
            alt={!loading && el.name + "img"}
            className={loading ? "cardItem__heroImage " : "cardItem__heroImage"}
          />
          <p className={loading ? "cardItem__text " : "cardItem__text"}>
            {!loading ? el.name : "Loading..."}
          </p>
        </div>
      ))}
    </>
  );
};

export default Card;
