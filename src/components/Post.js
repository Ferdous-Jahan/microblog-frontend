import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import IconButton from "@material-ui/core/IconButton";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPostById,
  commentPost,
  likePost,
  dislikePost,
} from "../redux/actions/postActions";

const Post = () => {
  const [comment, setComment] = useState();
  const loading = useSelector((state) => state.post.loading);
  const name = useSelector((state) => state.auth.username);
  const userId = useSelector((state) => state.auth.id);
  const post = useSelector((state) => state.post.postById);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchPostById(history.location.state.id));
  }, [dispatch, history.location.state.id]);

  const onSubmit = (name, userId, comment, postId) => {
    dispatch(commentPost(name, userId, comment, postId));
  };

  const handleLike = (userId) => {
    dispatch(likePost(userId, post._id));
  };

  const handleDislike = (userId) => {
    dispatch(dislikePost(userId, post._id));
  };

  return (
    <div>
      {loading ? (
        <h1>LOADING</h1>
      ) : (
        post && (
          <Grid container spacing={3}>
            <Grid
              item
              xs={12}
              sm={11}
              md={10}
              style={styles.gridItem}
              key={post._id}
            >
              <Paper elevation={3} variant="outlined" style={styles.paper}>
                <div style={styles.parentFlexItems}>
                  <h3 style={{ marginBottom: "0px" }}>{post.name}</h3>
                  <p style={{ marginTop: "0px" }}>{post.createdAt}</p>
                  <h5>{post.body}</h5>
                  <div style={styles.childFlexItems}>
                    <p style={styles.reacts}>
                      <IconButton
                        color="primary"
                        aria-label="like"
                        component="span"
                        onClick={() => handleLike(userId)}
                        disabled={true && post.likes.includes(userId)}
                      >
                        <ThumbUpAltIcon />
                      </IconButton>
                      {post.likes.length}
                    </p>
                    <p style={styles.reacts}>
                      <IconButton
                        color="primary"
                        aria-label="dislike"
                        component="span"
                        disabled={true && post.dislikes.includes(userId)}
                        onClick={() => handleDislike(userId)}
                      >
                        <ThumbDownAltIcon />
                      </IconButton>
                      {post.dislikes.length}
                    </p>
                    <p style={styles.reacts}>
                      <IconButton
                        color="primary"
                        aria-label="dislike"
                        component="span"
                        disabled
                      >
                        <QuestionAnswerIcon />
                      </IconButton>
                      {post.comments.length}
                    </p>
                  </div>
                </div>
              </Paper>
              <h1>Comments</h1>
            </Grid>
            <Grid item xs={12} sm={11} md={10} style={styles.gridItem}>
              <TextField
                label="Comment..."
                variant="outlined"
                multiline={true}
                fullWidth={true}
                onChange={(e) => setComment(e.target.value)}
              />
              <div style={styles.buttons}>
                <Button
                  variant="outlined"
                  color="secondary"
                  style={{ marginRight: ".5rem" }}
                  onClick={() => {
                    setComment("");
                    dispatch(fetchPostById(history.location.state.id));
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    setComment("");
                    comment && onSubmit(name, userId, comment, post._id);
                  }}
                >
                  Comment
                </Button>
              </div>
            </Grid>
            <Grid item xs={12} sm={11} md={10} style={styles.gridItem}>
              <Paper elevation={3} variant="outlined">
                {post.comments.map((comment) => (
                  <>
                    <div style={styles.parentFlexItems} key={comment._id}>
                      <h3>{comment.name}</h3>
                      <h5>{comment.comment}</h5>
                    </div>
                    <Divider />
                  </>
                ))}
              </Paper>
            </Grid>
          </Grid>
        )
      )}
    </div>
  );
};

const styles = {
  parentFlexItems: {
    display: "flex",
    flexDirection: "column",
    padding: "1rem",
  },
  childFlexItems: {
    display: "flex",
  },
  reacts: {
    marginRight: "1rem",
  },
  buttons: {
    paddingTop: "1rem",
    display: "flex",
    justifyContent: "flex-end",
  },
  gridItem: {
    paddingTop: "2rem",
    margin: "auto",
  },
  paper: {
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  },
};

export default Post;
