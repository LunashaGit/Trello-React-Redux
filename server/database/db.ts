// Import Packages
import mongoose from "mongoose";
import dotenv from "dotenv";

// Import .Env
dotenv.config({
  path: "./database/.env",
});

// Config Variables for DB
const USER: string = process.env.USER || "";
const PASSWORD: string = process.env.PASSWORD || "";

// Connect to DB
const connectDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose
      .connect(
        "mongodb+srv://" +
          `${USER}:${PASSWORD}` +
          "@cluster.cjtyzww.mongodb.net/"
      )
      .then(() => console.log("MongoDB Connected"));
  } catch (error) {
    // Catch Error -> Return the error
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
