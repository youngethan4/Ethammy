import RegisterForm from "./register";
import App from "../../App";
import React from "react";
import * as constant from "../../constants/register";
import { render, fireEvent, screen } from "../../test-utils";
import { createMemoryHistory } from "history";

const history = createMemoryHistory();
let defaultComp = <RegisterForm />;
let defaultState = {
  initialState: {
    register: {
      registered: false,
      registering: false,
      registerError: false,
    },
  },
};

describe("RegisterForm component testing", () => {
  it("Triggers register error message", () => {
    render(defaultComp, history, {
      initialState: {
        register: {
          registered: false,
          registering: false,
          registerError: true,
        },
      },
    });

    expect(
      screen.getByText(RegExp(constant.registerErrorMsg, "i"))
    ).toBeInTheDocument();
  });

  it("Triggers name error", () => {
    render(defaultComp, history, defaultState);
    fireEvent.change(screen.getByLabelText(/First Name:/i), {
      target: { value: "2" },
    });
    expect(
      screen.getByText(RegExp(constant.nameErrorMsg, "i"))
    ).toBeInTheDocument();
  });

  it("Will call the register function", () => {
    const mockRegister = jest.fn();
    let mockFuncComp = <RegisterForm registerUser={mockRegister} />;
    render(mockFuncComp, history, defaultState);

    //fill in form
    fireEvent.change(screen.getByLabelText(/First Name:/i), {
      target: { value: "Ethan" },
    });
    fireEvent.change(screen.getByLabelText(/Email:/i), {
      target: { value: "ethan4@gmail.com" },
    });
    fireEvent.change(screen.getByLabelText(/Create Username:/i), {
      target: { value: "ethan44" },
    });
    fireEvent.change(screen.getByLabelText(/Create Password:/i), {
      target: { value: "#bl@ckLivesM@TTER!" },
    });
    fireEvent.change(screen.getByLabelText(/Confrim Password:/i), {
      target: { value: "#bl@ckLivesM@TTER!" },
    });

    const createButton = screen.getByText(/Create Account/i);
    expect(createButton.disabled).toBeFalsy();
    fireEvent.click(createButton, () => {
      expect(mockRegister).toHaveBeenCalledTimes(1);
    });
  });

  it("Button will be disabled until all fields filled", () => {
    render(defaultComp, history, defaultState);

    const createButton = screen.getByText(/Create Account/i);
    fireEvent.change(screen.getByLabelText(/First Name:/i), {
      target: { value: "Ethan" },
    });
    expect(createButton.disabled).toBeTruthy();
    fireEvent.change(screen.getByLabelText(/Email:/i), {
      target: { value: "ethan4@gmail.com" },
    });
    expect(createButton.disabled).toBeTruthy();
    fireEvent.change(screen.getByLabelText(/Create Username:/i), {
      target: { value: "ethan44" },
    });
    expect(createButton.disabled).toBeTruthy();
    fireEvent.change(screen.getByLabelText(/Create Password:/i), {
      target: { value: "#bl@ckLivesM@TTER!" },
    });
    expect(createButton.disabled).toBeTruthy();
    fireEvent.change(screen.getByLabelText(/Confrim Password:/i), {
      target: { value: "#bl@ckLivesM@TTER!" },
    });
    expect(createButton.disabled).toBeFalsy();
  });

  it("Will redirect to login because already registered", () => {
    history.push("/register");
    let registeredComp = <App />;
    render(registeredComp, history, {
      initialState: {
        register: {
          registered: true,
          registering: false,
          registerError: false,
        },
        auth: {
          error: "",
          user: {},
          loggedIn: false,
          authenticating: false,
        },
      },
    });

    expect(screen.getByText(/Login to your account./i)).toBeInTheDocument();
  });
});
