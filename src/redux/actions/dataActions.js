import {
  SET_BLOGS,
  LIKE_BLOG,
  UNLIKE_BLOG,
  LOADING_DATA,
  LOADING_UI,
  POST_BLOG,
  CLEAR_ERRORS,
  SET_USER,
  DELETE_BLOG,
  SET_BLOG,
  STOP_LOADING_UI
} from "../types";
import blogService from "../../services/blogs";
import userService from "../../services/user";

export const getBlogs = () => async dispatch => {
  dispatch({ type: LOADING_DATA });
  try {
    const blogs = await blogService.getAll();
    dispatch({
      type: SET_BLOGS,
      payload: blogs
    });
  } catch (error) {
    console.log(error);
  }
};

export const getBlog = id => async dispatch => {
  dispatch({ type: LOADING_UI });
  try {
    const blog = await blogService.getBlog(id);
    console.log(blog);
    dispatch({
      type: SET_BLOG,
      payload: blog
    });
    dispatch({ type: STOP_LOADING_UI });
  } catch (error) {
    dispatch({ type: STOP_LOADING_UI });
    console.log(error);
  }
};

//Post a blog
export const postBlog = newBlog => async dispatch => {
  dispatch({ type: LOADING_UI });
  const blogObject = {
    ...newBlog,
    likedBy: []
  };
  try {
    const response = await blogService.create(blogObject);
    dispatch({ type: POST_BLOG, payload: response });
    dispatch({ type: CLEAR_ERRORS });
  } catch (error) {
    console.log(error);
  }
};

export const likeBlog = (blogId, blogObject, userId) => async dispatch => {
  try {
    const response = await blogService.like(blogId, blogObject);
    const blogs = await blogService.getAll();
    const user = await userService.getUserByID(userId);
    dispatch({
      type: LIKE_BLOG,
      payload: blogs
    });
    dispatch({
      type: SET_USER,
      payload: user
    });
  } catch (error) {
    console.log(error);
  }
};

export const unlikeBlog = (blogId, blogObject, userId) => async dispatch => {
  try {
    const response = await blogService.unlike(blogId, blogObject);
    const blogs = await blogService.getAll();
    const user = await userService.getUserByID(userId);
    dispatch({
      type: UNLIKE_BLOG,
      payload: blogs
    });
    dispatch({
      type: SET_USER,
      payload: user
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteBlog = blogId => async dispatch => {
  try {
    const response = await blogService.deleteReq(blogId);
    dispatch({ type: DELETE_BLOG, payload: blogId });
  } catch (error) {
    console.log(error);
  }
};
