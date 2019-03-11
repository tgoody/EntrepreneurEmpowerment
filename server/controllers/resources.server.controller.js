var mongoose = require('mongoose')

//TODO: Define model for resources

//Homepage for resources page
exports.list = function(req, res) {
  res.send('homepage for resources page');
};

//Handles adding new resources (ADMIN FEATURE ONLY)
exports.create = function(req, res) {
  res.send('adding new resource (ADMIN FEATURE ONLY)');
};

//Handles deletion of resources (ADMIN FEATURE ONLY)
exports.delete = function(req, res) {
  res.send('deleting new resource (ADMIN FEATURE ONLY)');
};
