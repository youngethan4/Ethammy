import AccountStore from '../store/account.store';

const login = async (req, res) => {
  try {
    let payload = await AccountStore.login(req);
    res.status(200).send(payload);
  } catch (exception) {
    res.status(500).send(exception);
  }
}

const register = async (req, res) => {
  try {
    let payload = await AccountStore.register(req);
    res.status(payload.status).send(payload);
  } catch (exception) {
    res.status(500).send(exception);
  }
}

module.exports = {
  login,
  register
}
