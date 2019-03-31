/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var resourceSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true 
  },
  comments: [{
    username: {type: String, required: true},
    user_id: {type: String, required: true},
    message: {type: String, required: true},
    created_at: Date,
    updated_at: Date
  }],
  created_at: Date,
  updated_at: Date
});


resourceSchema.pre('save', function(next) {
  var currentTime = new Date;
  this.updated_at = currentTime;
  if(!this.created_at)
  {
    this.created_at = currentTime;
  }
  next();
});


/* Use your schema to instantiate a Mongoose model */
var resource = mongoose.model('resource', resourceSchema);
/* Export the model to make it avaiable to other parts of your Node application */
module.exports = resource;
