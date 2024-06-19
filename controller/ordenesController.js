const db = require("../db/db");

// ORDEN

const Create = (req, res) => {
  const { id_usuario, productos } = req.body;

  // creamos la orden
  const sqlOrden =
    "INSERT INTO orden ( numero_ticket, fecha, id_usuario ) VALUES ( UUID(), CURRENT_TIMESTAMP, ?)";

  db.query(sqlOrden, [id_usuario], (err, resultOrden) => {
    if (err) throw err;

    // creamos las orden-productos
    const sqlOP =
      "INSERT INTO orden_producto ( id_orden, id_producto, precio, unidades ) VALUES ( ?, ?, ?, ? )";

    productos.forEach((prod) => {
      db.query(
        sqlOP,
        [resultOrden.insertId, prod.id_producto, prod.precio, prod.unidades],
        (err, result) => {
          if (err) throw err;
        }
      );
    });

    res.json({
      mensaje: "Orden CREADA",
      idOrden: resultOrden.insertId,
    });
  });
};

const ReadAllByIdUsuario = (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT o.id AS id_orden, o.numero_ticket, DATE(o.fecha) AS fecha, TIME(o.fecha) AS hora, SUM(op.precio*op.unidades) AS total
    FROM orden o, producto p, orden_producto op 
    WHERE o.id_usuario = ? AND op.id_producto = p.id AND op.id_orden = o.id
    GROUP BY o.id;
  `;

  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.json(result);
  });
};

const ReadById = (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT o.id_usuario, o.id AS id_orden, op.id AS id_orden_producto, p.nombre, p.descripcion, p.codigo, op.precio, op.unidades 
    FROM orden o, producto p, orden_producto op 
    WHERE op.id_producto = p.id AND op.id_orden = o.id AND op.id_orden = ?;
  `;

  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.json(result);
  });
};

const Delete = (req, res) => {
  const { id } = req.params;

  const sqlOP = "DELETE FROM orden_producto WHERE id_orden = ?";

  db.query(sqlOP, [id], (err, result) => {
    if (err) throw err;

    const sqlO = "DELETE FROM orden WHERE id = ?";

    db.query(sqlO, [id], (err, result) => {
      if (err) throw err;
    });

    res.json({
      mensaje: "Orden ELIMINADA",
    });
  });
};

// ORDEN-PRODUCTO

const CreateProducto = (req, res) => {
  const { id } = req.params;
  const { id_producto, precio, unidades } = req.body;

  const sql =
    "INSERT INTO orden_producto ( id_orden, id_producto, precio, unidades ) VALUES ( ?, ?, ?, ? )";

  db.query(sql, [id, id_producto, precio, unidades], (err, result) => {
    if (err) throw err;

    res.json({
      mensaje: "Orden-Producto CREADO",
    });
  });
};

const UpdateProducto = (req, res) => {
  const { id } = req.params;
  const { unidades } = req.body;

  const sqlOrden = "UPDATE orden_producto SET unidades = ? WHERE id = ?";

  db.query(sqlOrden, [unidades, id], (err, result) => {
    if (err) throw err;

    res.json({
      mensaje: "Orden-Producto EDITADO",
    });
  });
};

const DeleteProducto = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM orden_producto WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) throw err;

    res.json({
      mensaje: "Orden-Producto ELIMINADO",
    });
  });
};

module.exports = {
  // ORDEN
  Create,
  ReadAllByIdUsuario,
  ReadById,
  Delete,
  // ORDEN-PRODUCTO
  CreateProducto,
  UpdateProducto,
  DeleteProducto,
};
