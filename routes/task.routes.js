const router = require("express").Router();
const Task = require("../models/Task.model");
const User = require("../models/User.model");

router.post("/", async (req, res) => {
  const { userId } = req.body;

  try {
    const savedTask = await Task.create(req.body);
    await User.findByIdAndUpdate(userId, { $push: { tasks: savedTask._id } });
    res.status(201).json(savedTask);
  } catch (err) {
    console.error("Error creating task:", err);
    res.status(500).json({ error: "Failed to create a new task" });
  }
});

router.get("/", (req, res) => {
  const { _id } = req.payload;
  Task.find({ ...req.body, userId: _id })
    .sort({ type: 1, position: 1 })
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
  const { _id } = req.payload;
  Task.find({ type: taskType, userId: _id })
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
  Task.findByIdAndUpdate(taskId, req.body, { new: true })
    .then((updatedTask) => {
      res.status(200).json(updatedTask);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to update this task" });
    });
});

router.delete("/:taskId", async (req, res) => {
  const { taskId } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(taskId);
    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    await User.findByIdAndUpdate(deletedTask.userId, {
      $pull: { tasks: taskId },
    });
    res.status(204).send();
  } catch (err) {
    console.error("Error deleting task", err);
    res.status(500).json({ error: "Failed to delete this task" });
  }
});
module.exports = router;
