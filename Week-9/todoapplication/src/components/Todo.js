import React, { useContext } from "react";
import { TodoContext } from "./";
import "../AppWideCSS.css";

function Todo(props) {
  const importedTodoContext = useContext(TodoContext);

  return (
    <li className="todo">
      <div>
        <input
          type="checkbox"
          onChange={() => importedTodoContext.onDone(props.todo.id)}
          checked={props.todo.isDone}
        ></input>
        <span className={props.todo.isDone ? "strike" : "nostrike"}>
          {props.todo.title}
        </span>
      </div>
      <div>
        <i
          className="fa-solid fa-pen-to-square"
          onClick={() => {
            importedTodoContext.setTodoToEdit(props.todo);
          }}
        ></i>
        <i
          className="fa-solid fa-trash-can"
          onClick={() => importedTodoContext.onDelete(props.todo.id)}
        ></i>
      </div>
    </li>
  );
}

export default Todo;
