// Local variables to call on packages
const router = require("express").Router();

// Local variables to call another JS file
const mainRoute = require("./mainRoutes");
const apiRoutes = require('./api');

// Enable router to use path
router.use("/", mainRoute);
router.use('/api', apiRoutes);

// Export
module.exports = router;