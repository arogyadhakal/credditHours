import {
  Card,
  Stack,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

export function Topics() {
  return (
    <>
      <Card sx={{ margin: "5%" }}>
        <Stack sx={{ p: 2, display: "flex" }}>
          <Typography paddingLeft="2%">Topics of Concern</Typography>

          <List component="nav">
            <ListItem>
              <ListItemText primary="COMP 123? Not fun." secondary="Posted by coolcompsci123"></ListItemText>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="Why are we still drinking lead water?" secondary="Posted by angreyredditor"></ListItemText>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="Worst classes to take at UNC" secondary="Posted by tarheelfan123"></ListItemText>
            </ListItem>
          </List>
        </Stack>
      </Card>
    </>
  );
}
