import { useState } from "react";
import { Slider } from "@mui/material";
import React from "react";

export function SliderReddit() {

    const [value, setValue] = useState(20);
    const changeValue = (event, value) => {
        setValue(value);
    }

  return (
    <>
      <Slider value={value}></Slider>
    </>
  );
}
