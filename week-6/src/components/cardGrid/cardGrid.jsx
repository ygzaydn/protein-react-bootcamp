import React, { useState, useEffect, useRef } from "react";

import { Card } from "../../components";

const CardGrid = ({ information, loading }) => {
    return (
        <section className="cards">
            {information?.heroes?.map((el, ind) => (
                <Card el={el} loading={loading} key={el?.id ? el.id : ind} />
            ))}
        </section>
    );
};

export default CardGrid;
