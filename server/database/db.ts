import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({
  path: "./database/.env",
});

const USER: string = process.env.USER || "";
const PASSWORD: string = process.env.PASSWORD || "";
const connectDB = async () => {
  try {
    await mongoose
      .connect(
        "mongodb+srv://" +
          `${USER}:${PASSWORD}` +
          "@cluster.cjtyzww.mongodb.net/"
      )
      .then(() => console.log("MongoDB Connected"));
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
