var should = require('should'),
mongoose = require('mongoose'),
Event = require('../models/calendar.server.model.js'),
config = require('../config/config');

var tempEvent, id;

tempEvent =  {
    eventName: "Joe's Bar Get-together",
    eventDate: ('01.02.2012'),
    time: "12:00",
    address: "butt street",
    description: "we love bbq",
}

describe('Event Schema Unit Tests', function() {
         
         before(function(done) {
                mongoose.connect(config.db.uri);
                done();
                });
         
         describe('Saving to database', function() {
                  /*
                   Mocha's default timeout for tests is 2000ms. To ensure that the tests do not fail
                   prematurely, we can increase the timeout setting with the method this.timeout()
                   */
                  this.timeout(10000);
                  
                  it('saves properly when code and name provided', function(done){
                     
                     saveEvent = new Event({
                        eventName: tempEvent.eventName,
                        eventDate: tempEvent.eventDate,
                        time: tempEvent.time,
                        address: tempEvent.address,
                        description: tempEvent.description
                     }).save(function(err, saveEvent){
                        should.not.exist(err);
                        id = saveEvent._id;
                        done();
                        });
                     });
                  });
         });
                     
                     /*new Event({
                                 name: tempEvent.name,
                                 code: tempEvent.code
                                 }).save(function(err, listing){
                                         should.not.exist(err);
                                         id = listing._id;
                                         done();
                                         });
                     });
                  
                  it('saves properly when all three properties provided', function(done){
                     new Listing(listing).save(function(err, listing){
                                               should.not.exist(err);
                                               id = listing._id;
                                               done();
                                               });
                     });
                  
                  it('throws an error when name not provided', function(done){
                     new Listing({
                                 code: listing.code
                                 }).save(function(err){
                                         should.exist(err);
                                         done();
                                         })
                     });
                  
                  it('throws an error when code not provided', function(done){
                     new Listing({
                                 name: listing.name
                                 }).save(function(err){
                                         should.exist(err);
                                         done();
                                         })
                     });*/
