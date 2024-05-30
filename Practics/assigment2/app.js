const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

// Define a route to list directory contents
app.get("/contents", (req, res) => {
  const directoryPath = req.query.path; // Default to current directory if path not provided
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).send({ error: `Error reading directory: ${err}` });
    }

    const directories = [];
    const filesList = [];

    files.forEach((file) => {
      const filePath = path.join(directoryPath, file);
      const stats = fs.statSync(filePath);
      if (stats.isDirectory()) {
        directories.push(file);
      } else {
        filesList.push(file);
      }
    });

    res.json({ directories,filesList });
  });
});

// Start the server
const port = 6598;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
