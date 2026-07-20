import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL || "";

// Dla Next.js hot-reloads w trybie developerskim zapobiegamy wielokrotnemu nawiązywaniu połączeń
const globalForDb = global as unknown as {
  connection: mysql.Connection | undefined;
};

let connection;
if (process.env.NODE_ENV === "production") {
  connection = await mysql.createConnection(connectionString);
} else {
  if (!globalForDb.connection) {
    globalForDb.connection = await mysql.createConnection(connectionString);
  }
  connection = globalForDb.connection;
}

export const db = drizzle(connection, { schema, mode: "default" });
