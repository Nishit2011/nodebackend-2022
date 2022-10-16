const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const users = require("./router/user");
const logger = require("./middlewares/logger");
const morgan = require("morgan");
const { ppid } = require("process");
const connectDB = require("./config/db");

//loading config.env
dotenv.config({ path: "./config/config.env" });
connectDB();
const app = express();
const PORT = process.env.PORT || 5001;

//adding custom logger as middleware
//app.use(logger);

if (process.env.ENVIRONMENT === "development") {
  app.use(morgan("dev"));
}
app.get("/", (req, res) => {
  res.send("Server is up");
});

app.use("/api/v1/users", users);

const server = app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.ENVIRONMENT} mode on port ${PORT}`
  )
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
