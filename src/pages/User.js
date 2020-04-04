import React, { Fragment, useEffect } from "react";
import Blog from "../components/Blog";
import Grid from "@material-ui/core/Grid";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../redux/actions/userActions";
import Profile from "../components/Profile";

const User = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  useEffect(() => {
    dispatch(getUserData(user.id));
  }, []);
  const rows =
    user.authenticated && user.blogs !== undefined
      ? user.blogs.map(blog => {
          return (
            <Blog
              key={blog.id}
              blogId={blog.id}
              userHandle={user.id}
              title={blog.title}
              author={blog.author}
              url={blog.url}
              likes={blog.likes}
              noOfComments={blog.noOfComments}
            />
          );
        })
      : null;

  return (
    <Grid container spacing={1}>
      <Grid item sm={8} xs={12}>
        {rows}
      </Grid>
      <Grid item sm={4} xs={12}>
        <Profile />
      </Grid>
    </Grid>
  );
};

export default User;
