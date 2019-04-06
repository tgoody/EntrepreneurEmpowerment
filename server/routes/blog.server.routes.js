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

//Deletes a blog post that the user created
router.delete('/delete', blogController.delete);

router.route('/:blogId')
  .get(blogController.readById)
  .put(blogController.updateById)
  .delete(blogController.deleteById);

router.param('blogId', blogController.blogByID);

module.exports = router;
