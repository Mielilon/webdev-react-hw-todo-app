export default function TodosPage({ todos, setCurrentTodo }) {
  return (
    <div className="page">
      <h1>Список задач</h1>
      <ul>
        {todos.map((todo) => {
          return (
            <li
              onClick={() => setCurrentTodo(todo)}
              className="todo-item"
              key={todo.id}
            >
              {todo.text}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
