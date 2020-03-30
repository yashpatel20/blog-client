import { SET_BLOGS, LIKE_BLOG, UNLIKE_BLOG, LOADING_DATA } from "../types";
import blogService from "../../services/blogs";
import { getUserData } from "../actions/userActions";

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

export const likeBlog = (blogId, blogObject) => async dispatch => {
  try {
    const response = await blogService.update(blogId, blogObject);
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
    const blogs = await blogService.getAll();
    const response = await blogService.update(blogId, blogObject);
    const newBlogs = blogs
      .map(blog => (blog.title === blogObject.title ? response : blog))
      .sort((a, b) => a.likes - b.likes);
    dispatch({
      type: SET_BLOGS,
      payload: newBlogs
    });
  } catch (error) {
    console.log(error);
  }
};
