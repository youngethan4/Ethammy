import AccountStore from "./account.store";
import Database from "../exports/dbAccess";

const userRegistration = {
  name: "Bob",
  email: "bob.smith@aol.com",
  username: "bobSmith",
  password: "testing123",
};

describe("Account database tests", () => {
  afterEach(() => {
    try {
      Database.dbDelete("users", "email = " + user.userRegistration.email);
    } catch (e) {}
  });

  it('retrieves a user', () => {
    AccountStore.register()
  });
});
