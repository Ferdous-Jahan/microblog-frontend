import {
  FETCH_ALL_POST,
  FETCH_ALL_POST_FAILED,
  STORE_ALL_POST,
  FETCH_ONE_POST,
  FETCH_ONE_POST_FAILED,
  STORE_ONE_POST,
  CREATE_POST,
  COMMENT,
  LIKE,
  DISLIKE,
} from "../actions/types";

const postReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_ALL_POST:
      return {
        ...state,
        loading: true,
      };
    case STORE_ALL_POST:
      return {
        ...state,
        posts: action.data,
        loading: false,
      };
    case FETCH_ALL_POST_FAILED:
      return {
        ...state,
        loading: false,
      };
    case FETCH_ONE_POST:
      return {
        ...state,
        loading: true,
      };
    case STORE_ONE_POST:
      return {
        ...state,
        postById: action.data,
        loading: false,
      };
    case FETCH_ONE_POST_FAILED:
      return {
        ...state,
        loading: false,
      };
    case CREATE_POST:
      return {
        ...state,
      };
    case COMMENT:
      return {
        ...state,
      };
    case LIKE:
      return {
        ...state,
      };
    case DISLIKE:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default postReducer;
