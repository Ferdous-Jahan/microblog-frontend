import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { setCurrentUser } from "../redux/actions/authActions";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { api } from "../constants/endpoints";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    axios
      .post(`${api}/api/user/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data) {
          dispatch(setCurrentUser(res.data));
          history.push("/");
        } else {
          console.log("User not found");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div style={styles.gridContainer}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={6} lg={4} style={styles.gridItem}>
          <Paper elevation={3} variant="outlined">
            <div style={styles.paperContainer}>
              <TextField
                label="Email"
                variant="outlined"
                style={styles.textField}
                onChange={(e) => handleEmail(e)}
              />
              <TextField
                label="Password"
                variant="outlined"
                style={styles.textField}
                onChange={(e) => handlePassword(e)}
              />
              <Button
                variant="outlined"
                color="primary"
                style={styles.textField}
                onClick={() => handleLogin(email, password)}
              >
                Login
              </Button>
              <p style={styles.text}>
                Don't have an account? <a href="/registration">Sign Up!</a>
              </p>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

const styles = {
  gridContainer: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  gridItem: {
    margin: "auto",
  },
  paperContainer: {
    display: "flex",
    flexDirection: "column",
    padding: "2rem",
  },
  textField: {
    margin: ".5rem",
  },
  text: { margin: "auto" },
};

export default Login;
