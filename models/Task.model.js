const { Schema, model } = require("mongoose");

const taskSchema = new Schema({
  type: {
    type: String,
    enum: ["To Do", "In Progress", "Done"],
  },
  title: String,
  content: String,
  createdAt: { type: Date, default: Date.now },
});

//try () => Date.now - what is the difference

module.exports = model("Task", taskSchema);
