import React from "react";

const TodoContext = React.createContext({
  todoList: [],
  todoBeingEdited: null,
  setTodoToEdit: () => {},
  onAdd: () => {},
  onDelete: () => {},
  onEdit: () => {},
  onDone: () => {},
});

export default TodoContext;
