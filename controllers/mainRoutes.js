// Local variables to call on packages
const router = require('express').Router();
const {User, Blog, Comment} = require("../models");
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
    const user = await User.findByPk(blogData.id, { attributes: ["username"]});
    blog.username = user.username;

    for (const comment of blog.Comments) {
        comment.owner = (comment.user_id == req.session.user_id) ? true : false;
    }
    
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

router.get("/dashboard", async (req, res) => {
    
    try {

        const userBlog = await Blog.findAll({
            where: {
                user_id: req.session.user_id
            },
            raw: true
        });

        console.log("============================");
        console.log(userBlog);
        console.log("============================");
        
        res.render("dashboard", {userBlog, loggedIn: req.session.logged_in, subHeading: "Your Dashboard" });

    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/dashboard/add", async (req, res) => {
    res.render('add-post', {loggedIn: req.session.logged_in, subHeading: "New Blog" });
});

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

    res.render('edit-post', {post, loggedIn: req.session.logged_in, subHeading: "Edit Blog" });
});

router.get("/login", async (req, res) => {
    
    try {
        
        res.render("login", {subHeading: "Login / Signup" });

    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;