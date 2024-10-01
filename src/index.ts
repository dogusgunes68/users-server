import { database } from "./db/database";
import dotenv from "dotenv";
import { app } from "./app";
import path from "path";
import fs from "fs";
import { addMockData } from "./db/mock-service";

dotenv.config();

const start = async () => {
  if (!process.env.DB_NAME) {
    throw new Error("DB_NAME is required");
  }
  if (!process.env.DB_USER) {
    throw new Error("DB_USER is required");
  }
  if (!process.env.DB_PASSWORD) {
    throw new Error("DB_PASSWORD is required");
  }

  try {
    console.log("Connecting to PostgreSQL");
    await database.connect();
    console.log("Connected to PostgreSQL");

    const sqlFilePath = path.join(__dirname, "./db/setup.sql");
    const sql = fs.readFileSync(sqlFilePath, "utf8");

    await database.query(sql);
    console.log("Database and tables created successfully!");

    await addMockData();
  } catch (error) {
    console.log(error);
  }

  app.listen(2000, () => console.log("Listening on port 2000"));
};

start();
