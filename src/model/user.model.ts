import { Schema, model } from "mongoose";
import { compareHash, hashPassword } from "../utils/hash";

interface IUserSchema {
  name: string;
  email: string;
  password: string;
  image?: string;
}
interface IUserMethods {
  comparePassword: (encryptPassword: string) => boolean;
}

const UserSchema = new Schema<IUserSchema, {}, IUserMethods>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    toObject: {
      transform: function (_, ret, __) {
        const id = ret._id;
        delete ret._id;
        delete ret.__v;
        return { id, ...ret };
      },
    },
  }
);

UserSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    this.password = hashPassword(this.password);
  }
  next();
});

UserSchema.methods.comparePassword = function comparePassword(
  encryptPassword: string
): boolean {
  return compareHash(encryptPassword, this.password);
};

export const User = model("User", UserSchema);
