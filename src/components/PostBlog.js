import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postBlog } from "../redux/actions/dataActions";

// MUI Stuff
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core";
import user from "../services/user";

const styles = makeStyles({
  submitButton: {
    position: "relative",
    float: "right",
    marginTop: 10
  },
  progressSpinner: {
    position: "absolute"
  },
  closeButton: {
    position: "absolute",
    left: "91%",
    top: "6%"
  }
});

const PostBlog = () => {
  const dispatch = useDispatch();
  const classes = styles();
  const [open, setOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newLikes, setNewLikes] = useState(0);
  const [newNoOfComments, setNewNoOfComments] = useState(0);
  const ui = useSelector(state => state.UI);
  const userId = useSelector(state => state.user.id);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleTitleChange = event => setNewTitle(event.target.value);
  const handleAuthorChange = event => setNewAuthor(event.target.value);
  const handleUrlChange = event => setNewUrl(event.target.value);
  const handleLikesChange = event => setNewLikes(event.target.value);

  const handleSubmit = event => {
    event.preventDefault();
    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: newLikes,
      noOfComments: newNoOfComments
    };
    dispatch(postBlog(newBlog, userId));
    setOpen(false);
    setNewTitle("");
    setNewAuthor("");
    setNewUrl("");
    setNewLikes("");
    setNewNoOfComments("");
  };

  return (
    <Fragment>
      <Tooltip title="Post a Blog" placement="top">
        <IconButton onClick={handleOpen}>
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <Tooltip title="Close" placement="top">
          <IconButton onClick={handleClose} className={classes.closeButton}>
            <CloseIcon />
          </IconButton>
        </Tooltip>
        <DialogTitle>Post a new Blog</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              name="title"
              type="text"
              label="Title"
              placeholder="Title"
              // error={errors.body ? true : false}
              // helperText={errors.body}
              className={classes.textField}
              onChange={handleTitleChange}
              fullWidth
            />
            <TextField
              name="author"
              type="text"
              label="Author"
              placeholder="Author"
              // error={errors.body ? true : false}
              // helperText={errors.body}
              className={classes.textField}
              onChange={handleAuthorChange}
              fullWidth
            />
            <TextField
              name="url"
              type="text"
              label="URL"
              placeholder="URL"
              // error={errors.body ? true : false}
              // helperText={errors.body}
              className={classes.textField}
              onChange={handleUrlChange}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
              disabled={ui.loading}
            >
              Submit
              {ui.loading && (
                <CircularProgress
                  size={30}
                  className={classes.progressSpinner}
                />
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default PostBlog;
