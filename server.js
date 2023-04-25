// Import dependencies
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const cors = require("cors");
const logger = require("morgan");
const helmet = require("helmet");

// Import custom modules
const errorHandler = require("./middlewares/errors");
const routes = require("./routes");
const auth = require("./middlewares/auth");
const connectDB = require("./db/database");

// Load environment variables
require("dotenv").config();

// Connect to the database
connectDB();

// Serve static files from the public directory
app.use(express.static("public"));

// Middleware for parsing requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use other middleware
app.use(cors());
app.use(logger("dev"));
app.use(helmet());

// Use custom middleware
app.use("/api", auth.authorize);

// Set up routes
app.use(routes);

// Error handling middleware
app.use(errorHandler);

// Default route
app.get("/", function (req, res) {
  res.send("Backend is running successfully....");
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server listening on http://127.0.0.1:${PORT}`);
});
