const sequelize = require("../config/connection");
const { User, Blog, Comment } = require("../models");

const userData = require('./userData.json');

const seedDatabase = async () => {

    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
      });

      process.exit(0);

};

seedDatabase();