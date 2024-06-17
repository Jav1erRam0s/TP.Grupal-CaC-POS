const express = require("express");
const router = express.Router();
const productosController = require("../controller/productosController");

router.get("/", productosController.ReadAll);
router.get("/:id", productosController.ReadById);
router.post("/", productosController.Create);
router.put("/:id", productosController.Update);
router.delete("/:id", productosController.Delete);

module.exports = router;
