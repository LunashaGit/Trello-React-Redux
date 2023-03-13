import mongoose, { Schema, Document, Model } from "mongoose";

interface IObject {
  title: string;
  description: string;
  color: string;
  by: string;
}

interface IObjectDocument extends IObject, Document {}

const ObjectSchema: Schema<IObjectDocument> = new Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 55,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      lowercase: true,
      maxLength: 1024,
      trim: true,
    },
    color: {
      type: String,
      required: true,
    },
    by: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ObjectModel: Model<IObjectDocument> = mongoose.model(
  "Object",
  ObjectSchema
);

export default ObjectModel;
