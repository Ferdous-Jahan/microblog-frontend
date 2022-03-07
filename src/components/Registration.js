import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { setCurrentUser, register } from "../redux/actions/authActions";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { api } from "../constants/endpoints";

function Registration() {
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (name, email, password) => {
    axios
      .post(`${api}/api/user/register`, {
        name,
        email,
        password,
      })
      .then((res) => {
        dispatch(register());
        dispatch(setCurrentUser(res.data));
        history.push("/");
      })
      .catch((err) => console.log(err));
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
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Username"
                variant="outlined"
                style={styles.textField}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                label="Password"
                variant="outlined"
                style={styles.textField}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                variant="outlined"
                color="primary"
                style={styles.textField}
                onClick={() => handleSubmit(username, email, password)}
              >
                Sign Up
              </Button>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

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
    marginBottom: ".5rem",
  },
  text: { margin: "auto" },
};

export default Registration;
