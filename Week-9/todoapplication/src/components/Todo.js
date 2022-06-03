import React, { useContext } from "react";
import "../AppWideCSS.css";
import TodoContext from "../store/todo-context";

function Todo(props) {
  const ctx = useContext(TodoContext);
  console.log(ctx.todoToEdit);

  return (
    <li className="todo">
      <div>
        <input
          type="checkbox"
          onChange={() => ctx.onDone(props.todo.id)}
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
            ctx.setTodoToEdit(props.todo);
          }}
        ></i>
        <i
          className="fa-solid fa-trash-can"
          onClick={() => ctx.onDelete(props.todo.id)}
        ></i>
      </div>
    </li>
  );
}

export default Todo;
