import { useEffect, useState } from "react";
import AppRoutes from "./AppRoutes";
import { getTodos } from "./api";
import { Link } from "react-router-dom";

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Хлеб" },
    { id: 2, text: "Молоко" },
    { id: 3, text: "Сок" },
  ]);

  useEffect(() => {
    getTodos().then((todos) => {
      setTodos(todos.todos);
    });
  }, []);

  const [currentTodo, setCurrentTodo] = useState(null);

  return (
    <>
      {currentTodo ? (
        <div className="current-task">Текущая задача: {currentTodo.text}</div>
      ) : null}
      <h3>Навигация</h3>
      <Link to="/">Задачи</Link>
      <br />
      <Link to="/add">Добавить задачу</Link>
      <br />
      <Link to="/about">О проекте</Link>
      <br />
      <br />
      <AppRoutes
        setCurrentTodo={setCurrentTodo}
        todos={todos}
        setTodos={setTodos}
      ></AppRoutes>
    </>
  );
}

export default App;
