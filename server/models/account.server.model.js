/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'),
Schema = mongoose.Schema;

/* Create your schema */
var accountSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    admin: false,
    created_at: Date,
    updated_at: Date
    });

/* create a 'pre' function that adds the updated_at (and created_at if not already there) property */
/* Added functionality
 - Sets admin status to false
 - Hashes password.
 */
accountSchema.pre('save', function(next) {
                  var currentTime = new Date;
                  this.updated_at = currentTime;
                  this.admin = false;
                  if(!this.created_at)
                  {
                  this.created_at = currentTime;
                  }
                  next();
                  });

/* Use your schema to instantiate a Mongoose model */
var Account = mongoose.model('Account', accountSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Account;
