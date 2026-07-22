const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { connectDB } = require("./config/db");
const apiRoutes = require("./routes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 5000;

// Datenbankverbindung initialisieren
connectDB();

// Global Middlewares
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "http://localhost",
  process.env.CLIENT_URL, // Liest https://deine-domain.ch aus der .env
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Erlaube Anfragen ohne Origin (z. B. Postman, Server-to-Server)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("CORS nicht erlaubt für diese Origin: " + origin));
      }
    },
    credentials: true,
  }),
);
app.use(express.json());

// API Routes
app.use("/api", apiRoutes);
app.use("/projects", express.static("public/projects"));
app.use("/documents", express.static("public/documents"));

// Health-Check Endpunkt (sehr nützlich für Server-Monitoring & Self-Hosting)
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date() });
});

// Centralized Error Handling Middleware (MUSS als letztes eingebunden werden)
app.use(errorHandler);

// Server Start
app.listen(PORT, () => {
  console.log(
    `Backend läuft erfolgreich im ${process.env.NODE_ENV || "development"} Modus auf Port ${PORT}`,
  );
});
