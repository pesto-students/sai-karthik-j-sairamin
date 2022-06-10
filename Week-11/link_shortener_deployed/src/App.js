import React, { useState } from "react";
import "./AppWideCSS.css";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";

function App() {
  const [page, setPage] = useState("Home");
  const selectPage = (page) => {
    setPage(page);
  };
  return (
    <div className="App">
      <Header choosePage={selectPage} />
      <Body page={page} choosePage={selectPage} />
      <Footer choosePage={selectPage} />
    </div>
  );
}

export default App;
