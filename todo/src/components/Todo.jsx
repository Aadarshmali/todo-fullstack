import { useEffect, useState } from "react";
import axios from "axios"; // make sure axios is installed

const API = "http://localhost:5000/todos";

function Todo() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  // Fetch todos from backend when component mounts
  useEffect(() => {
    axios
      .get(API)
      .then((res) => setTodos(res.data))
      .catch((err) => console.error("Backend fetch error:", err));
  }, []);

  // Add todo via backend
  const addTodo = () => {
    if (!task.trim()) return;

    axios
      .post(API, { title: task })
      .then((res) => {
        setTodos([...todos, res.data]);
        setTask("");
      })
      .catch((err) => console.error("Backend add error:", err));
  };

  // Delete todo via backend
  const deleteTodo = (id) => {
    axios
      .delete(`${API}/${id}`)
      .then(() => setTodos(todos.filter((todo) => todo.id !== id)))
      .catch((err) => console.error("Backend delete error:", err));
  };

  return (
    <div className="todo-container">
  <h2>My Todo List</h2>
  <div className="input-container">
    <input
      type="text"
      placeholder="Enter task"
      value={task}
      onChange={(e) => setTask(e.target.value)}
    />
    <button onClick={addTodo}>Add</button>
  </div>

  <ul>
    {todos.map((todo) => (
      <li key={todo.id}>
        {todo.title}
        <button onClick={() => deleteTodo(todo.id)}>❌</button>
      </li>
    ))}
  </ul>
</div>
);
}

export default Todo;