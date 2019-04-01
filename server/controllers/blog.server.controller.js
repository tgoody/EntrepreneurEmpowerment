/* Dependencies */
var mongoose = require('mongoose');
var Blog = require('../models/blogpost.server.model.js');

//TODO: Define model for blog post

//Homepage for blog page
exports.list = function(req, res) {
  res.redirect('/pages/blog/blog.html');
};

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

	console.log(req.body);
	
	var currentTime = new Date;
	var updated_at = currentTime;
	var created_at = currentTime;

	//TODO: TAKE IN USERNAME
	
	var fullComment = {
		username: "thisisausername",
		user_id : "thisisauserid",
		message : req.body.comment,
		created_at : created_at,
		updated_at : updated_at
	};
	

	Blog.findOneAndUpdate({_id: req.body._id},
	
		{$push: {comments: fullComment}},
		{new: true},
		(err, result) => {
		
		if(err){
			console.log(err);
			res.status(400).send(err);
		}
		else{res.json(fullComment);}
		
		});
	
	
	
	

//	Blog.findOne()


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


exports.addComment = function(req, res)	{
	var post = req.body;			// idk???????
	// need to find the id first
	Blog.findById(req.body._id), exec(function(err, post)	{
		if (post.results)	{
			var now = new Date();
			post.comments.push({
				user_id: post.results.user_id, 
				message: post.results.message, 
				created_at: now, 
				updated_at: now 
			});
		};
	});	

	listing.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(post);
    }
  });
};


//Handles the update of a blog post
exports.update = function(req, res){
  res.send('Updating a blog post');
};

//Handles the deletion of a blog post
exports.delete = function(req, res) {
  res.send('Deletes a blog post');
};
