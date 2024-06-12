const router = require("express").Router();
const Task = require("../models/Task.model.js");

router.post("/", (req, res) => {
  const { title, content } = req.body;
  Task.create({ title: title, content: content })
    .then((createdTask) => {
      res.status(201).json(createdTask);
    })
    .catch((err) => {
      console.error("Error creating new task:", err);
      res.status(500).json({ error: "Failed to create a new task" });
    });
});

router.get("/", (req, res) => {
  Task.find({})
    .then((allTasks) => {
      res.status(200).json(allTasks);
    })
    .catch((err) => {
      console.error("Error retrieving all tasks:", err);
      res.status(500).json({ error: "Failed to retrieve all tasks" });
    });
});

router.get("/:taskId", (req, res) => {
  const { taskId } = req.params;
  Task.findById(taskId)
    .then((task) => {
      res.status(200).json(task);
    })
    .catch((err) => {
      console.error("Error retrieving a task:", err);
      res.status(500).json({ error: "Failed to retrieve a task" });
    });
});

router.put("/:taskId", (req, res) => {
  const { taskId } = req.params;
  const { title, content } = req.body;
  Task.findByIdAndUpdate(taskId, { title: title, content: content })
    .then((updatedTask) => {
      res.status(200).json(updatedTask);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to update this task" });
    });
});

router.delete("/:taskId", (req, res) => {
  const { taskId } = req.params;
  Task.findByIdAndDelete(taskId)
    .then((deletedTask) => {
      res.status(204).send();
    })
    .catch((err) => {
      console.error("Error deleting task:", err);
      res.status(500).json({ error: "Failed to delete this task" });
    });
});
module.exports = router;
