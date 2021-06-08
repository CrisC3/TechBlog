// Local variables to call on packages
const sequelize = require("../config/connection");
const { User, Blog, Comment } = require("../models");

// Local variables pointing to dummy data
const userData = require("./userData.json");
const blogData = require("./blogData.json");
const commentData = require("./commentData.json");

// Anonymous function
const seedDatabase = async () => {

    // In scope variable
    let blogs = [];

    await sequelize.sync({ force: true });

    // In scope variable to create all users
    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true
    });

    // Add the blogs from JSON file and also push to array variable [blogs]
    for (const blog of blogData) {
        
       blogs.push(
           await Blog.create({
               ...blog,
               user_id: users[Math.floor(Math.random() * users.length)].id
            })
        );
    }

    // Add the comments from JSON file
    for (const comment of commentData) {
        
        await Comment.create({
            ...comment,
            blog_id: blogs[Math.floor(Math.random() * blogs.length)].id,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }
    
    // Terminate script
    process.exit(0);
};

// Call anonymous function, start entry point
seedDatabase();