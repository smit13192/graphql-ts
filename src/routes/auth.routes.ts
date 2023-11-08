import { Router } from "express";
import AuthController from "../controller/auth.controller";

const authRouter = Router();
authRouter.post("/createAccount", AuthController.createAccount);
authRouter.post("/signIn", AuthController.signIn);

export default authRouter;
