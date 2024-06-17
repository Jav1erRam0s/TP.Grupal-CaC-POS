const mySql = require("mysql");

const connection = mySql.createConnection({
  host: process.env.HOST,
  port: process.env.API_PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASES,
});

connection.connect((err) => {
  if (err) {
    console.error("ERROR conectando a la base de datos", err);
    return;
  }
  console.log("Conectado EXITOSAMENTE a la base de datos");

  // USE DATABASE
  const sql = "USE point_of_sale";
  connection.query(sql, (err, result) => {
    if (err) throw err;
  });

});

module.exports = connection;
