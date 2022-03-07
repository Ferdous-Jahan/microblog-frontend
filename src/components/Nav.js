import React from "react";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/authActions";
import { useHistory } from "react-router-dom";

const Nav = () => {
  const name = useSelector((state) => state.auth.username);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <Paper style={styles.parentFlexItems}>
        <div style={styles.siteName} onClick={() => history.push("/")}>
          MicroBlog
        </div>
        <div style={styles.childFlexItems}>
          <p>{name}</p>
          <Button
            variant="outlined"
            color="secondary"
            style={styles.button}
            onClick={() => handleLogout()}
          >
            Logout
          </Button>
        </div>
      </Paper>
    </div>
  );
};

const styles = {
  siteName: {
    alignSelf: "center",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "2rem",
  },
  parentFlexItems: {
    display: "flex",
    padding: "1rem",
    justifyContent: "space-between",
  },
  childFlexItems: {
    display: "flex",
  },
  button: {
    marginLeft: ".5rem",
  },
};

export default Nav;
