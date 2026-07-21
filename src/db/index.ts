import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import "dotenv/config";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL || "";

// Dla Next.js hot-reloads w trybie developerskim zapobiegamy wielokrotnemu nawiązywaniu połączeń
const globalForDb = global as unknown as {
  connection: mysql.Pool | undefined;
};

const connection = globalForDb.connection ?? mysql.createPool(connectionString);

if (process.env.NODE_ENV !== "production") {
  globalForDb.connection = connection;
}

export const db = drizzle(connection, { schema, mode: "default" });
