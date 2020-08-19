import { registerTypes } from "./types";
import { hashPassword } from "../helpers/passwordHash.js";
import { APIRegister } from "../helpers/api";
import codes from "../constants/httpStatusCodes";

export const registerUser = (details) => async (dispatch) => {
  dispatch({
    type: registerTypes.REGISTER_REGISTERING,
    payload: true,
  });
  let registrationDetails = {
    ...details,
    password: hashPassword(details.password),
  };
  try {
    const res = await APIRegister(registrationDetails);
    if (res.status === codes.created) {
      dispatch({
        type: registerTypes.REGISTER_SUCCESS,
        payload: true,
      });
    } else {
      throw new Error("Error with backend.");
    }
  } catch (error) {
    dispatch({
      type: registerTypes.REGISTER_ERROR,
      payload: true,
    });
    console.error(error);
  }
};
