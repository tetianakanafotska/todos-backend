const router = require("express").Router();
const Task = require("../models/Task.model");

router.post("/", (req, res) => {
  Task.create(req.body)
    .then((createdTask) => {
      res.status(201).json(createdTask);
    })
    .catch((err) => {
      console.error("Error creating new task:", err);
      res.status(500).json({ error: "Failed to create a new task" });
    });
});

router.get("/", (req, res) => {
  Task.find(req.body)
    .then((allTasks) => {
      res.status(200).json(allTasks);
    })
    .catch((err) => {
      console.error("Error retrieving all tasks:", err);
      res.status(500).json({ error: "Failed to retrieve all tasks" });
    });
});

router.get("/:taskType", (req, res) => {
  const { taskType } = req.params;
  Task.find({ type: taskType })
    .sort({ orderInList: 1 })
    .then((tasksOfType) => {
      res.status(200).json(tasksOfType);
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
  console.log("the req body", req.body);
  Task.findByIdAndUpdate(taskId, req.body, { new: true })
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
