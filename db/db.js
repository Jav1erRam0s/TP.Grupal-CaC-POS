const mySql = require("mysql");

const connection = mySql.createConnection({
  host: process.env.HOST,
  port: process.env.API_PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

connection.connect((err) => {
  if (err) {
    console.error("ERROR conectando a la base de datos", err);
    return;
  }
  console.log("Conectado EXITOSAMENTE a la base de datos");
});

module.exports = connection;
