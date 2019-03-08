var resourceController = require('../controllers/resources.server.controller'),
    express = require('express'),
    router = express.Router();

//Gets info for the homepage of resources
router.get('/', resourceController.list);

//Adds a new resource
router.post('/create', resourceController.create);

//Deletes a resource
router.delete('/delete', resourceController.delete);

module.exports = router;
