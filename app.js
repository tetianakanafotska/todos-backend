const express = require("express");
const app = express();
require("./config")(app);
require("./db");

const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const taskRoutes = require("./routes/task.routes");
app.use("/tasks", taskRoutes);

const userRoutes = require("./routes/user.routes");
app.use("/user", userRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

module.exports = app;
