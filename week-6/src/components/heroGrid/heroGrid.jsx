import React, { useEffect } from "react";
import axios from "../../constants/axios";

import { useParams } from "react-router";

const HeroGrid = ({ chosen, setChosen }) => {
  const { id } = useParams();
  const idToUse = id ? id.split(":")[1] : null;

  useEffect(() => {
    if (!chosen?.id && idToUse && idToUse !== chosen?.id) {
      fetchCharacter(idToUse);
    }
  }, [chosen]);

  const fetchCharacter = (id) => {
    if (id) {
      axios
        .get(
          `/characters/${id}?ts=1&apikey=${process.env.REACT_APP_PUBLIC_KEY}&hash=${process.env.REACT_APP_ENCODED_KEY}`
        )
        .then((resp) => {
          setChosen(resp.data.data.results[0]);
        });
    }
  };

  return (
    <div className="hero">
      {chosen?.id ? (
        <>
          <div className="hero__imageDiv">
            <img
              src={`${chosen.thumbnail.path}.${chosen.thumbnail.extension}`}
              alt={chosen.id}
              className="hero__image"
            />
          </div>
          <div className="hero__infoDiv">
            <h2 className="hero__name">{chosen.name}</h2>

            <h4 className="hero__description">
              {chosen.description
                ? chosen.description
                : "No available description"}
            </h4>
            <div className="hero__additionalDiv">
              <div className="hero__seriesDiv">
                <h4>Series</h4>
                {chosen.series.available ? (
                  chosen.series.items.map(
                    (el, ind) => ind < 5 && <span key={el.name}>{el.name}</span>
                  )
                ) : (
                  <h5>No available series</h5>
                )}
              </div>
              <div className="hero__storiesDiv">
                <h4>Stories</h4>
                {chosen.stories.available ? (
                  chosen.stories.items.map(
                    (el, ind) => ind < 5 && <span key={el.name}>{el.name}</span>
                  )
                ) : (
                  <h5>No available story</h5>
                )}
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default HeroGrid;
