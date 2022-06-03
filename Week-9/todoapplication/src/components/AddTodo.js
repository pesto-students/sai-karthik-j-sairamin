import React, { useState, useRef, useContext, useEffect } from "react";
import "../AppWideCSS.css";
import TodoContext from "../store/todo-context";
import { v4 as genUUID } from "uuid";

const AddTodo = () => {
  const ctx = useContext(TodoContext);
  const [isError, setIsError] = useState(false);
  const [maxLen, setMaxLen] = useState(false);
  const inputRef = useRef();
  const [inputVal, setInputVal] = useState("");

  useEffect(() => {
    if (ctx.todoToEdit) {
      setInputVal(ctx.todoToEdit.title);
    }
  }, [ctx.todoToEdit]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(ctx.todoToEdit);
    console.log("submitted");
    if (isError === false && maxLen === false) {
      // valid input
      const todo = {
        title: inputRef.current.value,
        id: genUUID(),
        isDone: false,
      };
      console.log("new todo ", todo);

      if (ctx.todoToEdit === null) {
        console.log("adding to array");
        ctx.onAdd(todo);
      } else {
        setInputVal(ctx.todoToEdit.title);
        console.log("modifying array");
        ctx.onEdit(ctx.todoToEdit.id, inputRef.current.value);
      }
      setIsError(false);
      setMaxLen(false);
      setInputVal(""); // reset input field
    }
  };
  const validateTodo = (event) => {
    setInputVal(event.target.value);
    if (inputRef.current.value.trim().length < 1) {
      setIsError(true);
    } else {
      setIsError(false);
    }
    if (inputRef.current.value.trim().length > 25) {
      setMaxLen(true);
    } else {
      setMaxLen(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="addtodoform">
      <div className="errorzone">
        {isError && <p className="errors">Empty Todo is NOT Allowed!</p>}
        {maxLen && <p className="errors">Error! Max 25 characters Allowed!</p>}
      </div>
      <div>
        <input
          value={inputVal}
          onChange={validateTodo}
          className={isError || maxLen ? "invalidInput" : "validInput"}
          ref={inputRef}
          type="text"
          required
          maxLength={26}
        ></input>
        <button type="submit">
          {ctx.todoToEdit !== null ? "Edit Todo" : "Add Todo"}
        </button>
      </div>
    </form>
  );
};

export default AddTodo;
