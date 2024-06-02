import { useState } from "react";
import { postTodo } from "../api";
import Loader from "./Loader/Loader";

export function AddTodoForm({ setTodos }) {
  const [newTodoText, setNewTodoText] = useState("");
  const [isPostingTodo, setPostingTodo] = useState(false);
  const [addTodoError, setTodoError] = useState(null);

  const handleAddTodoClick = async () => {
    try {
      if (!newTodoText) {
        return;
      }

      setTodoError(null);

      setPostingTodo(true);
      const newTodos = await postTodo(newTodoText);

      setTodos(newTodos.todos);
      setNewTodoText("");
    } catch (error) {
      if (error.message === "Failed to fetch") {
        setTodoError("Ошибка подключения");
      }

      setTodoError(error.message);
    } finally {
      setPostingTodo(false);
    }
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
      <p style={{ color: "red" }}>{addTodoError}</p>
      {isPostingTodo && <Loader />}
      {!isPostingTodo && (
        <button onClick={handleAddTodoClick}>Добавить задачу</button>
      )}
    </div>
  );
}
