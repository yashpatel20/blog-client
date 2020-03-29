import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER
} from "../types";
import userService from "../../services/user";
import loginService from "../../services/login";
import blogService from "../../services/blogs";

export const loginUser = (userData, history) => async dispatch => {
  dispatch({ type: LOADING_UI });
  try {
    const user = await loginService.login(userData);
    // setLoading(false);
    window.localStorage.setItem("BlogToken", JSON.stringify(user));
    blogService.setToken(user.token);
    dispatch(getUserData(user.id));
    dispatch({
      type: CLEAR_ERRORS
    });
    history.push("/");
  } catch (error) {
    dispatch({
      type: SET_ERRORS,
      payload: "Wrong credentials"
    });
  }
};

export const signupUser = (userData, history) => async dispatch => {
  dispatch({ type: LOADING_UI });
  try {
    const user = await userService.signup(userData);
    window.localStorage.setItem("BlogToken", JSON.stringify(user));
    blogService.setToken(user.token);
    dispatch(getUserData(user.id));
    dispatch({
      type: CLEAR_ERRORS
    });
    history.push("/");
  } catch (error) {
    dispatch({
      type: SET_ERRORS,
      payload: "Username must be unique"
    });
  }
};

//logout
export const logoutUser = () => dispatch => {
  window.localStorage.removeItem("BlogToken");
  blogService.setToken("");
  dispatch({ type: SET_UNAUTHENTICATED });
};

export const getUserData = id => async dispatch => {
  dispatch({ type: LOADING_USER });
  try {
    const user = await userService.getUserByID(id);
    console.log(user);
    dispatch({
      type: SET_USER,
      payload: user
    });
  } catch (error) {
    console.log(error);
  }
};
