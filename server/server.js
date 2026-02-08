const express = require("express");
const cors = require("cors");

const app = express();

let tasks = [];

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Kanban API is running");
});

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/tasks", (req, res) => {
  const newTask = {
    id: Date.now(),
    title: req.body.title,
    status: "todo"
  };

  tasks.push(newTask);

  res.json(newTask);
  console.log(req.body);

});

app.patch("/tasks/:id", (req,res) => {
  const { id } = req.params;

  const task = tasks.find(t => t.id == id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  Object.assign(task, req.body);

  res.json(task);
});

const PORT = 5050;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});