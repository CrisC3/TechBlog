// Local variables to call on packages
const router = require('express').Router();
const {User, Blog, Comment} = require("../models");
const withAuth = require('../utils/auth');

// GET route to display all blogs on homepage
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

        // Render handlebar
        res.render("homepage", {blogData, loggedIn: req.session.logged_in, subHeading: "The Tech Blog" });

    } catch (error) {
        
        // Returns status code 500, and displays error
        res.status(500).json(error);
    }
});

// GET route for the invidual blogs
router.get("/Blog/:id", async (req, res) => {

    // Local scope variables
    const blogData = await Blog.findByPk(req.params.id, {
        include: [
            {
                model: Comment
            }
        ],
        order: [
            ["updatedAt", "ASC"]
        ]
    });
    const blog = blogData.get({plain: true});
    const user = await User.findByPk(blogData.user_id, { attributes: ["username"]});
    
    // Adding username information to the blog variable
    blog.username = user.username;

    // Adding all comments.owner (T/F), based on the req.session.user_id
    for (const comment of blog.Comments) {
        comment.owner = (comment.user_id == req.session.user_id) ? true : false;
    }

    // Render handlebar with req.sessions
    req.session.save(() => {
        
       req.session.blog_id = req.params.id;

        res.render("singleBlog", {
            blogData: blog,
            loggedIn: req.session.logged_in,
            userId: req.session.user_id,
            subHeading: "Comments"
        });
    });
});

// GET route for the dashboard
router.get("/dashboard", async (req, res) => {
    
    try {

        // Local scope variable
        const userBlog = await Blog.findAll({
            where: {
                user_id: req.session.user_id
            },
            raw: true
        });

        res.render("dashboard", {userBlog, loggedIn: req.session.logged_in, subHeading: "Your Dashboard" });

    } catch (error) {

        // Returns status code 500, and displays error
        res.status(500).json(error);
    }
});

// GET route to add new blog post
router.get("/dashboard/add", async (req, res) => {

    // Renders handlebar
    res.render('add-post', {loggedIn: req.session.logged_in, subHeading: "New Blog" });
});

// GET route editing blogs created by user logged in
router.get("/dashboard/edit/:id", async (req, res) => {

    const post = await Blog.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id',
            'title',
            'content',
            'created_at'
        ],
        raw: true
    });

    // Renders handlebar
    res.render('edit-post', {post, loggedIn: req.session.logged_in, subHeading: "Edit Blog" });
});

// GET route for the login page
router.get("/login", async (req, res) => {
    
    try {
        
        // Renders handlebars
        res.render("login", {subHeading: "Login / Signup" });

    } catch (error) {

        // Returns status code 500, and displays error
        res.status(500).json(error);
    }
});

module.exports = router;