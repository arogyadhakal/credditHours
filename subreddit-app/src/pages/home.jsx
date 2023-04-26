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
  const [subredditData, setSubredditData] = useState({
    subreddit: "UNC",
    posts: [],
  });
  const [subreddit, setSubreddit] = useState("UNC");
  const [errorMessage, setErrorMessage] = useState(null);
  const [validationError, setValidationError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

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
      const subredditName = typeof option === "string" ? option : option.label;
      if (/\s/.test(subredditName)) {
        setValidationError("Subreddit names cannot contain spaces.");
      } else {
        setSubreddit(subredditName);
        setSuccessMessage("Success! Your data is being processed.");
        setValidationError(null);
      }
    } else {
      setSubreddit(null);
    }
  };

  useEffect(() => {
    if (subreddit) {
      fetchSubredditPosts(subreddit);
    }
  }, [subreddit]);

  useEffect(() => {
    if (subreddit) {
      fetchSubredditPosts(subreddit);
    }
  }, []); // Run only once on mount

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
          renderInput={(params) => <TextField {...params} label="UNC" />}
          onChange={(event, option) => handleOptionClick(option)}
          isOptionEqualToValue={(option, value) => option.label === value.label}
        />
        {subredditData.posts && (
          <>
            <PulseLineGraph posts={subredditData.posts || []} />
            <Pulse posts={subredditData.posts || []} />
            <Topics posts={subredditData.posts || []} />
            <Activity posts={subredditData.posts || []} />
          </>
        )}
        {!subredditData.posts && (
          <div>Please choose a subreddit to analyze or type one in!</div>
        )}
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
        <Snackbar
          open={!!validationError}
          autoHideDuration={6000}
          onClose={() => setValidationError(null)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <MuiAlert
            onClose={() => setValidationError(null)}
            severity="error"
            elevation={6}
            variant="filled"
          >
            {validationError}
          </MuiAlert>
        </Snackbar>
        <Snackbar
          open={!!successMessage}
          autoHideDuration={6000}
          onClose={() => setSuccessMessage(null)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <MuiAlert
            onClose={() => setSuccessMessage(null)}
            severity="success"
            elevation={6}
            variant="filled"
          >
            {successMessage}
          </MuiAlert>
        </Snackbar>
      </Grid>
    </>
  );
}
