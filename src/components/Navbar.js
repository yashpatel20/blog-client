import React, { Fragment } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import PostBlog from "./PostBlog";
import "./Navbar.css";
import "../App.css";

//mui
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import HomeIcon from "@material-ui/icons/Home";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import IconButton from "@material-ui/core/IconButton";

const Navbar = () => {
  const authenticated = useSelector(state => state.user.authenticated);
  const username = useSelector(state => state.user.username);
  return (
    <AppBar>
      <Toolbar className="nav-container">
        {authenticated ? (
          <Fragment>
            <PostBlog />
            <Link to="/">
              <Tooltip title="Home" placement="top">
                <IconButton>
                  <HomeIcon />
                </IconButton>
              </Tooltip>
            </Link>
            <Link to={`/user/${username}`}>
              <Tooltip title="Account" placement="top">
                <IconButton>
                  <AccountCircleIcon />
                </IconButton>
              </Tooltip>
            </Link>
          </Fragment>
        ) : (
          <Fragment>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Signup
            </Button>
          </Fragment>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
