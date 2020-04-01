import React from "react";
import appIcon from "../images/avatar.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { likeBlog, unlikeBlog } from "../redux/actions/dataActions";

//MUI
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import ChatIcon from "@material-ui/icons/Chat";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
const styles = makeStyles({
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 20,
    marginRight: 20
  },
  image: {
    minWidth: 200
  },
  content: {
    padding: 25,
    objectFit: "cover"
  }
});

const Blog = ({ blogId, title, author, url, likes }) => {
  const user = useSelector(state => state.user);
  const data = useSelector(state => state.data);
  const dispatch = useDispatch();
  const classes = styles();

  const handleLikeButton = () => {
    const findBlog = data.blogs.find(item => item.title === title);
    const updateLike = {
      title: findBlog.title,
      author: findBlog.author,
      url: findBlog.url,
      likes: findBlog.likes + 1,
      likedBy: [...findBlog.likedBy, user.id]
    };
    dispatch(likeBlog(findBlog.id, updateLike));
  };
  const handleUnLikeButton = () => {
    const findBlog = data.blogs.find(item => item.title === title);
    const newLikedBy = findBlog.likedBy.filter(
      item => toString(item) !== user.id
    );
    const updateLike = {
      title: findBlog.title,
      author: findBlog.author,
      url: findBlog.url,
      likes: findBlog.likes - 1,
      likedBy: [...newLikedBy]
    };
    dispatch(unlikeBlog(findBlog.id, updateLike));
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
    <Tooltip title="Undo like" placement="top">
      <IconButton onClick={handleLikeButton}>
        <FavoriteBorder color="primary" />
      </IconButton>
    </Tooltip>
  );
  const handleDeleteButton = () => {};

  return (
    <Card className={classes.card}>
      <CardMedia
        image={appIcon}
        title="Profile image"
        className={classes.image}
      />
      <CardContent className={classes.content}>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        <Typography color="textSecondary" variant="body2" component="p">
          {author}
        </Typography>
        <Typography color="textSecondary" variant="body2" component="p">
          {url}
        </Typography>
        {likeButton}
        <span>{likes} Likes</span>
        <Tooltip title="comments" placement="top">
          <IconButton>
            <ChatIcon />
          </IconButton>
        </Tooltip>
        <span>Comments</span>
      </CardContent>
    </Card>
  );
};

export default Blog;
