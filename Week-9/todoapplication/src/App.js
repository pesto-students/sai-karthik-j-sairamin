import React, { useState } from "react";
import "./AppWideCSS.css";
import { TodoPage } from "./components";
import { todoContext } from "./store";

const App = () => {
  const dummyData = [
    {
      title: "Complete Pesto Assignments",
      id: 1,
      isDone: false,
    },
    {
      title: "Buy Icecream",
      id: 2,
      isDone: true,
    },
    {
      title: "Do Pramp Interview",
      id: 3,
      isDone: false,
    },
  ];
  const [data, setData] = useState(dummyData);
  const [todoToEdit, setTodoToEdit] = useState(null);

  const onAdd = (newTodo) => {
    // adding new todo
    const newData = [...data, newTodo];
    setData(newData);
  };

  const onDelete = (idOfTodoToBeDeleted) => {
    // deleting a todo based on ID
    const newData = data.filter((todo) => todo.id !== idOfTodoToBeDeleted);
    setData(newData);
  };

  const onEdit = (idOfTodoToEdit, newTitle) => {
    // changing title property of a given ID
    const newData = data.map((todo) => {
      if (todo.id === idOfTodoToEdit) {
        todo.title = newTitle;
      }
      return todo;
    });
    setData(newData);
    setTodoToEdit(null);
  };

  const onDone = (todoIdToBeSetAsDone) => {
    // change isDone property to "true" for that ID
    const newData = data.map((todo) => {
      if (todo.id === todoIdToBeSetAsDone) {
        todo.isDone = !todo.isDone;
      }
      return todo;
    });
    setData(newData);
  };

  return (
    <todoContext.Provider
      value={{
        todoList: data,
        todoBeingEdited: todoToEdit,
        setTodoToEdit,
        onAdd,
        onDelete,
        onEdit,
        onDone,
      }}
    >
      <div className="app">
        <h1>
          Todo Application <br />
          (Built using Context API)
        </h1>
        <p>Features Supported : </p>
        <p>
          Input Validation, Addition, Deletion, Marking as Completed & Editing
        </p>
        <TodoPage />
      </div>
    </todoContext.Provider>
  );
};

export default App;
