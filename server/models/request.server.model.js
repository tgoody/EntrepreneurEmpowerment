/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var requestSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  category: {
    type: Number,
    required: true 
  },
  link: {
    type: String
  },
  created_at: Date,
  updated_at: Date
});


requestSchema.pre('save', function(next) {
  var currentTime = new Date;
  this.updated_at = currentTime;
  if(!this.created_at)
  {
    this.created_at = currentTime;
  }
  next();
});


/* Use your schema to instantiate a Mongoose model */
var request = mongoose.model('Request', requestSchema);
/* Export the model to make it avaiable to other parts of your Node application */
module.exports = request;
