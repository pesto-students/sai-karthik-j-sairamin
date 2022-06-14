import React, { useState, useRef, useContext, useEffect } from "react";
import { TodoContext } from "./";
import { v4 as generateUniqueID } from "uuid";
import "../AppWideCSS.css";

const AddTodo = () => {
  const importedTodoContext = useContext(TodoContext);
  const [isError, setIsError] = useState(false);
  const [maxTodoLengthReached, setMaxTodoLengthReached] = useState(false);
  const inputRef = useRef();
  const [inputTextValue, setInputTextValue] = useState("");

  useEffect(() => {
    if (importedTodoContext.todoBeingEdited) {
      setInputTextValue(importedTodoContext.todoBeingEdited.title);
    }
  }, [importedTodoContext.todoBeingEdited]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(importedTodoContext.todoBeingEdited);
    if (isError === false && maxTodoLengthReached === false) {
      // valid input
      const todo = {
        title: inputRef.current.value,
        id: generateUniqueID(),
        isDone: false,
      };
      // console.log("new todo ", todo);

      if (importedTodoContext.todoBeingEdited === null) {
        // console.log("adding to array");
        importedTodoContext.onAdd(todo);
      } else {
        setInputTextValue(importedTodoContext.todoBeingEdited.title);
        // console.log("modifying array");
        importedTodoContext.onEdit(
          importedTodoContext.todoBeingEdited.id,
          inputRef.current.value
        );
      }
      setIsError(false);
      setMaxTodoLengthReached(false);
      setInputTextValue(""); // reset input field
    }
  };
  const validateTodo = (event) => {
    setInputTextValue(event.target.value);
    if (inputRef.current.value.trim().length < 1) {
      setIsError(true);
    } else {
      setIsError(false);
    }
    if (inputRef.current.value.trim().length > 25) {
      setMaxTodoLengthReached(true);
    } else {
      setMaxTodoLengthReached(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="addtodoform">
      <div className="errorzone">
        {isError && <p className="errors">Empty Todo is NOT Allowed!</p>}
        {maxTodoLengthReached && (
          <p className="errors">Error! Max 25 characters Allowed!</p>
        )}
      </div>
      <div>
        <input
          value={inputTextValue}
          onChange={validateTodo}
          className={
            isError || maxTodoLengthReached ? "invalidInput" : "validInput"
          }
          ref={inputRef}
          type="text"
          required
          maxLength={26}
        ></input>
        <button type="submit">
          {importedTodoContext.todoBeingEdited !== null
            ? "Edit Todo"
            : "Add Todo"}
        </button>
      </div>
    </form>
  );
};

export default AddTodo;
