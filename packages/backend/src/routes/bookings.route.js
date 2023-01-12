const express = require("express");
const router = express.Router();
const controller = require("../controllers/bookings.controller");

router.get("/", controller.list);
router.get("/:id", controller.get);
router.post("/", controller.create);
router.delete("/:id", controller.remove);

module.exports = router;
