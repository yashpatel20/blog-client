import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory, Link } from "react-router-dom";
import appIcon from "../images/av150.png";
import userService from "../services/user";
import blogService from "../services/blogs";
import { useSelector, useDispatch } from "react-redux";
import { signupUser } from "../redux/actions/userActions";

//MUI
import Grid from "@material-ui/core/Grid";
import { makeStyles, Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = makeStyles({
  form: {
    textAlign: "center"
  },
  button: {
    marginTop: 20,
    position: "relative"
  },
  progress: {
    position: "absolute"
  },
  pageTitle: {
    margin: "10px auto 10px auto 10px"
  },
  image: {
    margin: "20px auto 20px auto"
  },
  textField: {
    margin: "10px auto 10px auto"
  },
  unsuccessful: {
    color: "red",
    fontSize: "0.8rem"
  },
  successful: {
    color: "green",
    fontSize: "0.8rem"
  }
});

const Signup = () => {
  const classes = styles();
  const history = useHistory();
  const dispatch = useDispatch();
  const ui = useSelector(state => state.UI);

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUsernameChange = event => setUsername(event.target.value);
  const handleNameChange = event => setName(event.target.value);
  const handlePasswordChange = event => setPassword(event.target.value);
  const handleConfirmPasswordChange = event =>
    setConfirmPassword(event.target.value);

  const handleSubmit = event => {
    event.preventDefault();
    const user = {
      username,
      name,
      password
    };
    dispatch(signupUser(user, history));
    setUsername("");
    setName("");
    setPassword("");
    setConfirmPassword("");
  };
  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={appIcon} className={classes.image} alt="art" />
        <Typography variant="h3" className={classes.pageTitle}>
          Sign Up
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id="username"
            className={classes.textField}
            value={username}
            onChange={handleUsernameChange}
            label="Username"
            type="text"
            helperText={ui.errors !== "" ? "username must be unique" : ""}
            error={ui.errors !== "" ? true : false}
            fullWidth
          />
          <TextField
            id="name"
            className={classes.textField}
            value={name}
            onChange={handleNameChange}
            label="Name"
            type="text"
            fullWidth
          />
          <TextField
            id="password"
            className={classes.textField}
            value={password}
            onChange={handlePasswordChange}
            label="Password"
            type="password"
            fullWidth
          />
          <TextField
            id="confirmPassword"
            className={classes.textField}
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            label="Retype password"
            type="password"
            helperText={
              confirmPassword !== password ? "passwords do not match" : ""
            }
            error={confirmPassword !== password ? true : false}
            fullWidth
          />
          {ui.errors !== "" && (
            <Typography variant="body2" className={classes.unsuccessful}>
              {ui.errors}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={ui.loading}
          >
            Signup
            {ui.loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
          <br />
          <small>
            Already have an account? Log in <Link to="/login">here</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

Signup.propTypes = {};
export default Signup;
