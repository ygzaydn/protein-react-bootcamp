import React from "react";

import { Card } from "../../components";

const CardGrid = ({ information, loading, chosen, setChosen }) => {
  return (
    <section className="cards">
      {information?.heroes?.map((el, ind) => (
        <Card
          el={el}
          chosen={chosen}
          setChosen={setChosen}
          loading={loading}
          key={el?.id ? el.id : ind}
        />
      ))}
    </section>
  );
};

export default CardGrid;
