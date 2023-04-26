import { Grid } from "@mui/material";
import { Bar } from "../components/bar";
import { Pulse } from "../components/pulse";
import { Topics } from "../components/topics";
import { Activity } from "../components/activity";
import { Search } from "../components/search";
import { PulseLineGraph } from "../components/graph";
import React, { useState, useEffect } from "react";
import Autocomplete from "@mui/lab/Autocomplete";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import { db } from "../firebase/firebase";
import { collection, addDoc, getDocs, where, query } from "firebase/firestore";

export function Home() {
  const [subredditData, setSubredditData] = useState({});
  const [subreddit, setSubreddit] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const subredditOptions = ["UNC", "mildlyinfuriating"];

  const fetchSubredditPosts = async (subredditName) => {
    if (!subredditName) return;
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/subreddit/${subredditName}`
      );

      if (!response.ok) {
        throw new Error("Error fetching subreddit posts.");
      }

      const data = await response.json();
      const current_time = Math.floor(Date.now() / 1000);

      // Calculate timeAgo for each post
      const postsWithTimeAgo = data.posts.map((post) => {
        const timeAgo = Math.floor((current_time - post.created_utc) / 60);
        return { ...post, timeAgo: `${timeAgo} minutes ago` };
      });

      // Add new posts to database collection
      const postsCollectionRef = collection(db, "posts");
      for (const post of postsWithTimeAgo) {
        const postId = post.id;
        const query1 = query(postsCollectionRef, where("id", "==", postId));
        const querySnapshot = await getDocs(query1);
        if (querySnapshot.size === 0) {
          await addDoc(postsCollectionRef, post);
        }
      }

      setSubredditData({ ...data, posts: postsWithTimeAgo });
      setErrorMessage(null); // Reset the error message on successful fetch
    } catch (error) {
      console.error("Error fetching subreddit posts:", error);
      setErrorMessage("Invalid subreddit name, please try again.");
    }
  };

  const handleOptionClick = (option) => {
    if (option) {
      setSubreddit(typeof option === "string" ? option : option.label);
    } else {
      setSubreddit(null);
    }
  };

  useEffect(() => {
    if (subreddit) {
      fetchSubredditPosts(subreddit);
    }
  }, [subreddit]);

  console.log(subreddit);
  return (
    <>
      <Grid>
        <Bar posts={subredditData.posts || []} subreddit={subreddit}>
          {/* {subreddit && <Search subreddit={subreddit} />} */}
        </Bar>
        <Autocomplete
          freeSolo
          disablePortal
          id="combo-box-demo"
          options={subredditOptions}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Subreddits" />}
          onChange={(event, option) => handleOptionClick(option)}
          isOptionEqualToValue={(option, value) => option.label === value.label}
        />
        <PulseLineGraph posts={subredditData.posts || []} />
        <Pulse posts={subredditData.posts || []} />
        <Topics posts={subredditData.posts || []} />
        <Activity posts={subredditData.posts || []} />
        <Snackbar
          open={!!errorMessage}
          autoHideDuration={6000}
          onClose={() => setErrorMessage(null)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <MuiAlert
            onClose={() => setErrorMessage(null)}
            severity="error"
            elevation={6}
            variant="filled"
          >
            {errorMessage}
          </MuiAlert>
        </Snackbar>
      </Grid>
    </>
  );
}
