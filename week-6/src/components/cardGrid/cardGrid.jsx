import React from "react";

import { Card } from "../../components";
import { getInformationContext } from "../../contexts/informationContext";

const CardGrid = () => {
    const { information } = getInformationContext();
    return (
        <section className="cards">
            {information?.heroes?.map((el, ind) => (
                <Card el={el} key={el?.id ? el.id : ind} />
            ))}
        </section>
    );
};

export default CardGrid;
