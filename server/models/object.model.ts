// Import Packages
import mongoose, { Schema, Document, Model } from "mongoose";

// Create Object Interface ( Types )
interface IObject {
  title: string;
  description: string;
  color: string;
  by: string;
}

// Create Object Document
interface IObjectDocument extends IObject, Document {}

// Create Object Schema
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

// Create Object Model in the Database
const ObjectModel: Model<IObjectDocument> = mongoose.model(
  "Object",
  ObjectSchema
);

export default ObjectModel;
