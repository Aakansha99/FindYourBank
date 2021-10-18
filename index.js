const http = require("http");
const path = require("path");
const express = require("express");
const port = process.env.PORT || 3000;
let wss;
let server;
const app = express();
app.use(express.static(path.join(__dirname, "./build")));

server = new http.createServer(app);

server.on("error", (err) => console.log("Server error:", err));
server.listen(port);
