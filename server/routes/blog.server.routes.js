var blogController = require('../controllers/blog.server.controller'),
    express = require('express'),
    router = express.Router();

//Gets info for the homepage of the blog
router.get('/', blogController.list);

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

module.exports = router;
