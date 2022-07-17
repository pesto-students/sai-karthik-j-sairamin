import React from "react";

const todoContext = React.createContext({
  todoList: [],
  todoBeingEdited: null,
  setTodoToEdit: () => {},
  onAdd: () => {},
  onDelete: () => {},
  onEdit: () => {},
  onDone: () => {},
});

export default todoContext;
