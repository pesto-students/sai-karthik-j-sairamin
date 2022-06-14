import React, { useContext } from "react";
import { Todo, TodoContext } from "./";
import "../AppWideCSS.css";

function TodoList() {
  const importedTodoContext = useContext(TodoContext);

  const mapCallbackToRender = (todo) => {
    return <Todo todo={todo} key={todo.id} />;
  };

  const renderTodos = importedTodoContext.todoList.map(mapCallbackToRender);

  const fallbackUI = <li className="lighttext">Add some todos</li>;

  return (
    <div className="todolist">
      <h1>Todo List</h1>
      <ul>{renderTodos.length > 0 ? renderTodos : fallbackUI}</ul>
    </div>
  );
}

export default TodoList;
