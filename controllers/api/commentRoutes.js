const router = require('express').Router();
const { User, Blog, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post("/", withAuth, async (req, res) => {

  const newCommentInput = req.body.newComment;
 
    try {
        
        const newComment = await Comment.create({
            blog_id: req.session.blog_id,
            user_id: req.session.user_id,
            comment: newCommentInput
        });

        console.log(newComment);
        
        res.status(200).json(newComment);

    } catch (error) {
        res.status(400).json(error);
    }

});

router.put("/:id", withAuth, async (req, res) => {

  try {
    
    const update = await Comment.update(req.body, {
      where: {
        id: req.body.id
      }
    });

    console.log(update);
    
    } catch (error) {
        res.status(400).json(error);
    }

});

router.delete('/:id', withAuth, async (req, res) => {
    try {
      const commentData = await Comment.destroy({
        where: {
          id: req.params.id
        }
      });
  
      if (!commentData) {
        res.status(404).json({ message: 'No comment found with this id!' });
        return;
      }
  
      res.status(200).json(commentData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;
  