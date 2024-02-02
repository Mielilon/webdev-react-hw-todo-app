import { useState } from "react";
import { postTodo } from "../api";

export function AddTodoForm({ setTodos }) {
  const [newTodoText, setNewTodoText] = useState("");

  const [isNewTodoLoading, setIsNewTodoLoading] = useState(false);
  const [addTodoError, setAddTodoError] = useState(null);

  const handleAddTodoClick = async () => {
    try {
      if (!newTodoText) {
        return;
      }
      setIsNewTodoLoading(true);
      const newTodos = await postTodo(newTodoText);

      setTodos(newTodos.todos);
      setNewTodoText("");
    } catch (error) {
      setAddTodoError(error.message);
    } finally {
      setIsNewTodoLoading(false);
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
      <button disabled={isNewTodoLoading} onClick={handleAddTodoClick}>
        {isNewTodoLoading ? "Задача добавляется..." : "Добавить задачу"}
      </button>
    </div>
  );
}
