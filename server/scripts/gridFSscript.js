var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config = require('../config/config');
//mongoose.connect(config.db.uri);
//var conn = mongoose.connection;*/

var fs = require('fs');
var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;


conn.once('open', function () {
    console.log('open');
    var gfs = Grid(conn.db);

    // streaming to gridfs
    //filename to store in mongodb
    var writestream = gfs.createWriteStream({
        filename: 'stupidname.txt'
    });
    fs.createReadStream('stupidname.txt').pipe(writestream);

    writestream.on('close', function (file) {
        // do something with `file`
        console.log(file.filename + 'Written To DB');
    });
		  
});
