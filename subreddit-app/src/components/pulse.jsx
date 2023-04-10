import { Card, Box, Stack, Typography } from "@mui/material";
import { SliderReddit } from "./slider";
import React from "react";
import { useState } from "react";

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
  // const [averageSentiment, setAverageSentiment] = useState(0);
  let averageSentiment;
  if (posts) {
    averageSentiment = calculateAverageSentiment(posts);
    averageSentiment = Math.round(averageSentiment * 100) / 100
    console.log("average Sentiment", averageSentiment);
    // setAverageSentiment(average);
  } else {
    averageSentiment = 50;
    // setAverageSentiment(50);
  }

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
