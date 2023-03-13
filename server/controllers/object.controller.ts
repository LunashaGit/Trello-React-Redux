// Import Packages
import { Request, Response } from "express";
import Object from "../models/object.model";
import User from "../models/user.model";
import { Types } from "mongoose";

// Get all objects from the database
export const getObjects = async (req: Request, res: Response) => {
  try {
    // Check if objects exist
    const objects = await Object.find();
    res.status(200).json({ objects });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all objects from a specific user
export const getObjectsByUser = async (req: Request, res: Response) => {
  const idUser = req.body.by;

  // Check if user exists
  const user = await User.findById(idUser);
  if (!user) return res.status(400).json({ error: "User not found" });

  try {
    // Check if objects exist for the user
    const objects = await Object.find({ by: idUser });
    res.status(200).json({ objects });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a specific object from the database
export const getObject = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // Check if object exists
    const object = await Object.findById(id);
    res.status(200).json({ object });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Create a new object in the database for the user
export const createObject = async (req: Request, res: Response) => {
  const { title, description, color, by } = req.body;

  // Check if all fields are filled
  if (!title || !description || !color || !by)
    return res.status(400).json({ error: "Missing fields" });

  // Check if user exists
  const user = await User.findById(by);
  if (!user) return res.status(400).json({ error: "User not found" });

  try {
    // Create object
    const object = await Object.create({ title, description, color, by });
    res.status(201).json({ object });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a specific object from the database for the user
export const updateObject = async (req: Request, res: Response) => {
  // Check if object exists
  if (!Types.ObjectId.isValid(req.params.id))
    return res.status(404).send("No object with that id");

  const { id } = req.params;

  const idUser = req.body.by;

  // Get ID of the user & check if exist
  const user = await User.findOne({
    _id: idUser,
  });

  // Return error if user not found
  if (!user) return res.status(400).json({ error: "User not found" });

  const { title, description, color } = req.body;
  try {
    // Update object by ID and user ID
    await Object.findOneAndUpdate(
      { _id: id, by: idUser },
      { title, description, color }
    );
    res.status(200).json({ message: "Object updated" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a specific object from the database for the user
export const deleteObject = async (req: Request, res: Response) => {
  if (!Types.ObjectId.isValid(req.params.id))
    return res.status(404).send("No object with that id");

  const { id } = req.params;

  const idUser = req.body.by;

  // Check if user exists
  const user = await User.findById(idUser);
  // Return error if user not found
  if (!user) return res.status(400).json({ error: "User not found" });

  try {
    // Delete object by ID and user ID
    await Object.findOneAndDelete({ _id: id, by: idUser });
    res.status(200).json({ message: "Object deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
