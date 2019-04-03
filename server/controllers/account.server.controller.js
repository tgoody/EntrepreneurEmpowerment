/* Dependencies */
var mongoose = require('mongoose'),
    Account = require('../models/account.server.model.js');

/*
  In this file, you should use Mongoose queries in order to retrieve/add/remove/update accounts.
  On an error you should send a 404 status code, as well as the error message.
  On success (aka no error), you should send the account(s) as JSON in the response.

  HINT: if you are struggling with implementing these functions, refer back to this tutorial
  from assignment 3 https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
 */

/* Create a account */
exports.create = function(req, res) {
  /* Instantiate a Account */
  var account = new Account(req.body);
  /* Then save the account */
  account.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(account);
    }
  });
};

/* Show the current account */
exports.read = function(req, res) {
  /* send back the account as json from the request */
  res.json(req.account);
};


/* Update a account */
exports.update = function(req, res) {
  var account = req.account;
  var newAccount = req.body;
  /* Replace the article's properties with the new properties found in req.body */
  /* Save the article */
  Account.findByIdAndUpdate(account._id, newAccount, {new: true}, function(err, updatedAccount) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(updatedAccount);
    }
  });

};

exports.exists = function(req, res) {
  var uid = req.body;
  Account.findOne({uid: uid}, function(err, account) {
    if(err) {
      console.log(err);
      res.json({exists: false});
    } else if(account) {
      res.json({exists: true});
    } else {
      res.json({exists: false});
    }
  });
};

/* Delete a account */
exports.delete = function(req, res) {
  var account = req.account;
  var id = account._id;
    /* Remove the article */
  Account.findByIdAndRemove(id, function(err, deletedAccount){
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(deletedAccount);
    }
  });
};

/* Retreive all the directory accounts, sorted alphabetically by account code */
// exports.list = function(req, res) {
//   //get all accounts from mongo
//   Account.find({}, function(err, accounts) {
//     if (err) throw err;
//     // sort list
//     var sortedAccounts = accounts.sort((account, nextAccount) =>
//     {
//       return account.username.localeCompare(nextAccount.username)
//     });
//     res.json(sortedAccounts);
//   });
// };

exports.checkLogin = function(req, res) {

	//console.log(req.body);
	var tempAcctData = req.body;
	var accountEmail = tempAcctData.email;
	var tempPass = tempAcctData.password;

	var foundAcct;

	Account.findOne({email: accountEmail}, function(err, docs){
	
		if(err){
			console.log("ERROR FINDING ACCOUNT, WTF\n" + err);
		}
	
		if(docs == null){
			console.log("DID NOT FIND ACCOUNT, BAD EMAIL\n");
			return res.status(400).send(false);;
		}
	
		foundAcct = docs;
		console.log("FOUND ACCT HERE: " + foundAcct);
		//console.log("temp pass: " + tempPass);
		
		var foundAcctSchema = mongoose.model;
		
		docs.comparePassword(tempPass, function(err, isMatch){
		
			if(err){
				console.log("error when checking passwords");
			}
		
			if(isMatch){
        res.json(foundAcct);
      }else {
        res.status(400).send("incorrect password");
      }

		})
		
		

	});
	

}


/*
  Middleware: find a account by its ID, then pass it to the next request handler.

  Find the account using a mongoose query,
        bind it to the request object as the property 'account',
        then finally call next
 */
exports.accountByID = function(req, res, next, id) {
  if (id) {
    Account.findById(id).exec(function(err, account) {
      if(err) {
        res.status(400).send(err);
      } else {
        req.account = account;
        next();
      }
    });
  } else {
    res.status(400).send("Invalid id");
  }
};
