const express = require("express");
const router = express.Router();
const ordenesController = require("../controller/ordenesController");

// ORDEN
router.post("/", ordenesController.Create);                         // C
router.get("/user/:id", ordenesController.ReadAllByIdUsuario);      // R
router.get("/:id", ordenesController.ReadById);                     // R
router.delete("/:id", ordenesController.Delete);                    // D

// ORDEN-PRODUCTO
router.post("/:id", ordenesController.CreateProducto);              // U
router.put("/product/:id", ordenesController.UpdateProducto);       // U
router.delete("/product/:id", ordenesController.DeleteProducto);    // U

module.exports = router;
