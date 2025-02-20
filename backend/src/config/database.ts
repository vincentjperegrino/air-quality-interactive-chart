import knex from "knex";
import knexfile from "../../knexfile";

const config = knexfile as import("knex").Knex.Config;
const db = knex(config);

export default db;
