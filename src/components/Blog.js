import React from "react";
import appIcon from "../images/avatar.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { likeBlog, unlikeBlog } from "../redux/actions/dataActions";
import { getUserData } from "../redux/actions/userActions";
import DeleteBlog from "../components/DeleteBlog";
import BlogDialog from "./BlogDialog";
import LikeButton from "./LikeButton";

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

const Blog = ({ blogId, userHandle, title, author, url, likes }) => {
  const user = useSelector(state => state.user);
  const data = useSelector(state => state.data);
  const dispatch = useDispatch();
  const classes = styles();

  const deleteButton =
    user.authenticated && user.id === userHandle.toString() ? (
      <DeleteBlog blogId={blogId} />
    ) : null;

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
        {deleteButton}
        <Typography color="textSecondary" variant="body2" component="p">
          {author}
        </Typography>
        <Typography color="textSecondary" variant="body2" component="p">
          {url}
        </Typography>
        <LikeButton
          blogId={blogId}
          userHandle={userHandle}
          title={title}
          author={author}
          url={url}
          likes={likes}
        />
        <span>{likes} Likes</span>
        <Tooltip title="comments" placement="top">
          <IconButton>
            <ChatIcon />
          </IconButton>
        </Tooltip>
        <span>Comments</span>
        <BlogDialog
          blogId={blogId}
          userHandle={userHandle}
          title={title}
          author={author}
          url={url}
          likes={likes}
        />
      </CardContent>
    </Card>
  );
};

export default Blog;
