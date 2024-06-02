import { useState } from "react";
import { postTodo } from "../api";
import Loader from "./Loader/Loader";

export function AddTodoForm({ setTodos }) {
  const [newTodoText, setNewTodoText] = useState("");
  const [isPostingTodo, setPostingTodo] = useState(false);

  const handleAddTodoClick = async () => {
    if (!newTodoText) {
      return;
    }

    setPostingTodo(true);
    const newTodos = await postTodo(newTodoText);
    setPostingTodo(false);

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
      {isPostingTodo && <Loader />}
      {!isPostingTodo && (
        <button onClick={handleAddTodoClick}>Добавить задачу</button>
      )}
    </div>
  );
}
