const express = require("express");
const cors = require("cors");

const app = express();

let tasks = [];

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    console.log("GET HIT:", tasks);
  res.send("Kanban API is running");
});

app.get("/tasks", (req, res) => {
  const { id } = req.params;

  const task = tasks.find(t => t.id == id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json(task);
});

app.post("/tasks", (req, res) => {
    console.log("POST HIT");
  const newTask = {
    id: Date.now(),
    title: req.body.title,
    status: "todo"
  };

  tasks.push(newTask);

 console.log(tasks);

  res.json(newTask);

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

app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;

  const taskIndex = tasks.findIndex(t => t.id == id);

  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  const deletedTask = tasks.splice(taskIndex, 1);

  res.json({
    message: "Task deleted",
    task: deletedTask[0]
  });
});


const PORT = 5050;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});