/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	bcrypt = require('bcrypt'),
	SALT_WORK_FACTOR = 10;

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
accountSchema.pre('save', async function(next) {

	var currUser = this;
	
	if(!currUser.isModified('password')){
		return next();
	}

	let salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
	currUser.password = await bcrypt.hash(currUser.password, salt);
	
	//I cannot explain how much hate I have towards asynchronicity
	//No idea why our code couldn't just be normal. So many tutorials
	//just used a really simple few lines. We had to make the whole
	//.pre function asynchronous just for this. Insane. It's 6 AM
	//and this work was not worth it.

	var currentTime = new Date;
	this.updated_at = currentTime;
	this.admin = false;
	if(!this.created_at) {
    	this.created_at = currentTime;
	}
	
	next();
});

//http://devsmash.com/blog/password-authentication-with-mongoose-and-bcrypt
accountSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

/* Use your schema to instantiate a Mongoose model */
var Account = mongoose.model('Account', accountSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Account;
