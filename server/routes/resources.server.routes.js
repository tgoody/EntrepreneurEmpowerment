var resourceController = require('../controllers/resources.server.controller'),
    express = require('express'),
    router = express.Router(),
    multer  = require('multer')
    upload = multer({ dest: 'uploads/' });

//Gets info for the homepage of resources
router.get('/', resourceController.list);

router.post('/docs', resourceController.getDocs);

router.post('/videos', resourceController.getVideos);

//Adds a new resource
router.post('/create', resourceController.create);

// Download resource
router.post('/read', resourceController.read);

//Deletes a resource
router.delete('/delete', resourceController.delete);

module.exports = router;
