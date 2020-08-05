import AccountStore from "./account.store.js";
import statusCode from "../constants/httpSatusCodes.js";

const userRegistration = {
  name: "Bob",
  email: "bob.smith@aol.com",
  username: "bobSmith",
  password: "testing123",
};
const userCredentials = {
  email: "bob.smith@aol.com",
  password: "testing123",
};

describe("Account testing", () => {
  it("Registers, logs in, and deletes a user", async () => {
    let error = false;
    let res;
    try {
      res = await AccountStore.register({ body: userRegistration });
      expect(res.status).toEqual(statusCode.created);
      res = await AccountStore.login({ body: userCredentials });
      expect(res.status).toEqual(statusCode.ok);
      let userid = res.body.id;
      res = await AccountStore.remove(userid);
      expect(res.status).toEqual(statusCode.ok);
    } catch (err) {
      console.error(err);
      error = true;
    }
    expect(error).toEqual(false);
  });
});
