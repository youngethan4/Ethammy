import LoginForm from "./login";
import App from "../../App";
import React from "react";
import { render, fireEvent, screen } from "../../test-utils";
import { createMemoryHistory } from "history";

const history = createMemoryHistory();
let defaultComp = <LoginForm />;
let defaultState = {
  initialState: {
    auth: {
      error: "",
      user: {},
      loggedIn: false,
      authenticating: false,
    },
  },
};

describe("LoginForm tests", () => {
  it("Displays an error when needed", () => {
    const errorMsg = "OH NO! An Error!!!";

    render(defaultComp, history, {
      initialState: {
        auth: {
          error: errorMsg,
          user: {},
          loggedIn: false,
          authenticating: false,
        },
      },
    });

    expect(screen.getByText(RegExp(errorMsg, "i"))).toBeInTheDocument();
  });

  it("Calls the authUser function", () => {
    const mockAuth = jest.fn();
    let mockFuncComp = <LoginForm authUser={mockAuth} />;
    render(mockFuncComp, history, defaultState);

    fireEvent.change(screen.getByLabelText(/Email:/i), {
      target: { value: "ethan4@gmail.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password:/i), {
      target: { value: "#bl@ckLivesM@TTER!" },
    });

    const loginButton = screen.getByText(/Log In/i);
    fireEvent.click(loginButton, () => {
      expect(mockAuth).toHaveBeenCalledTimes(1);
    });
  });

  it("Redirects when logged in", () => {
    history.push("/login");
    let loggedInComp = <App />;
    render(loggedInComp, history, {
      initialState: {
        register: {
          registered: true,
          registering: false,
          registerError: false,
        },
        auth: {
          error: "",
          user: { id: 1234, name: "bob" },
          loggedIn: true,
          authenticating: false,
        },
      },
    });

    expect(screen.getByText(/Welcome to Ethammy!!!/i)).toBeInTheDocument();
  });
});
