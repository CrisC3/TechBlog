const router = require('express').Router();
const { User, Blog, Comment } = require('../../models');

// GET /api/blogs
router.get('/', async (req, res) => {
    
    try {

        const blogData = await Blog.findAll();

        
    } catch (error) {
        
    }
});


// GET /api/users
router.get('/', (req, res) => {
    // Access our User model and run .findAll() method
    User.findAll({
        attributes: { exclude: ['password'] }
    })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });