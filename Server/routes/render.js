const express = require("express");
const router = express.Router();
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

router.post("/", (req, res) => {
  // Save JSON input to temp/arch.json
  const tempDir = path.join(__dirname, "..", "temp");
  if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);
  const jsonPath = path.join(tempDir, "arch.json");
  fs.writeFileSync(jsonPath, JSON.stringify(req.body, null, 2));

  // Use absolute path for the JSON file
  const absJsonPath = path.resolve(jsonPath);

  exec(`python scripts/generate.py "${absJsonPath}"`, (err, stdout, stderr) => {
    console.log("STDOUT:\n", stdout);
    console.log("STDERR:\n", stderr);
    if (err) {
      console.error("ERROR OCCURRED:", err);
      return res.status(500).json({
        error: "Generation failed",
        details: `err: ${err}\nstdout: ${stdout}\nstderr: ${stderr}`,
      });
    }
    return res.json({ imageUrl: "/outputs/main.png" });
  });
});

module.exports = router;
