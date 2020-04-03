import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getBlog } from "../redux/actions/dataActions";
import userServices from "../services/user";
import LikeButton from "./LikeButton";

import { makeStyles } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import appIcon from "../images/avatar.png";
import ChatIcon from "@material-ui/icons/Chat";

const styles = makeStyles({
  invisibleSeparator: {
    border: "none",
    margin: 4
  },
  profileImage: {
    maxWidth: 200,
    height: 220,
    borderRadius: "50%",
    objectFit: "cover"
  },
  closeButton: {
    position: "absolute",
    left: "90%"
  },
  dialogContent: {
    padding: 20
  },
  expandButton: {
    position: "absolute",
    left: "90%"
  },
  spinnerDiv: {
    textAlign: "center",
    marginTop: 50,
    marginBottom: 50
  }
});
const BlogDialog = ({ blogId, userHandle, title, author, url, likes }) => {
  const dispatch = useDispatch();
  const classes = styles();
  const { user } = useSelector(state => state.data.myBlog);
  const loading = useSelector(state => state.UI.loading);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    dispatch(getBlog(blogId));
  };
  const handleClose = () => setOpen(false);

  const dialogMarkup = loading ? (
    <div className={classes.spinnerDiv}>
      <CircularProgress size={200} thickness={2} />
    </div>
  ) : (
    <Grid container spacing={16}>
      <Grid item sm={5}>
        <img src={appIcon} alt="Profile" className={classes.profileImage} />
      </Grid>
      <Grid item sm={7}>
        <Typography
          component={Link}
          color="primary"
          variant="h5"
          to={`/users/${user.username}`}
        >
          @{user.username}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography variant="body1">{title}</Typography>
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
      </Grid>
    </Grid>
  );
  return (
    <Fragment>
      <Tooltip title="Expand Blog" placement="top">
        <IconButton onClick={handleOpen} className={classes.expandButton}>
          <UnfoldMore color="primary" />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <Tooltip title="Close" placement="top">
          <IconButton onClick={handleClose} className={classes.closeButton}>
            <CloseIcon />
          </IconButton>
        </Tooltip>
        <DialogContent className={classes.dialogContent}>
          {dialogMarkup}
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default BlogDialog;
