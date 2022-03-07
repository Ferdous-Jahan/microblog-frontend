import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPost, creatingPost } from "../redux/actions/postActions";

const Home = () => {
  const [post, setPost] = useState();
  const [paperHovered, setPaperHovered] = useState();
  const posts = useSelector((state) => state.post.posts);
  const loading = useSelector((state) => state.post.loading);
  const name = useSelector((state) => state.auth.username);
  const userId = useSelector((state) => state.auth.id);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPost());
  }, [dispatch]);

  const onClick = (id) => {
    history.push(`/post/${id}`, { id: id });
  };

  const onSubmit = (body, name, userId) => {
    setPost("");
    dispatch(creatingPost(body, userId, name));
  };
  return (
    <div>
      {loading ? (
        <h1>LOADING</h1>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={11} md={10} style={styles.gridItem}>
            <Paper elevation={3} variant="outlined">
              <div style={styles.parentFlexItems}>
                <TextField
                  label="New Post..."
                  variant="outlined"
                  multiline={true}
                  fullWidth={true}
                  onChange={(e) => setPost(e.target.value)}
                />
                <div style={styles.buttons}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    style={{ marginRight: ".5rem" }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      dispatch(fetchPost());
                      onSubmit(post, name, userId);
                    }}
                  >
                    Post
                  </Button>
                </div>
              </div>
            </Paper>
          </Grid>
          {posts &&
            posts.map((post) => (
              <Grid
                item
                xs={12}
                sm={11}
                md={10}
                style={styles.gridItem}
                key={post._id}
              >
                <Paper
                  onClick={() => onClick(post._id)}
                  elevation={3}
                  variant="outlined"
                  style={
                    paperHovered == post._id
                      ? styles.paperHovered
                      : styles.paper
                  }
                  onMouseEnter={() => setPaperHovered(post._id)}
                  onMouseLeave={() => setPaperHovered("")}
                >
                  <div style={styles.parentFlexItems}>
                    <h3 style={{ marginBottom: "0px" }}>{post.name}</h3>
                    <p style={{ marginTop: "0px" }}>{post.createdAt}</p>
                    <h5>{post.body}</h5>
                    <div style={styles.childFlexItems}>
                      <p style={styles.reacts}>{post.likes.length} likes</p>
                      <p style={styles.reacts}>
                        {post.dislikes.length} dislikes
                      </p>
                      <p style={styles.reacts}>
                        {post.comments.length} comments
                      </p>
                    </div>
                  </div>
                </Paper>
              </Grid>
            ))}
        </Grid>
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
  gridItem: {
    paddingTop: "2rem",
    margin: "auto",
  },
  buttons: {
    paddingTop: "1rem",
    display: "flex",
    justifyContent: "flex-end",
  },
  textField: {
    height: "70vh",
  },
  paper: {
    cursor: "pointer",
  },
  paperHovered: {
    cursor: "pointer",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  },
};

export default Home;
