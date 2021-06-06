// Local variables to call on packages
const express = require("express");
const sequelize = require("./config/connection");

// Local declare variables
const app = express();
const PORT = process.env.PORT || 3001;

// Call to sequelize and start application
sequelize.sync({ force: false})
.then(() => {
    app.listen(PORT, () => console.log("Listening on http://localhost:" + PORT));
});