import React from "react";

const Card = ({ el, loading }) => (
    <div className="cardItem">
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

export default Card;
