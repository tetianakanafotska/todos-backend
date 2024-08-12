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
  createdAt: Date,
  dueAt: Date,
  position: Number,
  userId: Schema.Types.ObjectId,
});

module.exports = model("Task", taskSchema);
