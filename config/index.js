const logger = require("morgan");
const cors = require("cors");
const express = require("express");
const path = require("path");

const FRONTEND_URL = process.env.ORIGIN || "http://localhost:5173";

module.exports = (app) => {
  app.set("trust proxy", 1);

  app.use(
    cors({
      origin: [FRONTEND_URL],
    })
  );
  //app.use(express.static(path.join(__dirname, "public")));
  app.use(express.static("public"));
  app.use(logger("dev"));
  app.use(express.json());

  app.use(express.urlencoded({ extended: false }));
};

//see what other stuff need to be added
