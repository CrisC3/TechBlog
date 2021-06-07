// Local variables to call on packages
const express = require("express");
const sequelize = require("./config/connection");
const routes = require('./controllers');

// Local declare variables
const app = express();
const PORT = process.env.PORT || 3001;

// Set to use the [Routes]
app.use(routes);

// Call to sequelize and start application
sequelize.sync({ force: false})
.then(() => {
    app.listen(PORT, () => console.log("Listening on http://localhost:" + PORT));
});