// Local variables to call on packages
const router = require('express').Router();
const {User, Blog, Comment} = require("../models");

router.get("/", async (req, res) => {
    
    try {
        
        // Get all blogs JOIN with user table
        const blogData = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        });

        res.status(200).json(blogData);

    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;