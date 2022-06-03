import React from "react";
import "../AppWideCSS.css";
import AddTodo from "./AddTodo";

const Header = (props) => {
  return (
    <div className="header">
      <AddTodo />
    </div>
  );
};

export default Header;
