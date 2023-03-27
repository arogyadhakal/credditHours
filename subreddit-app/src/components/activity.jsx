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
import React from "react";

export function Activity({ posts }) {
  return (
    <>
      <Card sx={{ margin: "5%" }}>
        <Stack sx={{ p: 2, display: "flex" }}>
          <Box>
            <Tabs>
              <Tab label="Post Activity"></Tab>
              <Tab label="User"></Tab>
            </Tabs>
            <List component="nav">
              {posts.map((post, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemText
                      primary={post.title}
                      secondary={`Posted ${post.timeAgo}`}
                    ></ListItemText>
                  </ListItem>
                  {index !== posts.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Box>
        </Stack>
      </Card>
    </>
  );
}
