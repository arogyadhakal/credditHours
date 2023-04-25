import { AppBar, Toolbar, Typography } from "@mui/material";
import { Search } from "./search";
import { Link } from "react-router-dom";
import React from "react";

export function Bar({ posts, subreddit }) {
  console.log(subreddit);
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="16"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <Link to={"/"} style={{ textDecoration: "none", color: "inherit" }}>
              cReddit Hours
            </Link>
          </Typography>
          {subreddit && <Search subreddit={subreddit} />}
        </Toolbar>
      </AppBar>
    </>
  );
}
