const express = require("express");
const app = express();
require("./config")(app);
require("./db");

const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const taskRoutes = require("./routes/task.routes");
app.use("/tasks", taskRoutes);

module.exports = app;
