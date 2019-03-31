/* Dependencies */
var events = require('../controllers/event.server.controller.js'),
    express = require('express'),
    router = express.Router();

/*
  These method calls are responsible for routing requests to the correct request handler.
  Take note that it is possible for different controller functions to handle requests to the same route.
 */

//TODO: What to do with this?
router.route('/')
  .get(events.homepage)
  .post(events.create);

//TODO: What to work with on these?
router.route('/:eventID')
  .get(events.read)
  .put(events.update)
  .delete(events.delete);

router.param('eventID', events.eventByID);

module.exports = router;
