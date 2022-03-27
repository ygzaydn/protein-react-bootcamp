import React, { useState } from "react";

import "./App.css";

import Header from "./components/header/header";
import CardGrid from "./components/card/CardGrid";
import Pagination from "./components/pagination/pagination";

function App() {
  const [page, setPage] = useState(1);
  return (
    <body>
      <Header />
      <section className="content">
        <CardGrid page={page} setPage={setPage} />
        <Pagination page={page} setPage={setPage} />
      </section>
    </body>
  );
}

export default App;
