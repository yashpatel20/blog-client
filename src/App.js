import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import jwtDecode from "jwt-decode";
import blogService from "./services/blogs";

//MUI
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
const theme = createMuiTheme({
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
  }
});

//check if a user is already logged in and the token has not expired
let auth;
const user = JSON.parse(window.localStorage.getItem("BlogToken"));
if (user) {
  const decodedToken = jwtDecode(user.token);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = "/login";
    auth = false;
    window.localStorage.removeItem("BlogToken");
  } else auth = true;
} else auth = false;

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <div className="container">
          <Switch>
            <Route path="/login">
              {auth === false ? <Login /> : <Redirect to="/signup" />}
            </Route>
            <Route path="/signup">
              {auth === false ? <Signup /> : <Redirect to="/" />}
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
