//This file holds any configuration variables we may need 
//'config.js' is typically ignored by git to protect sensitive information, such as your database's username and password

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

module.exports = {
  db: {
    uri: 'mongodb://admin:adminPassword1@ds141704.mlab.com:41704/bootcamp3', //place the URI of your mongo database here.
  }, 
  port: port
};