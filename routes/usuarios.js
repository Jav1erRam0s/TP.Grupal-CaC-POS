const express = require("express");
const router = express.Router();
const usuariosController = require("../controller/usuariosController");

router.get("/", usuariosController.ReadAll);        // R
router.get("/:id", usuariosController.ReadById);    // R

module.exports = router;
