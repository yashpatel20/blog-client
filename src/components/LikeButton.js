import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { likeBlog, unlikeBlog } from "../redux/actions/dataActions";
import { Link } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import ChatIcon from "@material-ui/icons/Chat";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

const LikeButton = ({ blogId, userHandle, title, author, url, likes }) => {
  const user = useSelector(state => state.user);
  const data = useSelector(state => state.data);
  const dispatch = useDispatch();
  const handleLikeButton = () => {
    const findBlog = data.blogs.find(item => item.title === title);
    const updateLike = {
      title: findBlog.title,
      author: findBlog.author,
      url: findBlog.url,
      likes: findBlog.likes + 1,
      likedBy: [...findBlog.likedBy, user.id],
      user: findBlog.user
    };
    dispatch(likeBlog(findBlog.id, updateLike, user.id));
  };
  const handleUnLikeButton = () => {
    const findBlog = data.blogs.find(item => item.title === title);
    const newLikedBy = findBlog.likedBy.filter(
      item => item.toString() !== user.id
    );
    const updateLike = {
      title: findBlog.title,
      author: findBlog.author,
      url: findBlog.url,
      likes: findBlog.likes - 1,
      likedBy: newLikedBy,
      user: findBlog.user
    };
    dispatch(unlikeBlog(findBlog.id, updateLike, user.id));
  };
  const likedBlog = () => {
    if (user.likes && user.likes.find(like => like.toString() === blogId))
      return true;
    else return false;
  };

  const likeButton = !user.authenticated ? (
    <Tooltip title="like" placement="top">
      <IconButton>
        <Link to="/login">
          <FavoriteBorder color="primary" />
        </Link>
      </IconButton>
    </Tooltip>
  ) : likedBlog() ? (
    <Tooltip title="Undo like" placement="top">
      <IconButton onClick={handleUnLikeButton}>
        <Favorite color="primary" />
      </IconButton>
    </Tooltip>
  ) : (
    <Tooltip title="Like" placement="top">
      <IconButton onClick={handleLikeButton}>
        <FavoriteBorder color="primary" />
      </IconButton>
    </Tooltip>
  );
  return <Fragment>{likeButton}</Fragment>;
};

export default LikeButton;
