// ----- SERVIDOR ESTATICO CON EXPRESS -----

require("dotenv").config();

let port = process.env.PORT;

const path = require('path');
const express = require("express");

const usuariosRouter = require("./routes/usuarios");
const productosRouter = require("./routes/productos");
const ordenesRouter = require("./routes/ordenes");


const app = express();
app.use(express.json());

app.use("/users", usuariosRouter);
app.use("/products", productosRouter);
app.use("/orders", ordenesRouter);

// app.get("/", (req, res) => {
//   res.send(`Hola desde el localhost:${port}`);
// });

app.use(express.static(path.join(__dirname,'public')));

app.listen(port, () => {
  console.log(`Servidor ejecutandose en el puerto ${port}`);
});
