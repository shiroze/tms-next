import { Sequelize } from "sequelize";

interface DBConfig {
  dbname: string;
  user: string;
  password: string;
  host: string;
}

const dbConfig: DBConfig = {
  dbname: process.env.DB_NAME || "db_sis",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  host: process.env.DB_HOST || "127.0.0.1",
};

const db = new Sequelize("db_sis", "root", "", {
  host: '127.0.0.1',
  dialect: 'mariadb'
});

export default db;