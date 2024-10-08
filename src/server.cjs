const express = require("express");
const path = require("path");
const http = require("http");
const { exec } = require("child_process");

// __dirname을 얻기 위한 코드
const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => res.render("home"));

const server = http.createServer(app);

const openBrowser = () => {
  const start =
    process.platform === "win32"
      ? "start"
      : process.platform === "darwin"
      ? "open"
      : "xdg-open";
  exec(`${start} http://localhost:3033`, (error) => {
    if (error) {
      console.error(`Failed to open browser: ${error}`);
    }
  });
};

const handleListen = () => {
  console.log("Listening on http://localhost:3033");
  openBrowser();
};

server.listen(3033, handleListen);
