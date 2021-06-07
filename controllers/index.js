// Local variables to call on packages
const router = require("express").Router();

// Local variables to call another JS file
const mainRoute = require("./mainRoute");

// Enable router to use path
router.use("/", mainRoute);

// Export
module.exports = router;