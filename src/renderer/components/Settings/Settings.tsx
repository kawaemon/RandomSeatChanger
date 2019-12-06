"use strict";

import * as React from "react";
import { Typography, Grid, Slider, Input } from '@material-ui/core';
import * as Styles from "./Styles"


export type settingsProps = {
  onWidthChange: (newWidth: number) => void;
}

export function settings(Property: settingsProps) {
  const SliderStyle = Styles.SliderStyle();
  return (
    <>
      <Typography id="input-slider" gutterBottom>
        横に並ぶ数
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Slider
            defaultValue={5}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={1}
            marks
            min={1}
            max={20}
            className={SliderStyle.root}
            onChange={(s, v) => Property.onWidthChange(v as number)}
          />
        </Grid>
        {/* <Grid item xs>
          <Slider
            value={typeof value === 'number' ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Input
            className={classes.input}
            value={value}
            margin="dense"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 10,
              min: 0,
              max: 100,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid> */}
      </Grid>
    </>
  );
}