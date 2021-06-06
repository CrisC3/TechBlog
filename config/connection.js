// Require for environment variables
require("dotenv").config();

// Local variables
const Sequelize = require("sequelize");
const jawsDbUrl = process.env.JAWSDB_URL;
let sequelize;

// Check if environment has JawsDB available
if (jawsDbUrl) {

    // Assigns variable to use JawsDB
    sequelize = new Sequelize(jawsDbUrl);

} else {

    // Assigns variable to use local
    // MySQL and instantiate Sequelize
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PW,
        {
            host: "localhost",
            dialect: "mysql",
            port: 3306
        }
    );
}

module.exports = sequelize;