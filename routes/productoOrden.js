const express = require("express");
const router = express.Router();
const productoOrdenController = require("../controller/productoOrdenController");

router.get("/", productoOrdenController.ReadAll);
router.get("/:id", productoOrdenController.ReadById);
router.post("/", productoOrdenController.Create);
router.put("/:id", productoOrdenController.Update);
router.delete("/:id", productoOrdenController.Delete);

module.exports = router;
