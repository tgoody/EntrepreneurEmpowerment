var mongoose = require('mongoose')
var conn = mongoose.connection;
var multer  = require('multer')
// var upload = multer({ dest: 'uploads/' })
var GridFsStorage = require('multer-gridfs-storage');
var Grid = require('gridfs-stream');
var fs = require('fs');
Grid.mongo = mongoose.mongo;
var mongoDriver = mongoose.mongo;

//TODO: Define model for resources

//Homepage for resources page
exports.list = function(req, res) {
  res.send('homepage for resources page');
};

//Handles adding new resources (ADMIN FEATURE ONLY)
exports.create = function(req, res) {
  console.log(req);
  console.log(req.file);
  // conn.once('open', function () {
    console.log('open');
    var gfs = Grid(conn.db);
    var writestream = gfs.createWriteStream({
      filename: req.file.originalname ,
      mode: 'w',
      content_type: req.file.mimetype,
      metadata: req.body
    });

    fs.createReadStream(req.file.path).pipe(writestream);
    writestream.on('close', function(file) {
       fs.unlink(req.file.path, function(err) {
         // handle error
         console.log('success!')
       });
    });
  // });
  res.send('adding new resource (ADMIN FEATURE ONLY)');
};

//Handles deletion of resources (ADMIN FEATURE ONLY)
exports.delete = function(req, res) {
  res.send('deleting new resource (ADMIN FEATURE ONLY)');
};
