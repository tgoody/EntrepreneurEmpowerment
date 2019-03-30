var resourceController = require('../controllers/resources.server.controller'),
    express = require('express'),
    router = express.Router(),
    multer  = require('multer')
    upload = multer({ dest: 'uploads/' });

//Gets info for the homepage of resources
router.get('/', resourceController.list);

//Adds a new resource
router.post('/create', upload.single('myFile'), resourceController.create);

//Deletes a resource
router.delete('/delete', resourceController.delete);

module.exports = router;
