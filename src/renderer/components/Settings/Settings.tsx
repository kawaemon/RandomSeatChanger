"use strict";

import * as React from "react";
import { useState } from "react";
import { Typography, Grid, Slider, Input } from '@material-ui/core';
import * as Styles from "./Styles"

export type settingsProps = {
  onWidthChange: (newWidth: number) => void;
  onHeightChange: (newHeight: number) => void;
}

export function settings(Property: settingsProps) {
  const SliderStyle = Styles.SliderStyle();
  const [width, setWidth] = useState(5);
  const [height, setHeight] = useState(5);

  return (
    <>
      <Grid container spacing={2} alignItems="center">
        <Typography id="input-slider" gutterBottom>
          縦に並ぶ数
          </Typography>
        <Grid item xs className={SliderStyle.slider}>
          <Slider
            marks
            step={1}
            min={1}
            max={15}
            defaultValue={5}
            value={height}
            onChange={(s, v) => {
              const i = v as number;
              setHeight(i);
              Property.onHeightChange(i);
            }}
          />
        </Grid>
        <Grid className={SliderStyle.input}>
          <Input
            className={SliderStyle.input}
            value={height}
            margin="dense"
            onChange={(e) => {
              if (e.target.value === '') return;
              let i = parseInt(e.target.value);
              if (i > 15) i = 15;
              setHeight(i);
              Property.onHeightChange(i)
            }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} alignItems="center">
        <Typography id="input-slider" gutterBottom>
          横に並ぶ数
          </Typography>
        <Grid item xs className={SliderStyle.slider}>
          <Slider
            marks
            step={1}
            min={1}
            max={15}
            defaultValue={5}
            value={width}
            onChange={(s, v) => {
              const i = v as number;
              setWidth(i);
              Property.onWidthChange(i);
            }}
          />
        </Grid>
        <Grid className={SliderStyle.input}>
          <Input
            className={SliderStyle.input}
            value={width}
            margin="dense"
            onChange={(e) => {
              if (e.target.value === '') return;
              let i = parseInt(e.target.value);
              if (i > 15) i = 15;
              setWidth(i);
              Property.onWidthChange(i)
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}