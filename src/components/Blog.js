import React from "react";
import appIcon from "../images/av100.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { likeBlog } from "../redux/actions/dataActions";

//MUI
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";

const styles = makeStyles({
  card: {
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

const Blog = ({ title, author, url, likes }) => {
  const data = useSelector(state => state.data);
  const dispatch = useDispatch();
  const classes = styles();
  const handleLikeButton = () => {
    const findBlog = data.blogs.find(item => item.title === title);
    const updateLike = {
      title: findBlog.title,
      author: findBlog.author,
      url: findBlog.author,
      likes: findBlog.likes + 1
    };
    dispatch(likeBlog(findBlog.id, updateLike));
  };
  const handleDeleteButton = () => {};

  return (
    <Card className={classes.card}>
      <CardContent className={classes.content}>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        <Typography color="textSecondary">{author}</Typography>
        <Typography color="textSecondary">{url}</Typography>
        <Typography color="textSecondary">{likes}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={handleLikeButton}>
          Like
        </Button>
        <Button size="small" color="secondary" onClick={handleDeleteButton}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Blog;
