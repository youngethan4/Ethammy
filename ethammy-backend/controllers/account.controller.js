import AccountStore from "../store/account.store.js";
import responseTemplate from "../util/responseTemplate.js";
import statusCode from "../constants/httpSatusCodes.js";

const getServerErrorResponse = () => {
  let message = "Server Error";
  let description =
    "An internal server error has ocurred. Please contact us about this issue.";
  return JSON.stringify(responseTemplate.error(message, description));
};

const login = async (req, res) => {
  try {
    let payload = await AccountStore.login(req);
    res.status(payload.status).send(JSON.stringify(payload.res));
  } catch (exception) {
    res.status(statusCode.serverError).send(getServerErrorResponse());
  }
};

const register = async (req, res) => {
  try {
    let payload = await AccountStore.register(req);
    res.status(payload.status).send(JSON.stringify(payload.res));
  } catch (exception) {
    res.status(statusCode.serverError).send(getServerErrorResponse());
  }
};

const remove = async (req, res) => {
  try {
    let payload = await AccountStore.remove(req.params.id);
    res.status(payload.status).send(JSON.stringify(payload.res));
  } catch (exception) {
    res.status(statusCode.serverError).send(getServerErrorResponse());
  }
};

export default {
  login,
  register,
};
