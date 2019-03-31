/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var blogSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
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
  tags: [String],
  created_at: Date,
  updated_at: Date
});


blogSchema.pre('save', function(next) {
  var currentTime = new Date;
  this.updated_at = currentTime;
  if(!this.created_at)
  {
    this.created_at = currentTime;
  }
  next();
});



/* Use your schema to instantiate a Mongoose model */
var blogPost = mongoose.model('blogPost', blogSchema);
/* Export the model to make it avaiable to other parts of your Node application */
module.exports = blogPost;
