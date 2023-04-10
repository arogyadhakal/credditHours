import { Slider, Stack } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

export function SliderReddit(props) {

  return (
    <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
      <p>-1</p>
      <Slider value={props.value}
        min={-1}
        max={1}
        alignItems="center"
        ></Slider>
      <p>1</p>
    </Stack>
  );
}
