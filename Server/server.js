// server.js
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use("/outputs", express.static(path.join(__dirname, "plotter/output")));

const renderRoute = require("./routes/render");
app.use("/generate", renderRoute);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
