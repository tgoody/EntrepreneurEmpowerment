/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/* Create your schema */
var calendarSchema = new Schema({
    eventName: {
    type: String,
    required: true
  },
  eventDate: {
    type: String,
    required: true,
  },
  address: String,
  details: String,
  host: String,
  time: String,
  created_at: Date,
  updated_at: Date,
  approved: Boolean
});

/* create a 'pre' function that adds the updated_at (and created_at if not already there) property */
calendarSchema.pre('save', function(next) {
  this.approved = false;
  var currentTime = new Date;
  this.updated_at = currentTime;
  if(!this.created_at)
  {
    this.created_at = currentTime;
  }
  next();
});

/* Use your schema to instantiate a Mongoose model */
var event = mongoose.model('event', calendarSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = event;
