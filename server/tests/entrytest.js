var should = require('should'),
mongoose = require('mongoose'),
Event = require('../models/calendar.server.model.js'),
vidModels = require('../models/video.server.model.js'),
Account = require('../models/account.server.model.js')
config = require('../config/config');

var tempComment1, tempComment2, id;

tempComment1 =  {
username: "myUser",
commentText: "This is a comment!"
}

tempComment2 = {
username: "user2",
commentText: "This is not a comment!"
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
                  
                  it('saves event with data', function(done){
                     
                     saveEvent = new Event({
                        eventName: "Joe's Bar Get-together",
                        eventDate: ('01.02.2012'),
                        time: "12:00",
                        address: "temp street",
                        description: "we love bbq",
                     }).save(function(err, saveEvent){
                        should.not.exist(err);
                        id = saveEvent._id;
                        done();
                        });
                     });
                  
                  
                  it('saves comment with data', function(done){
                     
                     saveComment = new vidModels.Comment({
                         username: "user3",
                         commentText: "How do I comment?!!"
                         }).save(function(err, saveComment){
                             should.not.exist(err);
                             id = saveComment._id;
                             done();
                             });
                     
                     
                     });
                  
                  it('saves video with data', function(done){
                  
                     saveVideo = new vidModels.Video({
                     
                        link: "github.com/tgoody",
                        forUsers: false,
                        comments: [tempComment1, tempComment2]
                     
                        }).save(function(err, saveVideo){
                            should.not.exist(err);
                            id = saveVideo._id;
                            done();
                            });
                  
                  
                     });
                  
                  
                  it('saves account with data', function(done){
                     saveAccount = new Account({
                     
                                               email: "test@test.com",
                                               username: "test",
                                               password: "tester!",
                                               admin: true

                     }).save(function(err, saveAccount){
                             should.not.exist(err);
                             id = saveAccount._id;
                             done();
                             });
                     })
                  
                  
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
