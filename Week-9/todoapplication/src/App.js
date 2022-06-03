import React, { useState } from "react";
import "./AppWideCSS.css";
import TodoPage from "./TodoPage";
import TodoContext from "./store/todo-context";

const App = (props) => {
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
    const newData = [...data, newTodo];
    setData(newData);
  };

  const onDelete = (idOfTodoToBeDeleted) => {
    const newData = data.filter((todo) => todo.id !== idOfTodoToBeDeleted);
    setData(newData);
  };

  const onEdit = (idOfTodoToEdit, newTitle) => {
    const newData = data.map((todo) => {
      if (todo.id === idOfTodoToEdit) {
        console.log("changing title property of a given ID");
        todo.title = newTitle;
      }
      return todo;
    });
    setData(newData);
    console.log("before", todoToEdit);
    setTodoToEdit(null);
    console.log("after", todoToEdit);
    console.log("Editing method is running");
  };

  const onDone = (todoIdToBeSetAsDone) => {
    // change isDone property to "true" for that ID
    const newData = data.map((todo) => {
      if (todo.id === todoIdToBeSetAsDone) {
        console.log("changing isDone property of a given ID");
        todo.isDone = !todo.isDone;
      }
      return todo;
    });
    setData(newData);
  };

  return (
    <TodoContext.Provider
      value={{
        todosList: data,
        todoToEdit,
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
    </TodoContext.Provider>
  );
};

export default App;
