import { authTypes } from "./types";
import { hashPassword } from "../helpers/passwordHash";
import { APIAuth } from "../helpers/api";

export const authUser = (email, password) => async (dispatch) => {
  dispatch({
    type: authTypes.AUTH_AUTHENTICATING,
    payload: true,
  });

  const credentials = {
    email: email,
    password: hashPassword(password),
  };

  try {
    const res = await APIAuth(credentials);
    const data = await res.json();
    if (res.status === 200) {
      dispatch({
        type: authTypes.AUTH_SUCCESS,
        payload: true,
        user: data,
      });
      localStorage.setItem("user", JSON.stringify(data));
    } else {
      throw new Error();
    }
  } catch (error) {
    dispatch({
      type: authTypes.AUTH_ERROR,
      payload: "Invalid email or password.",
    });
  }
};
