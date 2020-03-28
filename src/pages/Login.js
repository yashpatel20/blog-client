import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory, Link } from "react-router-dom";
import appIcon from "../images/av150.png";
import loginService from "../services/login";
import blogService from "../services/blogs";

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

const Login = () => {
  const classes = styles();

  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [notifMessage, setNotifMessage] = useState("");

  const handleUsernameChange = event => setUsername(event.target.value);
  const handlePasswordChange = event => setPassword(event.target.value);
  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      const user = await loginService.login({
        username,
        password
      });
      setLoading(false);
      window.localStorage.setItem("BlogToken", JSON.stringify(user));
      blogService.setToken(user.token);
      setUsername("");
      setPassword("");
      history.push("/");
    } catch (error) {
      setNotifMessage("Wrong credentials");
      setLoading(false);
    }
  };
  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={appIcon} className={classes.image} alt="art" />
        <Typography variant="h3" className={classes.pageTitle}>
          Login
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id="username"
            className={classes.textField}
            value={username}
            onChange={handleUsernameChange}
            label="username"
            type="text"
            helperText={notifMessage !== "" ? "Enter correct username" : ""}
            error={notifMessage !== "" ? true : false}
            fullWidth
          />
          <TextField
            id="password"
            className={classes.textField}
            value={password}
            onChange={handlePasswordChange}
            label="password"
            type="password"
            helperText={notifMessage !== "" ? "Enter correct password" : ""}
            error={notifMessage !== "" ? true : false}
            fullWidth
          />
          {notifMessage !== "" && (
            <Typography variant="body2" className={classes.unsuccessful}>
              {notifMessage}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={loading}
          >
            Login
            {loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
          <br />
          <small>
            dont have an account? sign up <Link to="/signup">here</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

Login.propTypes = {};
export default Login;
