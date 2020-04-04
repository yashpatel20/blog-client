import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import appIcon from "../images/avatar.png";
//MUI
import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const styles = makeStyles({
  visibleSeparator: {
    width: "100%",
    borderBottom: "1px solid rbga(0,0,0,0.1)",
    marginBotton: 20
  },
  invisibleSeparator: {
    border: "none",
    margin: 4
  },
  commentImage: {
    maxWidth: "100%",
    height: 100,
    objectFit: "cover",
    borderRadius: "50%"
  },
  commentData: {
    marginLeft: 20
  }
});

const Commment = () => {
  const classes = styles();
  const myBlog = useSelector(state => state.data.myBlog);
  const rows = myBlog.comments.map((comment, index) => {
    const body = comment.comment;
    const username = comment.byUser.username;
    return (
      <Fragment key={username}>
        <Grid item sm={12}>
          <Grid container>
            <Grid item sm={2}>
              <img
                src={appIcon}
                className={classes.commentImage}
                alt="user iamge"
              />
            </Grid>
            <Grid item sm={9}>
              <div className={classes.commentData}>
                <Typography
                  variant="h5"
                  componenet={Link}
                  to={`/users/${username}`}
                  color="primary"
                >
                  @{username}
                </Typography>
                <hr className={classes.invisibleSeparator} />
                <Typography variant="body1">{body}</Typography>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    );
  });
  return <Fragment>{rows}</Fragment>;
};

export default Commment;
