import dotenv from "dotenv";
dotenv.config();

export const db_host = String("localhost");
export const db_port = Number(5432);
export const db_name = String(process.env.DB_NAME || "usersdb");
export const db_user = String(process.env.DB_USER || "root");
export const db_password = String(process.env.DB_PASSWORD || "root");
