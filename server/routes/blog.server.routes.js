var blogController = require('../controllers/blog.server.controller'),
    express = require('express'),
    router = express.Router();

router.get('/all', blogController.getBlogs);

router.get('/recent', blogController.recentBlog);

//Creates a blog post
router.post('/', blogController.create);

//Updates a blog post that the user created
router.put('/update', blogController.update);

//add comment
router.post('/add', blogController.addComment);

router.route('/:blogId')
  .get(blogController.readById)
  .put(blogController.updateById)
  .delete(blogController.deleteById);

router.delete('/comment/:blogId/:commentId', blogController.deleteComment);

router.param('blogId', blogController.blogByID);
router.param('commentId', blogController.commentByID);

module.exports = router;
