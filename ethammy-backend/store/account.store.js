import dbCon from "../exports/dbAccess";

const login = (req) => {
  let reqBody = req.body;
  let email = reqBody.email;
  let password = reqBody.password;
  let sqlCondition = "email = " + email + " AND password = " + password;

  new Promise(dbCon.dbSelect("Profiles", ["*"], sqlCondition))
    .then((account) => {
      if (account.length != 1) {
        var response = templateGenerator.fillResponseData(
          "/api/auth",
          undefined
        );
        response.status = 400;
        response.error = {
          type: "Invalid Account Info",
          message:
            "Unable to locate the requested account with the supplied information",
        };
        return response;
      } else {
        var user = templateGenerator.fillUserData(account[0]);
        var response = templateGenerator.fillResponseData("/api/auth", user);
        return response;
      }
    })
    .catch((err) => {
      throw err;
    });
};

const register = (req) => {
  var reqBody = req.body;
  (new Promise(checkEmailExsits))
    .then((exist) => {
        if(exist == 1){
            var response = templateGenerator.fillResponseData(
                "/api/register",
                undefined
              );
              response.status = 400;
              response.error = {
                type: "Account already registered",
                message: "The email used has already been registered to an account.",
              };
              return response;
        }
    })
    .then(generateDisriminator)
  if (emailAccountCheck.length >= 0) {
    
  }

  var invalidDiscriminators = dbCon.dbSelect(
    "Profiles",
    ["discriminator"],
    "username = " + reqBody.username
  );
  var discrim = Math.floor(Math.random() * 10000);
  do {
    discrim = (discrim + 1) % 10000;
    var shouldBreak = true;
    for (var i = 0; i < invalidDiscriminators.length; i++)
      if (discrim == invalidDiscriminators[i].discriminator)
        shouldBreak = false;
    if (shouldBreak) break;
  } while (true);
  var values = [
    reqBody.email,
    reqBody.password,
    reqBody.username,
    discrim,
    new Date()
  ];
  var columns = ["email", "password", "username", "discriminator", "joined"];
  dbCon.dbInsert("users", columns, values);
  var response = templateGenerator.fillResponseData("/api/register", undefined);
  response.status = 204;
  res.json(response);
};

const checkEmailExsits = (email) => {
    return dbCon.dbCount(
        "users",
        "email",
        "email = " + email
    );
}

generateDisriminator = (invalidDiscriminators) => {

}

module.exports = {
  login,
  register,
};
