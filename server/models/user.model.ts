// Import Packages
import mongoose, { Schema, Document, Model } from "mongoose";
import isEmail from "validator/lib/isEmail";
import bcrypt from "bcrypt";

// Create User Interface ( Types )
interface IUser {
  name: string;
  email: string;
  password: string;
}

// Create User Document
interface IUserDocument extends IUser, Document {}

// Create User Model & Promise
interface IUserModel extends Model<IUserDocument> {
  login: (email: string, password: string) => Promise<IUserDocument>;
}

// Create User Schema
const userSchema: Schema<IUserDocument> = new Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 55,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail],
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      minlength: 6,
    },
  },
  {
    timestamps: true,
  }
);

// Hash when Create the user
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Login User
userSchema.statics.login = async function (email: string, password: string) {
  // Search User by Email
  const user = await this.findOne({ email });
  if (user) {
    // Compare Password with Hashed Password
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    // If Password is incorrect
    throw Error("incorrect password");
  }
  // If Email is incorrect
  throw Error("incorrect email");
};

// Create User Model in the Database
const UserModel = mongoose.model<IUserDocument, IUserModel>("user", userSchema);

export default UserModel;
