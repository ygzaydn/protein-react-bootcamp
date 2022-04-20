import React from "react";
import { Route, Routes } from "react-router";
import { CardGrid, HeroGrid } from "../components";

const RoutePath = () => {
    return (
        <Routes>
            <Route path="/" element={<CardGrid />} />
            <Route path="/hero:id" element={<HeroGrid />} />
        </Routes>
    );
};

export default RoutePath;
