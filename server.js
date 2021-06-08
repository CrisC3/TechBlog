// Local variables to call on packages
const express = require("express");
const sequelize = require("./config/connection");
const routes = require('./controllers');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');

// Local declare variables
const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Require for POST method
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use to load static files from the local public folder
app.use(express.static("public"));

// Set to use the [Routes]
app.use(routes);

// Call to sequelize and start application
sequelize.sync({ force: false})
.then(() => {
    app.listen(PORT, () => console.log("Listening on http://localhost:" + PORT));
});