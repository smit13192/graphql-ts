import { User } from "../model/user.model";
import { generateToken } from "../utils/generate_token";
import {
  TypeRequestBody,
  TypeResponseJson,
  ResponseType,
} from "../types/controller.types";

interface ICreateAccountBody {
  email: string;
  name: string;
  password: string;
}

interface ISignInBody {
  email: string;
  password: string;
}

const AuthController = {
  createAccount: async function (
    req: TypeRequestBody<ICreateAccountBody>,
    res: TypeResponseJson<ResponseType>
  ) {
    try {
      const data = req.body;
      const findUser = await User.findOne({
        $or: [{ email: data.email }, { name: data.name }],
      });
      if (findUser) {
        const response: ResponseType = {
          success: false,
          message: "Email or name already exist",
        };
        return res.status(401).json(response);
      }
      const user = new User(data);
      await user.save();
      const userData = user.toObject();
      const token = generateToken(user._id.toString());
      const response: ResponseType = {
        success: true,
        data: userData,
        message: "New User Created",
        token: token,
      };
      return res.json(response);
    } catch (e: any) {
      const response: ResponseType = { success: false, message: e.message };
      return res.status(400).json(response);
    }
  },

  signIn: async function (
    req: TypeRequestBody<ISignInBody>,
    res: TypeResponseJson<ResponseType>
  ) {
    try {
      const { email, password } = req.body;
      const findUser = await User.findOne({ email: email });
      if (!findUser) {
        const response: ResponseType = {
          success: false,
          message: "Email is not exist",
        };
        return res.status(401).json(response);
      }
      const isMatch = findUser.comparePassword(password);
      if (!isMatch) {
        const response: ResponseType = {
          success: false,
          message: "Password is wrong",
        };
        return res.status(401).json(response);
      }
      const userData = findUser.toObject();
      const token = generateToken(findUser._id.toString());
      const response: ResponseType = {
        success: true,
        data: userData,
        message: "SignIn successfully",
        token: token,
      };
      return res.json(response);
    } catch (e: any) {
      const response: ResponseType = { success: false, message: e.message };
      return res.status(400).json(response);
    }
  },
};

export default AuthController;
