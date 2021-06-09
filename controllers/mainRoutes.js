// Local variables to call on packages
const router = require('express').Router();
const {User, Blog, Comment} = require("../models");
const { sequelize } = require('../models/User');
const withAuth = require('../utils/auth');

router.get("/", async (req, res) => {
    console.log(req.session);
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
    
    const commentData = await Comment.findAll({
        where: {
            blog_id: blogData.id
        },
        raw: true
    });
    const blogUsername = await User.findByPk(blogData.user_id, {
        attributes: {
            exclude: ['password']
        },
        raw: true
    });

    blogData.username = blogUsername.username;
    blogData.comments = [];

    for (const iterator of commentData) {
        iterator.username = (await User.findByPk(iterator.user_id, {attributes: ['username'], raw: true })).username;
        blogData.comments.push(iterator);
    }

    console.log(blogData);
    
    req.session.save(() => {
        
       req.session.blog_id = req.params.id;

        console.log(req.session);

        res.render("singleBlog", {
            blogData,
            loggedIn: req.session.logged_in,
            subHeading: "Comments"
        });
    });
});

router.get("/dashboard", async (req, res) => {
    
    try {
        
        res.render("dashboard", {loggedIn: req.session.logged_in, subHeading: "Your Dashboard" });

    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/dashboard/add", async (req, res) => {
    res.render('add-post', {loggedIn: req.session.logged_in, subHeading: "New Blog" });
});

router.get("/login", async (req, res) => {
    
    try {
        
        res.render("login", {subHeading: "Login / Signup" });

    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;