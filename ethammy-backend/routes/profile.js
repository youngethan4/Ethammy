const dbCon = require('../exports/dbAccess.js');
const templateGenerator = require('../exports/templateGenerator.js')
function getAccountInfo(){

}

const loginFunction = function(req, res){
  var reqBody = req.body;
  var email = reqBody.email;
  var password = reqBody.password;
  var sqlCondition = 'email = ' + email + ' AND password = ' + password;
  var account = dbCon.dbSelect('Profiles', ['*'], sqlCondition);
  if(account.length != 1){
    var response = templateGenerator.fillResponseData('/api/auth', undefined);
    response.status = 400;
    response.error = {
      type : 'Invalid Account Info',
      message : 'Unable to locate the requested account with the supplied information'
    };
    res.json(response);
  }
  else{
    var user = templateGenerator.fillUserData(account[0]);
    var response = templateGenerator.fillResponseData('/api/auth', user);
    res.json(response);
  }
}

const registerAccountFunction = function(req, res){
  var reqBody = req.body;
  var emailAccountCheck = dbCon.dbSelect('Profiles', ['email'], 'email = ' + reqBody.email);
  if(emailAccountCheck.length >= 0){
    var response = templateGenerator.fillResponseData('/api/register', undefined);
    response.status = 400;
    response.error = {
      type : 'Account already registered',
      message : 'The email used has already been registered to an account.'
    };
    res.json(response);
    return;
  }

  var invalidDiscriminators = dbCon.dbSelect('Profiles', ['discriminator'], 'username = ' + reqBody.username);
  var discrim = Math.floor(Math.random() * 10000);
  do{
    discrim = (discrim + 1) % 10000
    var shouldBreak = true;
    for(var i = 0; i < invalidDiscriminators.length; i++)
      if(discrim == invalidDiscriminators[i].discriminator)
        shouldBreak = false;
    if(shouldBreak)
      break;
  }while(true);
  var values = [reqBody.email, reqBody.password, reqBody.username, discrim, reqBody.dob];
  var columns = ['email', 'password', 'username', 'discriminator', 'dob'];
  dbCon.dbInsert('Profiles', columns, values);
  var response = templateGenerator.fillResponseData('/api/register', undefined);
  response.status = 204;
  res.json(response);
}

module.exports = {
  loginAuth : loginFunction,
  register : registerAccountFunction
}
