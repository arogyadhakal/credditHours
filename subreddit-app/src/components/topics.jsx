import {
  Card,
  Stack,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function filter_high_value_posts(posts) {
  if (!posts) {
    return;
  }
  console.log("high value posts", posts);
  return posts.filter((post) => {
    const sentiment = post.sentiment_scores;
    return sentiment < 0.0; //add a negative sentiment
  });
}

export function Topics({ posts }) {
  const [topics, setTopics] = useState();

  useEffect(() => {
    setTopics(filter_high_value_posts(posts));
  }, [posts]);

  return (
    <>
      <Card sx={{ margin: "5%" }}>
        <Stack sx={{ p: 2, display: "flex" }}>
          <Typography
           paddingLeft="2%"
          >Topics of Concern</Typography>
          <List component="nav">
            {topics &&
              topics.map((post, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemText
                      primary={
                        <Link
                          to={`/post/${post.id}`}
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          {post.title}
                        </Link>
                      }
                      secondary={`Posted ${post.timeAgo}`}
                    ></ListItemText>
                  </ListItem>
                  {index !== posts.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            {!topics && (
              <ListItem>
                <ListItemText
                  primary={
                    "Sorry no high value posts trending in the subreddit currently!"
                  }
                ></ListItemText>
              </ListItem>
            )}
          </List>
        </Stack>
      </Card>
    </>
  );
}
