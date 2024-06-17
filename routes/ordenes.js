const express = require("express");
const router = express.Router();
const ordenesController = require("../controller/ordenesController");

router.get("/", ordenesController.ReadAll);
router.get("/:id", ordenesController.ReadById);
router.post("/", ordenesController.Create);
router.put("/:id", ordenesController.Update);
router.delete("/:id", ordenesController.Delete);

module.exports = router;
