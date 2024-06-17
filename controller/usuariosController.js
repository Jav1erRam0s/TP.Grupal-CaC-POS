const db = require("../db/db");

const ReadAll = (req, res) => {
  const sql = "SELECT * FROM usuario";

  db.query(sql, (err, result) => {
    if (err) throw err;

    res.json(result);
  });
};

const ReadById = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM usuario WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.json(result);
  });
};

module.exports = {
  ReadAll,
  ReadById,
};
