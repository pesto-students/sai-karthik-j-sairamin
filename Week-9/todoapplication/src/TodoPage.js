import React from "react";
import "./AppWideCSS.css";
import { Header, Content } from "./components/index";

const TodoPage = (props) => {
  return (
    <div className="todopage">
      <Header />
      <Content />
    </div>
  );
};

export default TodoPage;
