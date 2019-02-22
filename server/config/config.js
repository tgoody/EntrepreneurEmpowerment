//This file holds any configuration variables we may need 
//'config.js' is typically ignored by git to protect sensitive information, such as your database's username and password

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8080;
}

module.exports = {
  db: {
    uri: '', //place the URI of your mongo database here.
  }, 
  port: port
};