import { Route, Routes } from "react-router-dom";
import TodosPage from "./pages/TodosPage";
import AboutPage from "./pages/AboutPage";
import AddTodoPage from "./pages/AddTodoPage";

function AppRoutes({ todos, setTodos, setCurrentTodo }) {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <TodosPage
            setCurrentTodo={setCurrentTodo}
            todos={todos}
            setTodos={setTodos}
          ></TodosPage>
        }
      ></Route>
      <Route path="/about" element={<AboutPage></AboutPage>}></Route>
      <Route
        path="/add"
        element={<AddTodoPage setTodos={setTodos}></AddTodoPage>}
      ></Route>
    </Routes>
  );
}

export default AppRoutes;
