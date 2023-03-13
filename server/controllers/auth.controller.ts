// Import Packages
import { Request, Response } from "express";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
// Configure dotenv
dotenv.config({
  path: "./database/.env",
});

// Get JWT token from .env file
const JWT_TOKEN: string = process.env.JWT_SECRET || "";

export const signup = async (req: Request, res: Response) => {
  // Check if name, email and password are filled
  const { name, email, password } = req.body;
  try {
    // Create a new user
    const user = await User.create({ name, email, password });
    // Create a JWT token
    const token = jwt.sign({ id: user._id }, JWT_TOKEN, {
      expiresIn: "1h",
    });
    res.cookie("jwt", token, { httpOnly: true, maxAge: 3600000 });
    res.status(201).json({ user: user._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  // Check if email and password are filled
  const { email, password } = req.body;

  try {
    // Check if user exists and password is correct
    const user = await User.login(email, password);
    // Create a JWT token
    const token = jwt.sign({ id: user._id }, JWT_TOKEN, {
      expiresIn: "1h",
    });
    res.cookie("jwt", token, { httpOnly: true, maxAge: 3600000 });
    res.status(200).json({ user: user._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
