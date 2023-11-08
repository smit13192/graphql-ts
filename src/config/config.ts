import { config } from "dotenv";
config();

export const PORT: number = Number(process.env.PORT as string);
export const DB_CONNECT_LOCAL: string = process.env.DB_CONNECT_LOCAL as string;
export const DB_CONNECT: string = process.env.DB_CONNECT as string;
export const SECRET_KEY: string = process.env.SECRET_KEY as string;
