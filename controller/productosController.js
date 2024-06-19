const db = require("../db/db");

const Create = (req, res) => {
  const { nombre, descripcion, imagen, precio, codigo } = req.body;

  const sql =
    "INSERT INTO producto ( nombre, descripcion, imagen, precio, codigo ) VALUES ( ?, ?, ?, ?, ? )";

  db.query(sql, [nombre, descripcion, imagen, precio, codigo], (err, result) => {
    if (err) throw err;

    res.json({
      mensaje: "Producto CREADO",
      idUsuario: result.insertId,
    });
  });
};

const ReadAll = (req, res) => {
  const sql = "SELECT * FROM producto";

  db.query(sql, (err, result) => {
    if (err) throw err;

    res.json(result);
  });
};

const ReadById = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM producto WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.json(result);
  });
};

const Update = (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, imagen, precio, codigo } = req.body;

  const sql =
    "UPDATE producto SET nombre = ?, descripcion = ?, imagen = ? , precio = ?, codigo = ? WHERE id = ?";

  db.query(sql, [nombre, descripcion, imagen, precio, codigo, id], (err, result) => {
    if (err) throw err;

    res.json({
      mensaje: "Producto EDITADO",
    });
  });
};

const Delete = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM producto WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) throw err;

    res.json({
      mensaje: "Producto ELIMINADO",
    });
  });
};

module.exports = {
  Create,
  ReadAll,
  ReadById,
  Update,
  Delete,
};
