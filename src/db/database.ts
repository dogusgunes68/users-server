import {
  db_host,
  db_port,
  db_name,
  db_user,
  db_password,
} from "../config/db_config";
import { Client } from "pg";

const database = new Client({
  user: db_user,
  host: db_host,
  database: db_name,
  password: db_password,
  port: db_port,
});

export { database };
