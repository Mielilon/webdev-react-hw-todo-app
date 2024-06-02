import { useState, useEffect } from "react";
import { AddTodoForm } from "../components/AddTodoForm";
import { getTodos, deleteTodo } from "../api";

export default function TodosPage() {
  const [todos, setTodos] = useState([]);
  const [deletingTodoIds, setDeletingTodoIds] = useState({});

  const handleDeleteTodo = async (id) => {
    setDeletingTodoIds((prev) => ({ ...prev, [id]: true }));

    const newTodo = await deleteTodo(id);

    setDeletingTodoIds((prev) => ({ ...prev, [id]: false }));
    setTodos(newTodo.todos);
  };

  useEffect(() => {
    getTodos().then((result) => {
      console.log(result.todos);
      setTodos(result.todos);
    });
  }, []);

  return (
    <div className="page">
      <h1>Список задач</h1>
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
            </li>
          );
        })}
      </ul>
      <AddTodoForm todos={todos} setTodos={setTodos} />
    </div>
  );
}
