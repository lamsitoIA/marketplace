import "dotenv/config";

let host;
let user;
let password;
let database;
let port;

/* if (process.env.NODE_ENV === "development") {
  host = process.env.DB_HOST;
  user = process.env.DB_USER;
  password = process.env.DB_PASSWORD;
  database = process.env.DB_NAME;
  port = process.env.DB_PORT
} */
/* if (process.env.NODE_ENV === "test") {
  host = process.env.DB_HOST;
  user = process.env.DB_USER;
  password = process.env.DB_PASSWORD;
  database = process.env.DB_NAME_TEST;
  port = process.env.DB_PORT;
} */if (process.env.NODE_ENV === "production" ) {
  host = process.env.DB_HOST_PROD;
  user = process.env.DB_USER_PROD;
  password = process.env.DB_PASSWORD_PROD;
  database = process.env.DB_NAME_PROD;
  port = process.env.DB_PORT_PROD;
}

export { host, user, password, database, port };
