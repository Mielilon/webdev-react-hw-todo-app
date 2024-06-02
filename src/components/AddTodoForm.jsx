import { useState } from "react";
import { postTodo } from "../api";

export function AddTodoForm({ setTodos }) {
  const [newTodoText, setNewTodoText] = useState("");

  const handleAddTodoClick = async () => {
    if (!newTodoText) {
      return;
    }

    const newTodos = await postTodo(newTodoText)

    setTodos(newTodos.todos);
    setNewTodoText("");
  };

  return (
    <div>
      <h3>Добавить задачу</h3>
      <input
        value={newTodoText}
        onChange={(event) => {
          setNewTodoText(event.target.value);
        }}
      />
      <button onClick={handleAddTodoClick}>Добавить задачу</button>
    </div>
  );
}
