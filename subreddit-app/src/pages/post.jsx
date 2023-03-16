import { Card, Stack, Typography, Divider, Slider } from "@mui/material";
import { Bar } from "../components/bar";
import { SliderReddit } from "../components/slider";

export function Post() {
  return (
    <>
      <Bar />
      <Card sx={{ margin: "5%" }}>
        <Stack sx={{ display: "flex", padding: "2%", margin: "2%" }}>
          <Typography id="header" variant="h5" fontWeight="bold">
            COMP 123? Not fun.
          </Typography>
          <Typography padding="2%" id="author">Posted by coolcompsci123</Typography>
          <Divider />
          <Typography padding="2%" id="content">
            "Wow, this class amazes me, and not in a good way. I just feel like
            the structure of this class is TERRIBLE and the assignments and
            worksheets suck..."
          </Typography>
          <Divider />
          <Typography variant="h6" padding="2%" id="pulse">
            Negative - 27%
          </Typography>
          <SliderReddit></SliderReddit>
        </Stack>
      </Card>
    </>
  );
}
