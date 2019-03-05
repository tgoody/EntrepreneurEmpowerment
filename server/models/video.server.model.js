/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var commentSchema = new Schema({

    username: String,
    commentText: String,
    created_at: Date,
    updated_at: Date
});


var videoSchema = new Schema({
  link: {
    type: String,
    required: true
  },
  forUsers: Boolean,
  comments: [commentSchema],
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

commentSchema.pre('save', function(next) {
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
var Comment = mongoose.model('Comment', commentSchema);
/* Export the model to make it avaiable to other parts of your Node application */
module.exports = {Video: Video, Comment: Comment};

