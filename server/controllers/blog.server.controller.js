/* Dependencies */
var mongoose = require('mongoose');

//TODO: Define model for blog post

//Homepage for blog page
exports.list = function(req, res) {
  //res.redirect('http://google.com');
  res.send('Homepage of blog page');
};

//Handles the creation of a new blog post
exports.create = function(req, res) {
  res.send('Creation of a new blog post');
};

//Handles the update of a blog post
exports.update = function(req, res){
  res.send('Updating a blog post');
};

//Handles the deletion of a blog post
exports.delete = function(req, res) {
  res.send('Deletes a blog post');
};
