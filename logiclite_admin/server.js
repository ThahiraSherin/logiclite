const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 10000; // Render sets PORT env variable

// Serve static files from the React build folder
app.use(express.static(path.join(__dirname, "build")));

// Handle all other routes by serving index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});