/* Dependencies */
var mongoose = require('mongoose');

//Homepage for about page
exports.list = function(req, res) {
  res.redirect('/about.html');
};
