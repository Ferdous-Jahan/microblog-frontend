import { SET_CURRENT_USER, REMOVE_CURRENT_USER } from "../actions/types";

const initialState = {
  isLoggedIn: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        email: action.data.email,
        username: action.data.name,
        id: action.data._id,
        isLoggedIn: true,
      };
    case REMOVE_CURRENT_USER:
      return {
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default authReducer;
