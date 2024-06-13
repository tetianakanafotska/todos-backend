const { Schema, model } = require("mongoose");

const taskSchema = new Schema({
  type: {
    type: String,
    enum: ["To Do", "In Progress", "Done"],
  },
  title: String,
  description: String,
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
  },
  assignee: String,
  createdAt: { type: Date, default: Date.now },
  dueDate: Date,
});

//try () => Date.now - what is the difference

module.exports = model("Task", taskSchema);
