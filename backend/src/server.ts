import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database";
import experiencesRouter from "./routes/experiences";
import bookingsRouter from "./routes/bookings";
import promoRouter from "./routes/promo";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://bookit-hdassignment.onrender.com",
  "https://bookit-hdassignment.onrender.com/",
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      const normalizedOrigin = origin.replace(/\/$/, "");
      const isAllowed = allowedOrigins.some(
        (allowed) => allowed && allowed.replace(/\/$/, "") === normalizedOrigin
      );

      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Content-Length", "X-Request-Id"],
    maxAge: 600,
  })
);
app.use(express.json());

app.use("/api/experiences", experiencesRouter);
app.use("/api/bookings", bookingsRouter);
app.use("/api/promo", promoRouter);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "BookIt API is running" });
});

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to start server:", error);
    process.exit(1);
  }
};

startServer();
