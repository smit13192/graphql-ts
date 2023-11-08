import mongoose from "mongoose";
import { DB_CONNECT_LOCAL } from "../config/config";

export default function databaseConnect() {
  mongoose
    .connect(DB_CONNECT_LOCAL)
    .then(() => {
      console.log("Database connect 📅");
    })
    .catch((e) => {
      console.log(e);
    });
}
