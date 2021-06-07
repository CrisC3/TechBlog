const router = require("express").Router();
const mainRoute = require("./mainRoute");

router.use("/", mainRoute);

module.exports = router;