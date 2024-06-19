const express = require("express");
const router = express.Router();
const productosController = require("../controller/productosController");

router.post("/", productosController.Create);       // C
router.get("/", productosController.ReadAll);       // R
router.get("/:id", productosController.ReadById);   // R
router.put("/:id", productosController.Update);     // U
router.delete("/:id", productosController.Delete);  // D

module.exports = router;
