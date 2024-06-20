const { Schema, model } = require("mongoose");

const taskSchema = new Schema({
  type: {
    type: String,
    enum: ["toDo", "inProgress", "done"],
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
  orderInList: Number,
});

module.exports = model("Task", taskSchema);
//try () => Date.now - what is the difference
