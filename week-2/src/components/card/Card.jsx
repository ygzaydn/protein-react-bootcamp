import React from "react";

const Card = ({ heroes }) => {
  return (
    <section className="cards">
      {heroes.map((el) => (
        <div className="cardItem" key={el.id}>
          <img
            src={
              el.thumbnail.path + "/portrait_large." + el.thumbnail.extension
            }
            alt={el.name + "img"}
            className="cardItem__heroImage"
          />
          <p className="cardItem__text">{el.name}k</p>
        </div>
      ))}
    </section>
  );
};

export default Card;
