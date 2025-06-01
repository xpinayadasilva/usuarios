import "dotenv/config";
import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "2808",
  database: "db_souvenirs",
  port: 5432,
  allowExitOnIdle: true,
});

export default pool;