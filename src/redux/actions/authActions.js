import { SET_CURRENT_USER, REMOVE_CURRENT_USER, REGISTER_USER } from "./types";

export const setCurrentUser = (data) => {
  return {
    type: SET_CURRENT_USER,
    data: data,
  };
};

export const logout = () => {
  return {
    type: REMOVE_CURRENT_USER,
  };
};

export const register = () => {
  return {
    type: REGISTER_USER,
  };
};
