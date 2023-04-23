import { Grid } from "@mui/material";
import { Bar } from "../components/bar";
import { Pulse } from "../components/pulse";
import { Topics } from "../components/topics";
import { Activity } from "../components/activity";
import { Search } from "../components/search";
import React, { useState, useEffect } from "react";

import { db } from '../firebase/firebase'
import { collection, addDoc, getDoc, getDocs, where, query } from 'firebase/firestore' 

export function Home() {
  const [subredditData, setSubredditData] = useState({});

  const fetchSubredditPosts = async (subredditName) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/subreddit/${subredditName}`
      );
      const data = await response.json();
      const current_time = Math.floor(Date.now() / 1000);

      // Calculate timeAgo for each post
      const postsWithTimeAgo = data.posts.map((post) => {
        const timeAgo = Math.floor((current_time - post.created_utc) / 60);
        return { ...post, timeAgo: `${timeAgo} minutes ago` };
      });

      // Add new posts to database collection
      const postsCollectionRef = collection(db, 'posts')
      for (const post of postsWithTimeAgo) {
        const postId = post.id
        const query1 = query(postsCollectionRef, where('id', '==', postId))
        const querySnapshot = await getDocs(query1)
        if (querySnapshot.size == 0) {
          await addDoc(postsCollectionRef, post)
        }
      }
      
      setSubredditData({ ...data, posts: postsWithTimeAgo });
    } catch (error) {
      console.error("Error fetching subreddit posts:", error);
    }
  };

  useEffect(() => {
    fetchSubredditPosts("UNC");
    console.log(subredditData);
  }, []);

  return (
    <>
      <Grid>
        <Bar posts={subredditData.posts || []}> 
          <Search posts={subredditData.posts || []} />
        </Bar>
        <Pulse posts={subredditData.posts || []} />
        <Topics posts={subredditData.posts || []} />
        <Activity posts={subredditData.posts || []} />
      </Grid>
    </>
  );
}
