import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Dialog from "@material-ui/core/Dialog";

import { deleteBlog } from "../redux/actions/dataActions";

const styles = makeStyles({
  deleteButton: {
    position: "absolute",
    left: "90%",
    top: "10%"
  }
});

const DeleteBlog = ({ blogId }) => {
  const classses = styles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = () => {
    dispatch(deleteBlog(blogId));
    setOpen(false);
  };
  return (
    <Fragment>
      <Tooltip title="Delete" placement="top">
        <IconButton onClick={handleOpen} className={classses.deleteButton}>
          <DeleteOutline color="secondary" />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Are you sure you want to delete this blog?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};
export default DeleteBlog;
