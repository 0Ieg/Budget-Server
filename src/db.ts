import { Pool } from "pg";

export const db = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'budget',
  user: 'postgres',
  password: 'postgres'
})