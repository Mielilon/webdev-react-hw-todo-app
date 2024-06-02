import { useState, useEffect } from "react";
import { AddTodoForm } from "../components/AddTodoForm";
import { getTodos, deleteTodo } from "../api";

export default function TodosPage() {
  const [todos, setTodos] = useState([]);
  const [deletingTodoIds, setDeletingTodoIds] = useState({});
  const [getTodosError, setTodosError] = useState(null);
  const [deleteTodoError, setDeleteTodoError] = useState(null);

  const handleDeleteTodo = async (id) => {
    setDeletingTodoIds((prev) => ({ ...prev, [id]: true }));

    try {
      const newTodo = await deleteTodo(id);
      setDeleteTodoError(null);

      setDeletingTodoIds((prev) => ({ ...prev, [id]: false }));
      setTodos(newTodo.todos);
    } catch (error) {
      if (error.message === "Failed to fetch") {
        setDeleteTodoError("Ошибка подключения");
      }

      setDeleteTodoError(error.message);
    }
  };

  useEffect(() => {
    getTodos()
      .then((result) => {
        setTodosError(null);
        setTodos(result.todos);
      })
      .catch((error) => {
        if (error.message === "Failed to fetch") {
          setTodosError("Ошибка подключения");
        }

        setTodosError(error.message);
      });
  }, []);

  return (
    <div className="page">
      <h1>Список задач</h1>
      <p style={{ color: "red" }}>{getTodosError}</p>
      <ul>
        {todos.map((todo) => {
          const isDeleting = deletingTodoIds[todo.id];

          return (
            <li className="todo-item" key={todo.id}>
              {todo.text}
              <button
                disabled={isDeleting}
                onClick={() => handleDeleteTodo(todo.id)}
              >
                {isDeleting ? "Удаление..." : "Удалить"}
              </button>
              <p style={{ color: "red" }}>{deleteTodoError}</p>
            </li>
          );
        })}
      </ul>
      <AddTodoForm todos={todos} setTodos={setTodos} />
    </div>
  );
}
