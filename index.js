// ----- SERVIDOR ESTATICO CON EXPRESS -----

require("dotenv").config();
const express = require("express");

const app = express();
let port = process.env.PORT;

const usuariosRouter = require("./routes/usuarios");
const productosRouter = require("./routes/productos");
const ordenesRouter = require("./routes/ordenes");

app.use(express.json());

app.use("/users", usuariosRouter);
app.use("/products", productosRouter);
app.use("/orders", ordenesRouter);

app.get("/", (req, res) => {
  res.send(`Hola desde el localhost:${port}`);
});

app.listen(port, () => {
  console.log(`Servidor ejecutandose en el puerto ${port}`);
});
