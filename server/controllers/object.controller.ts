import { Request, Response } from "express";
import Object from "../models/object.model";
import User from "../models/user.model";
import { Types } from "mongoose";
export const getObjects = async (req: Request, res: Response) => {
  try {
    const objects = await Object.find();
    res.status(200).json({ objects });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getObjectsByUser = async (req: Request, res: Response) => {
  const idUser = req.body.idUser;

  const user = await User.findById(idUser);
  if (!user) return res.status(400).json({ error: "User not found" });

  try {
    const objects = await Object.find({ by: idUser });
    res.status(200).json({ objects });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getObject = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const object = await Object.findById(id);
    res.status(200).json({ object });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const createObject = async (req: Request, res: Response) => {
  const { title, description, color, by } = req.body;

  if (!title || !description || !color || !by)
    return res.status(400).json({ error: "Missing fields" });

  const user = await User.findById(by);
  if (!user) return res.status(400).json({ error: "User not found" });

  try {
    const object = await Object.create({ title, description, color, by });
    res.status(201).json({ object });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateObject = async (req: Request, res: Response) => {
  if (!Types.ObjectId.isValid(req.params.id))
    return res.status(404).send("No object with that id");

  const { id } = req.params;

  const idUser = req.body.idUser;

  const user = await User.findById(idUser);
  if (!user) return res.status(400).json({ error: "User not found" });

  const { title, description, color } = req.body;
  try {
    await Object.findOneAndUpdate(
      { _id: id, by: idUser },
      { title, description, color }
    );
    res.status(200).json({ message: "Object updated" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteObject = async (req: Request, res: Response) => {
  if (!Types.ObjectId.isValid(req.params.id))
    return res.status(404).send("No object with that id");

  const { id } = req.params;

  const idUser = req.body.idUser;

  const user = await User.findById(idUser);
  if (!user) return res.status(400).json({ error: "User not found" });

  try {
    await Object.findOneAndDelete({ _id: id, by: idUser });
    res.status(200).json({ message: "Object deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
