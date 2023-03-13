import mongoose, { Schema, Document, Model } from "mongoose";
import isEmail from "validator/lib/isEmail";
import bcrypt from "bcrypt";

interface IUser {
  name: string;
  email: string;
  password: string;
}

interface IUserDocument extends IUser, Document {}

interface IUserModel extends Model<IUserDocument> {
  login: (email: string, password: string) => Promise<IUserDocument>;
}

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
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (email: string, password: string) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

const UserModel = mongoose.model<IUserDocument, IUserModel>("user", userSchema);

export default UserModel;
