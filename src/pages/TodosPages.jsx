import { useState } from "react";
import { AddTodoForm } from "../components/AddTodoForm";

export default function TodosPage() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Купить молоко" },
    { id: 2, text: "Купить хлеб" },
    { id: 3, text: "Купить масло" },
  ]);

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="page">
      <h1>Список задач</h1>
      <ul>
        {todos.map((todo) => {
          return (
            <>
              <li className="todo-item" key={todo.id}>
                {todo.text}
              </li>
              <button onClick={() => handleDeleteTodo(todo.id)}>Удалить</button>
            </>
          );
        })}
      </ul>
      <AddTodoForm todos={todos} setTodos={setTodos} />
    </div>
  );
}
