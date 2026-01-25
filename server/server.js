import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let todos = [];

// Home route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Get all todos
app.get("/todos", (req, res) => {
  res.json(todos);
});

// Add todo
app.post("/todos", (req, res) => {
  const newTodo = {
    id: Date.now(),
    title: req.body.title,
  };
  todos.push(newTodo);
  res.json(newTodo);
});

// Delete todo
app.delete("/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  todos = todos.filter((todo) => todo.id !== id);
  res.json({ message: "Todo deleted" });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
