var mongoose = require('mongoose');
var conn = mongoose.connection;
var multer  = require('multer');
// var upload = multer({ dest: 'uploads/' })
var Grid = require('gridfs-stream');
var fs = require('fs');
Grid.mongo = mongoose.mongo;
var Resource = require('../models/resource.server.model.js');
var Video = require('../models/video.server.model.js');
var Account = require('../models/account.server.model.js');
var Request = require('../models/request.server.model.js');

//Handles adding new resources (ADMIN FEATURE ONLY)
exports.create = function(req, res) {
  // Add to doc list
  var newDoc = new Resource({
    name: req.body.filename,
    category: req.body.category,
    url: req.body.url
  });

  newDoc.save(function(err){
		if(err){
			console.log(err);
			res.status(400).send(err);
		}
		else{res.json(newDoc);}
	});
};

exports.createVideo = function(req, res) {
  // Add to doc list
  var newVid = new Video(req.body);

  newVid.save(function(err){
		if(err){
			console.log(err);
			res.status(400).send(err);
		}
		else{res.json(newVid);}
	});
};

exports.getRequest = function(req, res) {
	Request.find({}, function(err, requests) {
		if (err) res.status(400).send(err);

		res.json(requests);
	});
};

exports.deleteRequest = function(req, res) {
  var request = req.request;
  var id = request._id;
    /* Remove the article */
		Request.findByIdAndRemove(id, function(err, deletedEvent){
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(deletedEvent);
    }
  });
};

exports.request = function(req, res) {
  // Add to doc list
  var newReq = new Request(req.body);

  newReq.save(function(err){
		if(err){
			console.log(err);
			res.status(400).send(err);
		}
		else{res.json(newReq);}
	});
};

exports.updateUrl = function(req, res) {
  Resource.findByIdAndUpdate({_id: req.body.id}, {url: req.body.url},
    {new: true}, function(err, doc) {
      if (err) res.status(400).send(err);

      res.send(doc);
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
  Resource.find({category: req.body.category}, {}, { sort: {'created_at': 1} }, function(err, docs){
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
	
		Resource.findOneAndUpdate({_id: req.body._id},
		
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


//Handles deletion of resources (ADMIN FEATURE ONLY)
exports.delete = function(req, res) {
  Resource.findByIdAndRemove(req.doc._id, function(err, deletedEvent){
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(deletedEvent);
    }
  });
};


exports.resourceByID = function(req, res, next, id) {
	if (id) {
	  Resource.findById(id).exec(function(err, doc) {
		if(err) {
			res.status(404).send(err);
		} else {
			req.doc = doc;
		  next();
		}
	  });
	} else {
		res.status(400).send("Invalid id");
	}
};

exports.deleteVideo = function(req, res) {
  Video.findByIdAndRemove(req.vid._id, function(err, deletedEvent){
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(deletedEvent);
    }
  });
};


exports.videoByID = function(req, res, next, id) {
	if (id) {
	  Video.findById(id).exec(function(err, vid) {
		if(err) {
			res.status(404).send(err);
		} else {
			req.vid = vid;
		  next();
		}
	  });
	} else {
		res.status(400).send("Invalid id");
	}
};

exports.requestById = function(req, res, next, id) {
  Request.findById(id).exec(function(err, event) {
    if(err) {
      res.status(400).send(err);
    } else {
      req.request = event;
      next();
    }
  });
};
