import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "@shared/schema";
import { ensureEnvLoaded } from "./env";

ensureEnvLoaded();

const connectionString = process.env.DATABASE_URL;

export const hasDatabaseUrl = Boolean(connectionString);
export const pool = connectionString ? new Pool({ connectionString }) : null;
export const db = pool ? drizzle(pool, { schema }) : null;
