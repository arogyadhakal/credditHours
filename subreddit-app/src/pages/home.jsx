import { Grid } from "@mui/material";
import { Bar } from "../components/bar";
import { Pulse } from "../components/pulse";
import { Topics } from "../components/topics";
import { Activity } from "../components/activity";

export function Home() {
  return (
    <>
      <Grid>
          <Bar />
          <Pulse />
          <Topics/>
          <Activity/>
      </Grid>
    </>
  );
}
