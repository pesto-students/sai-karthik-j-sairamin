import React, { useContext } from "react";
import "../AppWideCSS.css";
import Todo from "./Todo";
import TodoContext from "../store/todo-context";

function TodosList(props) {
  const ctx = useContext(TodoContext);
  const todos = [...ctx.todosList];
  console.log(todos);
  const displayTodos = todos.map((todo) => {
    return <Todo todo={todo} key={todo.id} />;
  });
  // console.log(displayTodos);

  const fallbackUI = <span className="lighttext">Add some todos</span>;
  return (
    <div className="todolist">
      <h1>Todo List</h1>

      <ul>{displayTodos.length > 0 ? displayTodos : fallbackUI}</ul>
    </div>
  );
}

export default TodosList;
