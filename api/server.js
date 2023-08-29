const express = require("express");
const server = express();
const Router = require("./starwars/starwars-router");
server.use(express.json());

server.get("/", (req, res) => {
  res.json({ message: "Hey, server is up and running..." });
});
server.use("/api/starwars", Router);

module.exports = server;
