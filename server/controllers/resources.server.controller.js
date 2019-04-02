var mongoose = require('mongoose');
var conn = mongoose.connection;
var multer  = require('multer');
// var upload = multer({ dest: 'uploads/' })
var Grid = require('gridfs-stream');
var fs = require('fs');
Grid.mongo = mongoose.mongo;
var Resource = require('../models/resource.server.model.js');
var Video = require('../models/video.server.model.js');

//TODO: Define model for resources

//Homepage for resources page
exports.list = function(req, res) {
  res.redirect("/pages/docs/docs.html");
};

//Handles adding new resources (ADMIN FEATURE ONLY)
exports.create = function(req, res) {
  // Upload file
  // var gfs = Grid(conn.db);
  // var writestream = gfs.createWriteStream({
  //   filename: req.file.originalname,
  //   mode: 'w',
  //   content_type: req.file.mimetype,
  //   metadata: req.body
  // });

  // fs.createReadStream(req.file.path).pipe(writestream);
  // writestream.on('close', function(file) {
  //   // Delete file locally
  //     fs.unlink(req.file.path, function(err) {
  //       // handle error
  //     });
  // });
  // Add to doc list
  var newDoc = new Resource({
    name: req.body.filename,
    category: req.body.category
  });

  newDoc.save(function(err){
		if(err){
			console.log(err);
			res.status(400).send(err);
		}
		else{res.json(newDoc);}
	});
};

exports.read = function(req, res) {
  var filename = req.body.name;
  //write content to file system
  // Todo: make sure correct extension is added
  // var gfs = Grid(conn.db);
  // var fs_write_stream = fs.createWriteStream(filename);

  //read from mongodb
  // var readstream = gfs.createReadStream({
  //   filename: filename
  // });

  // readstream.on('error', function(err) {
  //   res.end();
  // });

  // readstream.pipe(res);

  // // TODO: handle case in which file doesn't exist
  // readstream.pipe(fs_write_stream);
  // // TODO: Download through browser instead
  // fs_write_stream.on('close', function () {
  // });
};

exports.getDocs = function(req, res) {
  Resource.find({category: req.body.category}, function(err, docs){
    if(err) res.status(400).send("Error in retreiving resources: ", err);

    res.json(docs);
  });
};

exports.getVideos = function(req, res) {
  Video.find({category: req.body.category}, function(err, videos){
    if(err) res.status(400).send("Error in retreiving videos: ", err);

    res.json(videos);
  });
};

//Handles deletion of resources (ADMIN FEATURE ONLY)
exports.delete = function(req, res) {
  res.send('deleting new resource (ADMIN FEATURE ONLY)');
};
