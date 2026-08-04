const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

// Config & Middleware
const { connectDB } = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

// Routes
const apiRoutes = require("./routes"); // Bindet routes/index.js ein
const documentRoutes = require("./routes/documentRoutes"); // Geändert von import zu require
const languageRoutes = require("./routes/languageRoutes");
const contactRoutes = require('./routes/contactRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Datenbankverbindung initialisieren
connectDB();

const clientUrl = process.env.CLIENT_URL ? process.env.CLIENT_URL.replace(/\/$/, "") : null;

// --- Global Middlewares ---
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "http://localhost",
  "http://192.168.1.130",
  "http://192.168.1.130:80",
  clientUrl,
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Erlaubt Requests ohne Origin (z.B. Server-to-Server, Postman) 
    // oder wenn die Origin in den allowedOrigins vorkommt
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("CORS blockiert für Origin:", origin);
      callback(new Error("Nicht erlaubt durch CORS"));
    }
  },
  credentials: true
}));


app.use(express.json());

// --- Statische Dateien (Bilder, Flaggen etc.) ---
app.use("/projects", express.static(path.join(__dirname, "public/projects")));
app.use("/flags", express.static(path.join(__dirname, "public/flags")));

// --- API Routes ---
app.use("/api", apiRoutes); // Master-Router (enthält idealerweise projects & auth)
app.use("/api/documents", documentRoutes);
app.use("/api/languages", languageRoutes);
app.use('/api/contact', contactRoutes);

// Health-Check Endpunkt (sehr nützlich für Server-Monitoring & Self-Hosting)
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date() });
});

// Centralized Error Handling Middleware (MUSS als letztes eingebunden werden)
app.use(errorHandler);

// --- Server Start ---
app.listen(PORT, () => {
  console.log(
    `Backend läuft erfolgreich im ${process.env.NODE_ENV || "development"} Modus auf Port ${PORT}`
  );
});