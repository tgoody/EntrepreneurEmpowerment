/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'),
    commentModel = require('./comment.server.model.js'),
    Schema = mongoose.Schema,
    commentModel = commentModel.commentSchema;


var videoSchema = new Schema({
  link: {
    type: String,
    required: true
  },
  forUsers: Boolean,
  comments: [commentModel.commentSchema],
  created_at: Date,
  updated_at: Date
});


videoSchema.pre('save', function(next) {
  var currentTime = new Date;
  this.updated_at = currentTime;
  if(!this.created_at)
  {
    this.created_at = currentTime;
  }
  next();
});



/* Use your schema to instantiate a Mongoose model */
var Video = mongoose.model('Video', videoSchema);
/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Video
