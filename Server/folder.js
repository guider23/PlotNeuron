// init.js
const fs = require("fs");
const path = require("path");

const folders = [
  "plotter",
  "plotter/PlotNeuralNet",
  "plotter/output",
  "scripts",
  "routes",
  "utils"
];

folders.forEach(dir => {
  const fullPath = path.join(__dirname, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`✅ Created folder: ${dir}`);
  }
});

// Create empty nn_architecture.py
fs.writeFileSync("plotter/nn_architecture.py", "# Auto-generated neural net file\n");

// Create empty placeholder files
fs.writeFileSync("scripts/generate.py", "# generate.py placeholder\n");
fs.writeFileSync("routes/render.js", "// render route\n");
fs.writeFileSync("utils/generatePy.js", "// generatePy util\n");

console.log("✅ Structure ready. Now clone PlotNeuralNet repo into plotter/PlotNeuralNet/");
