import { Todo } from "../../model/todo.model";
import { User } from "../../model/user.model";

const Type = {
  Todo: {
    user: async function (todo: any): Promise<any> {
      const user = await User.findById(todo.uid);
      return user?.toObject();
    },
  },
};

const Query = {
  getTodo: async function (_: any, params: any, context: any) {
    const { id } = context;
    if (id) {
      const todo = await Todo.find({ uid: id });
      return todo.map((e) => e.toObject());
    } else {
      throw new Error("User is not valid");
    }
  },
};

const Mutation = {
  createTodo: async function (
    _: any,
    params: { title: string; description?: string },
    context: any
  ) {
    const { id } = context;
    if (id) {
      const todo = new Todo({ uid: id, ...params });
      await todo.save();
      return todo.toObject();
    } else {
      throw new Error("User is not valid");
    }
  },
};

export const resolver = { Query, Type, Mutation };
