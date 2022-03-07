import axios from "axios";
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
import { api } from "../../constants/endpoints";

export const fetchAllPost = () => {
  return {
    type: FETCH_ALL_POST,
  };
};

export const fetchAllPostFailed = () => {
  return {
    type: FETCH_ALL_POST_FAILED,
  };
};

export const storeAllPost = (data) => {
  return {
    type: STORE_ALL_POST,
    data: data,
  };
};

export const fetchOnePost = () => {
  return {
    type: FETCH_ONE_POST,
  };
};

export const fetchOnePostFailed = () => {
  return {
    type: FETCH_ONE_POST_FAILED,
  };
};

export const storeOnePost = (data) => {
  return {
    type: STORE_ONE_POST,
    data: data,
  };
};

export const createPost = (data) => {
  return {
    type: CREATE_POST,
    data: data,
  };
};

export const commentOnPost = () => {
  return {
    type: COMMENT,
  };
};

export const like = () => {
  return {
    type: LIKE,
  };
};

export const dislike = () => {
  return {
    type: DISLIKE,
  };
};

export const fetchPost = () => (dispatch) => {
  dispatch(fetchAllPost());
  axios
    .get(`${api}/api/post/`)
    .then((res) =>
      res.data
        ? dispatch(storeAllPost(res.data))
        : dispatch(fetchAllPostFailed())
    )
    .catch((err) => console.log(err));
};

export const fetchPostById = (id) => (dispatch) => {
  dispatch(fetchOnePost());
  axios
    .get(`${api}/api/post/${id}`)
    .then((res) =>
      res.data
        ? dispatch(storeOnePost(res.data))
        : dispatch(fetchOnePostFailed())
    )
    .catch((err) => console.log(err));
};

export const creatingPost = (body, userId, name) => (dispatch) => {
  axios
    .post(`${api}/api/post/create`, {
      body: body,
      userId: userId,
      name: name,
    })
    .then((res) => {
      dispatch(createPost(res));
      dispatch(fetchPost());
    })
    .catch((err) => console.log(err));
};

export const commentPost = (name, userId, comment, postId) => (dispatch) => {
  axios
    .post(`${api}/api/post/comment/${postId}`, {
      name,
      userId,
      comment,
    })
    .then((res) => {
      dispatch(commentOnPost());
      dispatch(fetchPostById(postId));
    })
    .catch((err) => console.log(err));
};

export const likePost = (userId, postId) => (dispatch) => {
  axios
    .post(`${api}/api/post/like/${postId}`, {
      userId,
    })
    .then((res) => {
      dispatch(like());
      dispatch(fetchPostById(postId));
    })
    .catch((err) => console.log(err));
};

export const dislikePost = (userId, postId) => (dispatch) => {
  axios
    .post(`${api}/api/post/dislike/${postId}`, {
      userId,
    })
    .then((res) => {
      dispatch(dislike());
      dispatch(fetchPostById(postId));
    })
    .catch((err) => console.log(err));
};
