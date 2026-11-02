
const express = require("express");
const cors = require("cors");
const studentDB = require("./database/studentDB");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "1mb" }));

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

      return callback(new Error("Origin not allowed by CORS"));
    },
    optionsSuccessStatus: 200,
  })
);

app.get("/", (req, res) => {
  res.json({
    name: "CampusDesk API",
    status: "running",
    endpoints: ["/students", "/attendance", "/results"],
  });
});

app.use("/students", require("./routes/studentRoutes"));
app.use("/attendance", require("./routes/attendanceRoutes"));
app.use("/results", require("./routes/resultRoutes"));

studentDB();

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running at ${port}`);
});
