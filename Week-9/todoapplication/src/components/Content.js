import React from "react";
import "../AppWideCSS.css";
import TodoList from "./TodosList";

const Content = (props) => {
  return (
    <div className="content">
      {/* <h1>Content Sanity Check</h1> */}
      <TodoList />
    </div>
  );
};

export default Content;
