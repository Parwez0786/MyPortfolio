require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const projectRoutes = require("./routes/projects");
const resumeRoutes = require("./routes/resume");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

const clientUrl = (process.env.CLIENT_URL || "").trim();
app.use(
  cors({
    origin: clientUrl ? [clientUrl, "http://localhost:3000"] : true,
    credentials: false,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Portfolio API is running" });
});

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/resume", resumeRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  if (err.name === "MulterError") {
    return res.status(400).json({
      message:
        err.code === "LIMIT_UNEXPECTED_FILE"
          ? "Unexpected file field. Use images for uploads."
          : err.message,
    });
  }
  res.status(err.status || 500).json({
    message: err.message || "Server error",
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
