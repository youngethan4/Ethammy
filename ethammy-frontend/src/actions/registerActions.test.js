import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { registerUser } from "./registerActions";
import { registerTypes } from "./types";
import codes from "../constants/httpStatusCodes";

const middleware = [thunk];
const mockStore = configureStore(middleware);
const mockRegistration = {
  name: "Bob",
  email: "bob.smith@aol.com",
  username: "bobSmith",
  password: "testing123",
};
const errorActions = [
  {
    type: registerTypes.REGISTER_REGISTERING,
    payload: true,
  },
  {
    type: registerTypes.REGISTER_ERROR,
    payload: true,
  },
];
let store;

describe("Register actions tests", () => {
  beforeEach(() => {
    fetch.resetMocks();
    store = mockStore({
      registered: false,
      registering: false,
      registerError: false,
    });
  });

  it("Creates REGISTER_SUCCESS action when no error", () => {
    fetch.once(JSON.stringify({}), { status: codes.created });

    const expectedActions = [
      {
        type: registerTypes.REGISTER_REGISTERING,
        payload: true,
      },
      {
        type: registerTypes.REGISTER_SUCCESS,
        payload: true,
      },
    ];

    return store.dispatch(registerUser(mockRegistration)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("Creates REGISTER_ERROR action when success = false", () => {
    fetch.once(JSON.stringify({ status: codes.badRequest }));
    fetch.once(JSON.stringify({}), { status: codes.badRequest });

    return store.dispatch(registerUser(mockRegistration)).then(() => {
      expect(store.getActions()).toEqual(errorActions);
    });
  });

  it("Creates REGISTER_ERROR action when rejected", () => {
    fetch.mockRejectOnce();

    return store.dispatch(registerUser(mockRegistration)).then(() => {
      expect(store.getActions()).toEqual(errorActions);
    });
  });

  it("Creates REGISTER_ERROR action when aborted", () => {
    fetch.mockAbortOnce();

    return store.dispatch(registerUser(mockRegistration)).then(() => {
      expect(store.getActions()).toEqual(errorActions);
    });
  });
});
