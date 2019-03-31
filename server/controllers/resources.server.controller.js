var mongoose = require('mongoose');
var conn = mongoose.connection;
var multer  = require('multer');
// var upload = multer({ dest: 'uploads/' })
var Grid = require('gridfs-stream');
var fs = require('fs');
Grid.mongo = mongoose.mongo;

//TODO: Define model for resources

//Homepage for resources page
exports.list = function(req, res) {
  res.send('homepage for resources page');
};

//Handles adding new resources (ADMIN FEATURE ONLY)
exports.create = function(req, res) {
  var gfs = Grid(conn.db);
  var writestream = gfs.createWriteStream({
    filename: req.file.originalname,
    mode: 'w',
    content_type: req.file.mimetype,
    metadata: req.body
  });

  fs.createReadStream(req.file.path).pipe(writestream);
  writestream.on('close', function(file) {
    // Delete file
      fs.unlink(req.file.path, function(err) {
        // handle error
        return res.json({'uploaded': true});
      });
  });
};

exports.read = function(req, res) {
  var filename = req.body.name;
  //write content to file system
  // Todo: make sure correct extension is added
  var gfs = Grid(conn.db);
  // var fs_write_stream = fs.createWriteStream(filename);

  gfs.findOne({filename: filename}, function(err, file) {
    if (err) {
      return res.status(400).send(err);
    }
    else if (!file) {
        return res.status(404).send('Error on the database looking for the file.');
    }
    console.log(file);
    res.set('Content-Type', file.contentType);
    res.set('Content-Disposition', 'attachment; filename="' + file.filename + '"');
    //read from mongodb
    var readstream = gfs.createReadStream({
        filename: filename
    });

    readstream.on('error', function(err) {
      res.end();
    });
    readstream.pipe(res);
  });

  // TODO: handle case in which file doesn't exist
  // readstream.pipe(fs_write_stream);
  // TODO: Download through browser instead
  // fs_write_stream.on('close', function () {
  //     console.log('file has been written fully!');
  // });
  // res.send('downloading resource (ADMIN FEATURE ONLY)');
}

//Handles deletion of resources (ADMIN FEATURE ONLY)
exports.delete = function(req, res) {
  res.send('deleting new resource (ADMIN FEATURE ONLY)');
};
