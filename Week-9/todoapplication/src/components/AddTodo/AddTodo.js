import React, { useState, useRef, useContext, useEffect } from "react";
import { todoContext } from "../../store";
import { v4 as generateUniqueID } from "uuid";

const AddTodo = () => {
  const importedTodoContext = useContext(todoContext);
  const [isError, setIsError] = useState(false);
  const inputRef = useRef();
  const [inputTextValue, setInputTextValue] = useState("");
  const [maxTodoLengthReached, setMaxTodoLengthReached] = useState(false);
  const MAX_ALLOWED_TODO_CHARACTER_LENGTH = 26;

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
    if (
      inputRef.current.value.length >= MAX_ALLOWED_TODO_CHARACTER_LENGTH &&
      inputRef.current.value.trim().length !== 0
    ) {
      setMaxTodoLengthReached(true);
    } else {
      setMaxTodoLengthReached(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="addtodoform header">
      <div className="errorzone">
        {isError && <p className="errors">Empty Todo is NOT Allowed!</p>}
        {maxTodoLengthReached && (
          <p className="errors">Error! Can't exceed 25 characters!</p>
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
          maxLength={MAX_ALLOWED_TODO_CHARACTER_LENGTH}
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
