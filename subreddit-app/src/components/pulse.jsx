import { Card, Box, Stack, Typography } from "@mui/material";
import { SliderReddit } from "./slider";
import React from "react";
import { db } from "../firebase/firebase";
import {
  collection,
  addDoc,
  getDocs,
  where,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { useState, useEffect } from "react";

function calculateAverageSentiment(posts) {
  if (posts.length === 0) {
    return 0;
  }

  const sumSentiment = posts.reduce(
    (sum, post) => sum + post.sentiment_scores,
    0
  );
  return sumSentiment / posts.length;
}

export function Pulse({ posts }) {
  const [subreddit, setSubreddit] = useState("");
  const [averageSentiment, setAverageSentiment] = useState(50);
  const [lastSavedPulse, setLastSavedPulse] = useState(null);

  useEffect(() => {
    if (posts.length != 0) {
      const avgSentiment = calculateAverageSentiment(posts);
      const roundedAvgSentiment = Math.round(avgSentiment * 100) / 100;
      setAverageSentiment(roundedAvgSentiment);
      setSubreddit(posts[0].subreddit);
    }
  }, [posts]);

  useEffect(() => {
    if (subreddit) {
      savePulsetoDB(averageSentiment);
    }
  }, [subreddit, averageSentiment]);

  const savePulsetoDB = async (avgSentiment) => {
    const currentDate = new Date();
    const currentTime = currentDate.getTime();

    const pulseQuery = query(
      collection(db, "pulse"),
      where("subreddit", "==", subreddit),
      orderBy("timestamp", "desc"),
      limit(1)
    );

    const querySnapshot = await getDocs(pulseQuery);

    if (querySnapshot.size > 0) {
      querySnapshot.forEach((doc) => {
        const { timestamp } = doc.data();
        const timeDiff = currentTime - timestamp.toMillis();
        if (timeDiff >= 60000) {
          addNewPulse(avgSentiment);
        }
      });
    } else {
      addNewPulse(avgSentiment);
    }
  };

  const addNewPulse = async (avgSentiment) => {
    const newPulse = {
      subreddit: subreddit,
      timestamp: new Date(),
      sentiment: avgSentiment,
    };
    const pulseCollectionRef = collection(db, "pulse");
    await addDoc(pulseCollectionRef, newPulse);
  };

  return (
    <>
      <Card sx={{ margin: "5%" }}>
        <Box sx={{ p: 2, display: "flex" }}>
          <Stack sx={{ width: 1 }}>
            <Typography variant="caption">Overall Pulse</Typography>
            <Typography variant="h5" paddingTop="2%">
              {averageSentiment}
            </Typography>
            <SliderReddit value={averageSentiment}></SliderReddit>
          </Stack>
        </Box>
      </Card>
    </>
  );
}
