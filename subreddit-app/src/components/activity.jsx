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

export function Activity() {
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
              <ListItem>
                <ListItemText
                  primary="Class Registration Fall 2023"
                  secondary="Posted 12 minutes ago"
                ></ListItemText>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Comp Sci 2023 Admissions"
                  secondary="Posted 30 minutes ago"
                ></ListItemText>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="SBP election?"
                  secondary="Posted 45 minutes ago"
                ></ListItemText>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Easy 1 credit hour classes"
                  secondary="Posted an hour ago"
                ></ListItemText>
              </ListItem>
            </List>
          </Box>
        </Stack>
      </Card>
    </>
  );
}
