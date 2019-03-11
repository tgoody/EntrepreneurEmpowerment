/* Dependencies */
var about = require('../controllers/about.server.controller.js'),
    express = require('express'),
    router = express.Router();

router.get('/', about.list);

module.exports = router;
