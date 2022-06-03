import React from "react";

const TodoContext = React.createContext({
  todosList: [],
  todoToEdit: null,
  setTodoToEdit: () => {},
  onAdd: () => {},
  onDelete: () => {},
  onEdit: () => {},
  onDone: () => {},
});

export default TodoContext;

/**
 
todosList = [
    {
        title: "Complete Assignment",
        id: 1
        isDone : false

    },
    {
        title: "Buy Icecream",
        id: 2
        isDone : true
    },
    {
        title: "Do Pramp Interview",
        id: 3
        isDone : false
    }
]
 */
