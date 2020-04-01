import {
  SET_BLOGS,
  LIKE_BLOG,
  UNLIKE_BLOG,
  LOADING_DATA,
  LOADING_UI,
  POST_BLOG,
  CLEAR_ERRORS
} from "../types";
import blogService from "../../services/blogs";

export const getBlogs = () => async dispatch => {
  dispatch({ type: LOADING_DATA });
  try {
    const blogs = await blogService.getAll();
    blogs.sort((a, b) => a.likes - b.likes);
    dispatch({
      type: SET_BLOGS,
      payload: blogs
    });
  } catch (error) {
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

export const likeBlog = (blogId, blogObject) => async dispatch => {
  try {
    const response = await blogService.like(blogId, blogObject);
    const blogs = await blogService.getAll();
    blogs.sort((a, b) => a.likes - b.likes);
    dispatch({
      type: LIKE_BLOG,
      payload: blogs
    });
  } catch (error) {
    console.log(error);
  }
};

export const unlikeBlog = (blogId, blogObject) => async dispatch => {
  try {
    const response = await blogService.unlike(blogId, blogObject);
    const blogs = await blogService.getAll();
    blogs.sort((a, b) => a.likes - b.likes);
    dispatch({
      type: UNLIKE_BLOG,
      payload: blogs
    });
  } catch (error) {
    console.log(error);
  }
};
