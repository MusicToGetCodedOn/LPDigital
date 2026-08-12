const express = require("express");
const cors = require("cors");
const path = require("path");
const rateLimit = require("express-rate-limit");
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
app.set("trust proxy", 1);
const PORT = process.env.PORT || 5000;
const helmet = require("helmet");

// Datenbankverbindung initialisieren
connectDB();

const clientUrl = process.env.CLIENT_URL ? process.env.CLIENT_URL.replace(/\/$/, "") : null;

// --- Rate Limiting ---
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 Minuten
  max: 100, // Maximal 100 Anfragen pro IP
  message: "Zu viele Anfragen von dieser IP, bitte später erneut versuchen."
});

// --- Global Middlewares ---
const allowedOrigins = [
  "http://192.168.1.130",
  "http://192.168.1.130:80",
  'https://lpdigital.ch',
  'https://www.lpdigital.ch',
  clientUrl,
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS Error: Origin nicht erlaubt.'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));



app.use(express.json());

// --- Security stuff ---

app.use(helmet({
  crossOriginResourcePolicy: {policy: "cross-origin"},
  crossOriginEmbedderPolicy: false, 
}
));
app.use(express.json({ limit: "10kb" }));
app.use(limiter);


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