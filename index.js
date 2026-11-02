
const express = require("express");
const cors = require("cors");
const studentDB = require("./database/studentDB");

const app = express();

// Render automatically provides PORT
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "1mb" }));

// CORS configuration
const allowedOrigins = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(
        new Error(`CORS blocked for origin: ${origin}`)
      );
    },
    optionsSuccessStatus: 200,
  })
);

// Health check route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    name: "CampusDesk API",
    status: "running",
    message: "Backend server is working successfully",
    endpoints: {
      students: "/students",
      attendance: "/attendance",
      results: "/results",
    },
  });
});

// API routes
app.use("/students", require("./routes/studentRoutes"));
app.use("/attendance", require("./routes/attendanceRoutes"));
app.use("/results", require("./routes/resultRoutes"));

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found",
    requestedUrl: req.originalUrl,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Server error:", err.message);

  if (res.headersSent) {
    return next(err);
  }

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

// Connect MongoDB and start server
studentDB();

app.listen(PORT, "0.0.0.0", () => {
  console.log(`CampusDesk API is running on port ${PORT}`);
});
