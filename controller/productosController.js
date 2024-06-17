const db = require("../db/db");

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

const Create = (req, res) => {
  const { nombre, descripcion, imagen, precio, codigo } = req.body;

  const sql =
    "INSERT INTO producto ( nombre, descripcion, imagen, precio, codigo ) VALUES ( ?, ?, ?, ?, ? )";

  db.query(sql, [nombre, descripcion, imagen, precio, codigo], (err, result) => {
    if (err) throw err;

    res.json({
      mensaje: "Usuario Creado con EXITO",
      idUsuario: result.insertId,
    });
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
      mensaje: "producto EDITADO",
    });
  });
};

const Delete = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM producto WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) throw err;

    res.json({
      mensaje: "producto ELIMINADO con EXITO",
    });
  });
};

module.exports = {
  ReadAll,
  ReadById,
  Create,
  Update,
  Delete,
};
