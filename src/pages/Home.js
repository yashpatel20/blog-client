import React from "react";

//MUI
import Grid from "@material-ui/core/Grid";
import Blog from "../components/Blog";
import Profile from "../components/Profile";

const Home = () => {
  return (
    <Grid container spacing={16}>
      <Grid item sm={8} xs={12}>
        Blogs.....
      </Grid>
      <Grid item sm={4} xs={12}>
        <Profile />
      </Grid>
    </Grid>
  );
};

export default Home;
