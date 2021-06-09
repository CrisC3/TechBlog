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

        res.render("homepage", {blogData, logged_in: req.session.logged_in });

    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/dashboard", async (req, res) => {
    
    try {
        
        res.render("dashboard");

    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/login", async (req, res) => {
    
    try {
        
        res.render("login");

    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/signup", async (req, res) => {
    
    try {
        
        res.render("signup");

    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;