// Local variables to call on packages
const router = require('express').Router();
const {User, Blog, Comment} = require("../models");
const withAuth = require('../utils/auth');

router.get("/", async (req, res) => {
    
    try {
        
        // Get all blogs JOIN with user table
        const blogData = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username']
                }
            ],
            raw: true
        });

        // console.log(blogData);

        res.render("homepage", {blogData, loggedIn: req.session.logged_in, subHeading: "The Tech Blog" });

    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/Blog/:id", async (req, res) => {

    const blogData = await Blog.findByPk(req.params.id, { raw: true });
    const commentdata = await Comment.findAll({
        where: {
            blog_id: blogData.id
        },
        raw: true
    });
    const Userdata = await User.findByPk(blogData.user_id, {
        attributes: {
            exclude: ['password']
        },
        raw: true
    });
    
    blogData.username = Userdata.username;
    blogData.comments = [];
    blogData.comments.push(...commentdata);

    console.log(blogData);

    res.render("singleBlog", {
        blogData,
        loggedIn: req.session.logged_in,
        subHeading: "The Tech Blog"
    });

});

router.get("/dashboard", async (req, res) => {
    
    try {
        
        res.render("dashboard", {loggedIn: req.session.logged_in, subHeading: "Your Dashboard" });

    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/login", async (req, res) => {
    
    try {
        
        res.render("login", {subHeading: "Login / Signup" });

    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;