import React, { useContext } from "react";
import { Todo } from "..";
import { todoContext as context } from "../../store";

function TodoList() {
  const importedTodoContext = useContext(context);

  const renderTodoItem = (todo) => {
    return <Todo todo={todo} key={todo.id} />;
  };

  const TodoElementList = importedTodoContext.todoList.map(renderTodoItem);

  const fallbackUI = <li className="lighttext">Add some todos</li>;

  return (
    <div className="todolist content">
      <h1>Todo List</h1>
      <ul>{TodoElementList.length > 0 ? TodoElementList : fallbackUI}</ul>
    </div>
  );
}

export default TodoList;
