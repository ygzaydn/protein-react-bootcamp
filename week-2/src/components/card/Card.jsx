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
            className={"cardItem__heroImage"}
          />
          <p className={"cardItem__text"}>
            {!loading ? el.name : "Loading..."}
          </p>
        </div>
      ))}
    </>
  );
};

export default Card;
