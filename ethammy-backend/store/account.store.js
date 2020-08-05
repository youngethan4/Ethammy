import responseTemplate from "../util/responseTemplate.js";
import statusCode from "../constants/httpSatusCodes.js";
import AccountModel from "../models/account.model.js";

const login = async (req) => {
  let reqBody = req.body;
  let account;
  try {
    account = await AccountModel.checkUserLogin(reqBody);
  } catch (err) {
    throw err;
  }
  if (account.length != 1) {
    let errorMessage = "Login failed.";
    let errorDescription = "Login attempted with invalid credentials.";
    return {
      status: statusCode.notFound,
      res: new responseTemplate.error(errorMessage, errorDescription),
    };
  } else {
    return {
      status: statusCode.ok,
      res: account,
    };
  }
};

const register = async (req) => {
  let reqBody = req.body;
  let email = reqBody.email;
  let username = reqBody.username;
  try {
    let emailExists = await AccountModel.checkEmail(email);
    if (emailExists > 0) {
      let errorMessage = "Email already associated to an account";
      let errorDescription = "The email provided has an account linked to it.";
      return {
        status: statusCode.forbidden,
        res: new responseTemplate.error(errorMessage, errorDescription),
      };
    }
    let matchedUsernameDiscriminators = await AccountModel.getMatchingUsernameDiscriminators(
      username
    );
    let discriminator = generateDisriminator(matchedUsernameDiscriminators);
    await AccountModel.addUser(reqBody, discriminator);
    return {
      status: statusCode.created,
      res: {},
    };
  } catch (err) {
    throw err;
  }
};

const remove = async (id) => {
  try {
    await AccountModel.deleteUser(id);
    return {
      status: statusCode.ok,
      res: {},
    };
  } catch (err) {
    throw err;
  }
};

const generateDisriminator = (invalidDiscriminators) => {
  let discrim = Math.floor(Math.random() * 10000);
  let isUnique = false;
  do {
    discrim = (discrim + 1) % 10000;
    let foundDuplicate = false;
    for (var i = 0; i < invalidDiscriminators.length; i++)
      if (discrim == invalidDiscriminators[i].discriminator)
        foundDuplicate = true;
    if (!foundDuplicate) isUnique = true;
  } while (!isUnique);
  return discrim;
};

export default {
  login,
  register,
  remove,
};
