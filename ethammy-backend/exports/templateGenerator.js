const templates = require('./responseTemplate.js');

const generateUserJSON = function(accountInfo){
  var user = templates.userTemplate;
  user.id = accountInfo.uuid;
  user.email = accountInfo.email;
  user.username = accountInfo.username;
  user.discriminator = accountInfo.discriminator;
  user.dob = accountInfo.dob;
  user.status = accountInfo.status;
  return user;
}

const generateResponseJSON = function(endpoint, data){
  var response = templates.response;
  response.endpoint = endpoint;
  var date = new Date();
  response.timestamp = date.getTime();
  response.data = data;
  return response;
}

module.exports = {
  fillUserData : generateUserJSON,
  fillResponseData : generateResponseJSON
}
