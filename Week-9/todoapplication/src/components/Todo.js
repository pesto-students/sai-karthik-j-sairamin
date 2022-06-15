import React, { useContext } from "react";
import { TodoContext } from "./";
import PropTypes from "prop-types";
// import { _noop } from "lodash/noop";

import "../AppWideCSS.css";

function Todo({ todo: { id }, todo: { isDone }, todo: { title }, todo }) {
  const { onDelete, onDone, setTodoToEdit } = useContext(TodoContext);
  return (
    <li className="todo">
      <div>
        <input
          type="checkbox"
          onChange={() => onDone(id)}
          checked={isDone}
        ></input>
        <span className={isDone ? "strike" : "nostrike"}>{title}</span>
      </div>
      <div>
        <i
          className="fa-solid fa-pen-to-square"
          onClick={() => {
            setTodoToEdit(todo);
          }}
        ></i>
        <i className="fa-solid fa-trash-can" onClick={() => onDelete(id)}></i>
      </div>
    </li>
  );
}

Todo.propTypes = {
  id: PropTypes.string,
  isDone: PropTypes.bool,
  title: PropTypes.string,
  todo: PropTypes.object,
};

// Don't see the use for using defaultProps
// Because Todo is never rendered when there is not atleast
// one todo object in the array

export default Todo;
