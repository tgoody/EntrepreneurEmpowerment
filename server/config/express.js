var path = require('path'),
    express = require('express'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    config = require('./config'),
    eventsRouter = require('../routes/events.server.routes'),
    blogRouter = require('../routes/blog.server.routes'),
    resourcesRouter = require('../routes/resources.server.routes'),
    accountsRouter = require('../routes/account.server.routes.js'),
    adminRouter = require('../routes/admin.server.routes.js'),
    aboutRouter = require('../routes/about.server.routes.js');

module.exports.init = function() {
  //connect to database
  mongoose.connect(config.db.uri);

  //initialize app
  var app = express();

  //enable request logging for development debugging
  app.use(morgan('dev'));

  //body parsing middleware
  app.use(bodyParser.json());


  /** Serve static files */
  app.use(express.static('client'));

  //Routes for requests dealing with accounts.
  app.use('/api/accounts', accountsRouter);
	
  //Routes for requests dealing with the about page.
  app.use('/about', aboutRouter);

  //Routes for requests dealing with the blog page.
  app.use('/blog', blogRouter);

  //Routes for request dealing with the calendar page.
  app.use('/calendar', eventsRouter);

  //Routes for request dealing with the resources page.
  app.use('/resources', resourcesRouter);

  app.use('/admin', adminRouter);
  /** Go to homepage for all routes not specified */
  app.use(function(req, res) {
    res.redirect("/");
  });

  return app;
};
