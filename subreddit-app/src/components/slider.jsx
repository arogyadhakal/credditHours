import { Slider } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

export function SliderReddit(props) {
  let converted_string_to_float = parseFloat(props.value) * 100;

  return (
    <>
      <Slider value={converted_string_to_float}></Slider>
    </>
  );
}
