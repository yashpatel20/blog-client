import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitComment } from "../redux/actions/dataActions";

import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

const styles = makeStyles({
  visibleSeparator: {
    width: "100%",
    borderBottom: "1px solid rbga(0,0,0,0.1)",
    marginBotton: 20
  },
  textField: {
    margin: "10px auto 10px auto"
  },
  button: {
    marginTop: 20,
    position: "relative"
  }
});

const CommentForm = ({ blogId }) => {
  const classes = styles();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const myBlog = useSelector(state => state.data.myBlog);
  const [body, setBody] = useState("");
  const handleBodyChange = event => setBody(event.target.value);

  const handleSubmit = event => {
    event.preventDefault();
    const newComments = myBlog.comments
      .map(item => ({ comment: item.comment, byUser: item.byUser.id }))
      .concat({
        comment: body,
        byUser: user.id
      });
    const newBlog = {
      title: myBlog.title,
      author: myBlog.author,
      url: myBlog.url,
      likes: myBlog.likes,
      noOfComments: myBlog.noOfComments + 1,
      comments: newComments,
      likedBy: myBlog.likedBy,
      user: myBlog.user.id
    };
    dispatch(submitComment(blogId, newBlog, user.id));
    setBody("");
  };
  const commentFormMarkup = user.authenticated ? (
    <Grid item sm={12} style={{ textAlign: "center" }}>
      <form onSubmit={handleSubmit}>
        <TextField
          name="body"
          type="text"
          label="comment"
          value={body}
          onChange={handleBodyChange}
          className={classes.textfield}
          fullWidth
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Submit
        </Button>
      </form>
    </Grid>
  ) : null;

  return <Fragment>{commentFormMarkup}</Fragment>;
};

export default CommentForm;
