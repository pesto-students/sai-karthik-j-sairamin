import React, { useContext } from "react";
import { todoContext } from "../../store";
import PropTypes from "prop-types";

function Todo({ todo: { id, isDone, title }, todo }) {
  const { onDelete, onDone, setTodoToEdit } = useContext(todoContext);
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
