import { Card, Stack, Typography, Divider, Slider } from "@mui/material";
import { Bar } from "../components/bar";
import { SliderReddit } from "../components/slider";
import React from "react";

export function Post() {
  return (
    <>
        <Bar />
        <Card sx={{ margin: "5%" }}>
          <Stack sx={{ display: "flex", padding: "2%", margin: "2%" }}>
            <Typography id="header" variant="h5" fontWeight="bold">
              Title
            </Typography>
            <Typography padding="2%" id="author">Posted by Author</Typography>
            <Divider />
            <Typography padding="2%" id="content">
              Post Content
            </Typography>
            <Divider />
            <Typography variant="h6" padding="2%" id="pulse">
              Post Sentiment
            </Typography>
            <SliderReddit></SliderReddit>
          </Stack>
        </Card>
    </>
  )
}