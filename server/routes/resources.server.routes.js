var resourceController = require('../controllers/resources.server.controller'),
    express = require('express'),
    router = express.Router(),
    multer  = require('multer')

router.post('/docs', resourceController.getDocs);

router.post('/videos', resourceController.getVideos);

router.post('/add', resourceController.addComment);

router.post('/updateUrl', resourceController.updateUrl);

//Adds a new resource
router.post('/create', resourceController.create);
router.post('/createVideo', resourceController.createVideo);

// Download resource
router.post('/read', resourceController.read);

//Deletes a resource
router.delete('/delete', resourceController.delete);

module.exports = router;
