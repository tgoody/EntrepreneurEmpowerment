//This file holds any configuration variables we may need 
//'config.js' is typically ignored by git to protect sensitive information, such as your database's username and password

module.exports = {
  db: {
    uri: 'mongodb://admin:adminPassword1@ds141704.mlab.com:41704/bootcamp3', //place the URI of your mongo database here.
  }, 
  port: 8080
};