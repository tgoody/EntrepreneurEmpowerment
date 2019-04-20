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

// Request for new resource
router
    .get('/request', resourceController.getRequest)
    .post('/request', resourceController.request)
    .delete('/request/:requestId', resourceController.deleteRequest);

router.param('requestId', resourceController.requestById);


// Download resource
router.post('/read', resourceController.read);

//Deletes a resource
router.delete('/delete/:resourceId', resourceController.delete);
router.delete('/deleteVideo/:videoId', resourceController.deleteVideo);

router.param('resourceId', resourceController.resourceByID);
router.param('videoId', resourceController.videoByID);

module.exports = router;
