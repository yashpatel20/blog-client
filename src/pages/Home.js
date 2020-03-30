import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBlogs } from "../redux/actions/dataActions";
//MUI
import Grid from "@material-ui/core/Grid";
import Blog from "../components/Blog";
import Profile from "../components/Profile";

const Home = () => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.data);
  useEffect(() => {
    dispatch(getBlogs());
  }, []);

  const rows = data.blogs.map(blog => {
    return (
      <Blog
        key={blog.id}
        title={blog.title}
        author={blog.author}
        url={blog.url}
        likes={blog.likes}
      />
    );
  });
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

export default Home;
