require("dotenv").config();

const logger = require("morgan");
const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");

const FRONTEND_URL = process.env.ORIGIN || "http://localhost:5173";

module.exports = (app) => {
  app.set("trust proxy", 1);

  app.use(
    cors({
      origin: FRONTEND_URL,
      methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    })
  );

  //app.use(cors());

  app.use(express.static("public"));
  app.use(logger("dev"));
  app.use(express.json());
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: false }));
};
