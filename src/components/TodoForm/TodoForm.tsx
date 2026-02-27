import React, { useState } from "react";
import RoundCheckbox from "../RoundCheckbox/RoundCheckbox";
import classes from "./TodoForm.module.css";

interface TodoFormProps {
  onAdd: (text: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onAdd }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    if (!text.trim()) return;

    const todo = {
      id: Date.now().toString(),
      text: text.trim(),
      index: 0,
      completed: false
    }
    console.log("Submitting todo:", todo);
    onAdd(todo.text);
    setText("");
  };

  return (
    <form className={classes.todoForm} onSubmit={handleSubmit}>
      <RoundCheckbox label="" completed={false} onToggle={() => null} />
      <input
        id="new-todo"
        type="text"
        value={text}
        className={classes.todoInput}
        placeholder="Create a new todo..."
        onChange={(e) => setText(e.target.value)}
      />
    </form>
  );
}

export default TodoForm;
