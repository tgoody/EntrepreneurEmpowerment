//This file holds any configuration variables we may need
//'config.js' is typically ignored by git to protect sensitive information, such as your database's username and password

let port = process.env.PORT;
let testDataBase = 'mongodb://Carl:123abc@ds349175.mlab.com:49175/registering_accounts_test';
let realDataBase = 'mongodb://root:notr00t@ds249035.mlab.com:49035/entrepreneurempowerment';
if (port == null || port == "") {
  port = 8080;
}

module.exports = {
  db: {
    uri: realDataBase, //place the URI of your mongo database here.
  },
  port: port
};
