import { Schema, model } from "mongoose";

interface ITodoSchema {
  title: string;
  description?: string;
  isCompelete: boolean;
  image?: string;
  uid: Schema.Types.ObjectId;
}

const TodoSchema = new Schema<ITodoSchema, {}>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: null,
    },
    isCompelete: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      default: null,
    },
    uid: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    }
  },
  {
    timestamps: true,
    toObject: {
      transform: function (doc, ret, option) {
        const id = ret._id;
        delete ret._id;
        delete ret.__v;
        return { id, ...ret };
      },
    },
  }
);

export const Todo = model("Todo", TodoSchema);
