import mongoose, { Schema, Document, Model } from "mongoose";

interface IObject {
  title: string;
  description: string;
  color: string;
  by: string;
}

interface IObjectDocument extends IObject, Document {}

const userSchema: Schema<IObjectDocument> = new Schema(
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

const UserModel: Model<IObjectDocument> = mongoose.model("Object", userSchema);

export default UserModel;
