require("dotenv").config();
module.exports = {
  development: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: "3306",
    dialect: "mysql",
    logging: false,
  },
  test: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: "3306",
    dialect: "mysql",
    logging: false,
  },
  production: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: "3306",
    dialect: "mysql",
    logging: false,
  },
};
