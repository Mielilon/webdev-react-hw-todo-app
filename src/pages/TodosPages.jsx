import { useState } from "react";
import { AddTodoForm } from "../components/AddTodoForm";

export default function TodosPage() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Купить молоко" },
    { id: 2, text: "Купить хлеб" },
    { id: 3, text: "Купить масло" },
  ]);
  return (
    <div className="page">
      <h1>Список задач</h1>
      <ul>
        {todos.map((todo) => {
          return (
            <li className="todo-item" key={todo.id}>
              {todo.text}
            </li>
          );
        })}
      </ul>
      <AddTodoForm todos={todos} setTodos={setTodos} />
    </div>
  );
}
