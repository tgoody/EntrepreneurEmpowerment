/* Dependencies */
var mongoose = require('mongoose');
var Blog = require('../models/blogpost.server.model.js');
var Account = require('../models/account.server.model.js');

exports.getBlogs = function(req, res) {
	Blog.find({}, {}, { sort: {'updated_at': -1} }, function(err, blogs){
		if(err) res.status(400).send("Error in getting all blogs: ", err);
		res.json(blogs);
	});
};

exports.recentBlog = function(req, res) {
	Blog.findOne({}, {},{ sort: {'updated_at': -1} }, function(err, blog){
		if(err) res.status(400).send("Error in getting most recent blog: ", err);
		res.json(blog)
	});
};


exports.addComment = function(req, res) {

	// console.log(req.body);
	
	var currentTime = new Date();
	var updated_at = currentTime;
	var created_at = currentTime;

	// get email
	Account.findOne({uid: req.body.user_id}, function(err, account) {
		if (err) res.status(404).send(err);
		// take off @domain from email
		var atSymbol = account.email.indexOf('@'); 
		var username = account.email.substring(0, atSymbol);
		var fullComment = {
			username: username,
			user_id : req.body.user_id,
			message : req.body.comment,
			created_at : created_at,
			updated_at : updated_at
		};
	
		Blog.findOneAndUpdate({_id: req.body._id},
		
			{$push: {comments: fullComment}},
			{new: true},
			(err, result) => {
			console.log(result);
			if(err){
				console.log(err);
				res.status(400).send(err);
			}
			else{res.json(result);}
			
			});
	  });
};

//Handles the creation of a new blog post
exports.create = function(req, res) {
	req.body.comments = [];
	var blog = new Blog(req.body);
	
	blog.save(function(err){
		if(err){
			console.log(err);
			res.status(400).send(err);
		}
		else{res.json(blog);}
	});

	
  //res.send('Creation of a new blog post');
};

//Handles the update of a blog post
exports.update = function(req, res){
  res.send('Updating a blog post');
};

//Handles the deletion of a blog post
exports.delete = function(req, res) {
  res.send('Deletes a blog post');
};
