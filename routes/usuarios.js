const express = require("express");
const router = express.Router();
const usuariosController = require("../controller/usuariosController");

router.get("/", usuariosController.ReadAll);
router.get("/:id", usuariosController.ReadById);

module.exports = router;
