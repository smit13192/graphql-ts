import { TypeRequestBody } from "../types/controller.types";
import fs from "fs";

export async function urlMiddleware(
  req: TypeRequestBody<any>,
  _: any,
  next: any
) {
  fs.appendFileSync("url.txt", `${req.url}\n`);
  next();
}
