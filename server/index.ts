// Import Packages
import dotenv from "dotenv";
import express, { Express } from "express";
dotenv.config({
  path: "./database/.env",
});
import connectDB from "./database/db";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes";
import objectRoutes from "./routes/object.routes";

// Init Server
const app: Express = express();
// Configure CORS
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};
// Configure Params
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
// Connect to DB
connectDB();
// Debug / Test
app.get("/", (req, res) => {
  res.send("Hello World!");
});
// Routes User
app.use("/api/user", userRoutes);
// Routes Object
app.use("/api/object", objectRoutes);
// Listen to Server
app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
