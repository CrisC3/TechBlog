const router = require('express').Router();
const { User, Blog, Comment } = require('../../models');
const withAuth = require("../../utils/auth");

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

// GET /api/users/1
router.get('/:id', (req, res) => {
  User.findOne({
      attributes: { exclude: ['password']},
      where: {
        id: req.params.id
      },
      include: [
          {
            model: Blog,
            attributes: ['id', 'title', 'content', 'created_at']
          },
          {
              model: Comment,
              attributes: ['id', 'comment', 'created_at'],
              include: {
                model: Blog,
                attributes: ['title']
              }
          }
        ]

  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST /api/users
router.post('/', async (req, res) => {

  try {

    const userData = await User.create(req.body);

    res.status(200).json(userData);
    
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;