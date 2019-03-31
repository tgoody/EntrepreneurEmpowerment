/* Dependencies */
var mongoose = require('mongoose'),
    calendarEvent = require('../models/calendar.server.model.js');

exports.homepage = function(req, res) {
  res.redirect('/pages/calendar/calendar.html');
};

exports.create = function(req, res) {
  /* Instantiate an event */
  console.log(req.body);
  var tempEvent = new calendarEvent(req.body);

  /* Then save the event */
  tempEvent.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(tempEvent);
    }
  });
};

/* Show the current event */
exports.read = function(req, res) {
  /* send back the event as json from the request */
  res.json(req.tempEvent);
};

/* Update an event */
exports.update = function(req, res) {
  var event = req.event;
  var newEvent = req.body;
  /* Replace the article's properties with the new properties found in req.body */
  /* Save the article */
  Listing.findByIdAndUpdate(event._id, newEvent, {new: true}, function(err, updatedEvent) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(updatedEvent);
    }
  });

};

/* Delete an event */
exports.delete = function(req, res) {
  var event = req.event;
  var id = event._id;
    /* Remove the article */
  Listing.findByIdAndRemove(id, function(err, deletedEvent){
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(deletedEvent);
    }
  });
};

  /*exports.list = function(req, res) {
  //get all listings from mongo
  Listing.find({}, function(err, listings) {
    if (err) throw err;
    // sort list
    var sortedListings = listings.sort((listing, nextListing) =>
    {
      return listing.code.localeCompare(nextListing.code)
    });
    res.json(sortedListings);
  });
};*/


/*
  Middleware: find a listing by its ID, then pass it to the next request handler.

  Find the listing using a mongoose query,
        bind it to the request object as the property 'listing',
        then finally call next
 */


exports.eventByID = function(req, res, next, id) {
  calendarEvent.findById(id).exec(function(err, event) {
    if(err) {
      res.status(400).send(err);
    } else {
      req.event = event;
      next();
    }
  });
};
