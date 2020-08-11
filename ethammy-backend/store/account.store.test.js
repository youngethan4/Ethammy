import AccountStore from "./account.store.js";
import statusCode from "../constants/httpSatusCodes.js";
import { pool } from "../util/dbAccess.js";

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
      let userid = res.res.id;
      res = await AccountStore.remove(userid);
      expect(res.status).toEqual(statusCode.ok);
    } catch (err) {
      console.error(err);
      error = true;
    } finally {
      expect(error).toEqual(false);
    }
  });

  it("Errors on login without account", async () => {
    let error = false;
    let res;
    try {
      res = await AccountStore.login({ body: userCredentials });
      expect(res.status).toEqual(statusCode.notFound);
    } catch (err) {
      console.error(err);
      error = true;
    } finally {
      expect(error).toEqual(false);
    }
  });

  it("Email exsists", async () => {
    let error = false;
    let res;
    try {
      await AccountStore.register({ body: userRegistration });
      res = await AccountStore.register({ body: userRegistration });
      expect(res.status).toEqual(statusCode.forbidden);
    } catch (err) {
      console.error(err);
      error = true;
    } finally {
      expect(error).toEqual(false);
      error = false;
      try {
        res = await AccountStore.login({ body: userCredentials });
        expect(res.status).toEqual(statusCode.ok);
        let userid = res.res.id;
        res = await AccountStore.remove(userid);
        expect(res.status).toEqual(statusCode.ok);
      } catch (err) {
        console.error(err);
        error = true;
      } finally {
        expect(error).toEqual(false);
      }
    }
  });

  it("Username exsists -> unique discriminator needed", async () => {
    const userRegistrationSameUsername = {
      ...userRegistration,
      email: "bob.smith1@aol.com"
    };
    const userCredentialsSameUsername = {
      ...userCredentials,
      email: "bob.smith1@aol.com",
    };
    let error = false;
    let res;
    try {
      debugger;
      await AccountStore.register({ body: userRegistration });
      res = await AccountStore.register({ body: userRegistrationSameUsername });
      expect(res.status).toEqual(statusCode.created);
      let registeredUser1 = await AccountStore.login({ body: userCredentials });
      let registeredUser2 = await AccountStore.login({
        body: userCredentialsSameUsername,
      });
      expect(
        registeredUser1.res.discriminator === registeredUser2.res.discriminator
      ).toEqual(false);
      res = await AccountStore.remove(registeredUser1.res.id);
      expect(res.status).toEqual(statusCode.ok);
      res = await AccountStore.remove(registeredUser2.res.id);
      expect(res.status).toEqual(statusCode.ok);
    } catch (err) {
      console.error(err);
      error = true;
    } finally {
      expect(error).toEqual(false);
    }
  });

  afterAll(() => {
    pool.end();
  });
});
