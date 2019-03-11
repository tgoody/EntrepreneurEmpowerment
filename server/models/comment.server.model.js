/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'),
    accountModel = require('../models/account.server.model.js'),
    Schema = mongoose.Schema;

var commentSchema = new Schema({

    account: accountModel.schema,
    commentText: String,
    created_at: Date,
    updated_at: Date
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

var Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
