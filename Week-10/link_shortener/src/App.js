import React, { useState } from "react";
import "./AppWideCSS.css";
import { Body, Header, Footer } from "./components";
import PropTypes from "prop-types";

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

App.propTypes = {
  page: PropTypes.string,
  choosePage: PropTypes.func,
};

App.defaultProps = {
  page: "Home",
};

export default App;
