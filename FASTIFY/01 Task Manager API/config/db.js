import fastifyPostgres from "@fastify/postgres";
import { Pool } from "pg";
import { config } from "dotenv";
config();

export default async function db(fastify) {
  fastify.register(fastifyPostgres, {
    connectionString: process.env.DATABASE_URL,
  });
}

export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
