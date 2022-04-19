import React, { useState, useEffect, useRef } from "react";
import { Glass } from "../../icons";
import { useTranslation } from "react-i18next";

import axios from "../../constants/axios";
import { useNavigate } from "react-router";

const InputComponent = ({ setHero, hero }) => {
  const [visible, setVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [characterNames, setCharacterNames] = useState([]);
  const [chosen, setChosen] = useState("");
  const searchGrid = useRef(null);
  const navigate = useNavigate();

  const { t } = useTranslation();

  useEffect(() => {
    if (chosen) {
      fetchCharacter(chosen.id);
    }
  }, [chosen]);

  useEffect(() => {
    getCharacterInfo(searchText, setCharacterNames);
  }, [searchText]);

  useEffect(() => {
    document.addEventListener("mousedown", clickDetector);
    return () => {
      document.removeEventListener("mousedown", clickDetector);
    };
  }, [searchGrid]);

  useEffect(() => {
    if (hero?.id) {
      navigate(`/hero:${hero.id}`);
    }
  }, [hero]);
  const searchHero = (e) => setSearchText(e.target.value);

  const fetchCharacter = (id) => {
    axios
      .get(
        `/characters/${id}?ts=1&apikey=${process.env.REACT_APP_PUBLIC_KEY}&hash=${process.env.REACT_APP_ENCODED_KEY}`
      )
      .then((resp) => {
        setHero(resp.data.data.results[0]);
      });
  };

  const getCharacterInfo = (text, setFunction) => {
    const storage = JSON.parse(sessionStorage.getItem("search")) || {};
    if (text.length > 0) {
      if (!storage[`${text}`]) {
        axios
          .get(
            `/characters?ts=1&apikey=${process.env.REACT_APP_PUBLIC_KEY}&hash=${process.env.REACT_APP_ENCODED_KEY}&nameStartsWith=${text}`
          )
          .then((resp) => {
            const item = resp.data.data.results.slice(0, 5);
            const itemToAdd = item.map((el) => ({
              name: el.name,
              id: el.id,
            }));
            sessionStorage.setItem(
              "search",
              JSON.stringify({
                ...storage,
                [text]: [...itemToAdd],
              })
            );
            setFunction([...itemToAdd]);
          });
      } else {
        setFunction([...storage[`${text}`]]);
      }
    } else {
      setCharacterNames([]);
    }
  };

  const clickDetector = (e) => {
    const searchBar = searchGrid.current;

    if (!searchBar.contains(e.target)) {
      if (!e.target.className.includes("inputDiv__result")) {
        setVisible(false);
      }
    } else {
      setVisible(true);
    }
  };

  const clickChosen = (item) => {
    setChosen(item);
    setVisible(false);
  };

  return (
    <div className="inputDiv">
      <Glass />
      <input
        className="inputDiv__input"
        placeholder={t("searchBar.text")}
        value={searchText}
        onChange={searchHero}
        ref={searchGrid}
      />

      <div
        className="inputDiv__result"
        style={visible ? { zIndex: 50 } : { zIndex: -1 }}
      >
        {characterNames?.map((el) => (
          <div
            className={
              visible ? "inputDiv__result--down" : "inputDiv__result--up"
            }
            key={el.id}
            onClick={() => clickChosen(el)}
          >
            {el.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InputComponent;
