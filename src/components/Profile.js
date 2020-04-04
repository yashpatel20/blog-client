import React from "react";
import { useDispatch, useSelector } from "react-redux";
import appIcon from "../images/avatar.png";
import { Link } from "react-router-dom";
import { logoutUser } from "../redux/actions/userActions";

//MUI
import { makeStyles, Button, Toolbar, IconButton } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import MuiLink from "@material-ui/core/Link";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";
import Tooltip from "@material-ui/core/Tooltip";

const styles = makeStyles({
  palette: {
    primary: {
      light: "#33c9dc",
      main: "#00bcd4",
      dark: "#008394",
      contrastText: "#fff"
    },
    secondary: {
      light: "#ff6333",
      main: "#ff3d00",
      dark: "#b22a00",
      contrastText: "#fff"
    }
  },
  typography: {
    useNextVariants: true
  },
  form: {
    textAlign: "center"
  },
  image: {
    margin: "20px auto 20px auto"
  },
  pageTitle: {
    margin: "10px auto 10px auto"
  },
  textField: {
    margin: "10px auto 10px auto"
  },
  button: {
    marginTop: 20,
    position: "relative"
  },
  customError: {
    color: "red",
    fontSize: "0.8rem",
    marginTop: 10
  },
  progress: {
    position: "absolute"
  },
  invisibleSeparator: {
    border: "none",
    margin: 4
  },
  visibleSeparator: {
    width: "100%",
    borderBottom: "1px solid rgba(0,0,0,0.1)",
    marginBottom: 20
  },
  paper: {
    padding: 20
  },
  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
      "& button": {
        position: "absolute",
        top: "80%",
        left: "70%"
      }
    },
    "& .profile-image": {
      width: 200,
      height: 220,
      objectFit: "cover",
      maxWidth: "100%",
      borderRadius: "50%"
    },
    "& .profile-details": {
      textAlign: "center",
      "& span, svg": {
        verticalAlign: "middle"
      },
      "& a": {
        color: "#00bcd4"
      }
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0"
    },
    "& svg.button": {
      "&:hover": {
        cursor: "pointer"
      }
    }
  },
  buttons: {
    textAlign: "center",
    "& a": {
      margin: "20px 10px"
    }
  }
});

const Profile = () => {
  const dispatch = useDispatch();
  const classes = styles(); //mui
  const { username, name, id, blogs, loading, authenticated } = useSelector(
    state => state.user
  );

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  let profileMarkup = !loading ? (
    authenticated ? (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="image-wrapper">
            <img src={appIcon} alt="profile" className="profile-image" />
          </div>
          <hr />
          <div className="profile-details">
            <MuiLink
              component={Link}
              to={`/user/${username}`}
              color="primary"
              variant="h5"
            >
              @{username}
            </MuiLink>
            <hr />
            <Typography>{name}</Typography>
            <hr />
            <Typography>{id}</Typography>
            <hr />
          </div>
          <Link to="/">
            <Tooltip title="Logout" placement="top">
              <IconButton onClick={handleLogout}>
                <KeyboardReturn color="primary" />
              </IconButton>
            </Tooltip>
          </Link>
        </div>
      </Paper>
    ) : (
      <Paper className={classes.paper}>
        <Typography variant="body2" align="center">
          No profile found, please login again
        </Typography>
        <div className={classes.buttons}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/login"
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/signup"
          >
            Sign up
          </Button>
        </div>
      </Paper>
    )
  ) : (
    <p>Loading....</p>
  );

  return profileMarkup;
};

export default Profile;
