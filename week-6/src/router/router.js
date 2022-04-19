import React from "react";
import { Route, Routes } from "react-router";
import { CardGrid, HeroGrid } from "../components";

const RoutePath = ({ information, loading, chosen, setChosen }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={<CardGrid information={information} loading={loading} />}
      />
      <Route
        path="/hero:id"
        element={<HeroGrid chosen={chosen} setChosen={setChosen} />}
      />
    </Routes>
  );
};

export default RoutePath;
