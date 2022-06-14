import React from "react";

const TodoContext = React.createContext({
  todoList: [],
  todoBeingEdited: null,
  setTodoToEdited: () => {},
  onAdd: () => {},
  onDelete: () => {},
  onEdit: () => {},
  onDone: () => {},
});

export default TodoContext;
