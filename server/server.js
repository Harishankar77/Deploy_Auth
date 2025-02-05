import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import path from "path";

const app = express();
const port = process.env.PORT || 4000;

const DIRNAME = path.resolve();

// Connect to Database
connectDB();

// ✅ Fix: Allow frontend to access backend
const allowedOrigins = ["http://localhost:5173"];
app.use(
  cors({
    origin: allowedOrigins, // ✅ Corrected the allowed origin
    credentials: true, // ✅ Allows cookies to be sent
    methods: ["GET", "POST", "PUT", "DELETE"], // ✅ Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // ✅ Allowed headers
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

app.use(express.static(path.join(DIRNAME, "/client/dist")));
app.use("*", (_, res) => {
  res.sendFile(path.resolve(DIRNAME, "client", "dist", "index.html"));
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on PORT: ${port}`);
});
