import {
  Card,
  Stack,
  Box,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export function Activity({ posts }) {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <>
      <Card sx={{ margin: "5%" }}>
        <Stack sx={{ p: 2, display: "flex" }}>
          <Box>
            <Tabs value={selectedTab} onChange={handleTabChange}>
              <Tab label="Post Activity"></Tab>
              <Tab label="User"></Tab>
            </Tabs>
            {selectedTab === 0 && (
              <List component="nav">
                {posts.map((post, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemText
                        primary={
                          <Link
                            to={post.link}
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            {post.title}
                          </Link>
                        }
                        secondary={`Posted ${post.timeAgo}`}
                      ></ListItemText>
                      <Box sx={{ marginLeft: "auto" }}>
                        <ListItemText primary={`Score: ${post.score}`} />
                      </Box>
                    </ListItem>
                    {index !== posts.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            )}
            {selectedTab === 1 && (
              <List component="nav">
                {posts.map((post, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemText primary={post.author}></ListItemText>
                    </ListItem>
                    {index !== posts.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            )}
          </Box>
        </Stack>
      </Card>
    </>
  );
}
