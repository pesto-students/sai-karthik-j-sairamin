import React from "react";
import { AddTodo } from "./";
import "../AppWideCSS.css";

const Header = (props) => {
  return (
    <div className="header">
      <AddTodo />
    </div>
  );
};

export default Header;
