import { Card, Box, Stack, Typography } from "@mui/material";
import { SliderReddit } from "./slider";

export function Pulse() {
  return (
    <>
      <Card sx={{ margin: "5%" }}>
        <Box sx={{ p: 2, display: "flex" }}>
          <Stack sx={{ width: "90%" }}>
            <Typography variant="caption">Overall Pulse</Typography>
            <Typography variant="h5" paddingTop="2%">Positive - 84%</Typography>
            <SliderReddit></SliderReddit>
          </Stack>
        </Box>
      </Card>
    </>
  );
}
