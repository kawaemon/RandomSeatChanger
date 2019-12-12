"use strict";

import * as React from "react";
import { useState } from "react";
import { Grid, Slider, Input, Button } from "@material-ui/core";
import * as Styles from "./Styles";

export type settingsProps = {
  onWidthChange: (newWidth: number) => void;
  onHeightChange: (newHeight: number) => void;
};

export function settings(Property: settingsProps) {
  const SliderStyle = Styles.SliderStyle();
  const EntryStyle = Styles.SettingsEntryStyle();
  const [width, setWidth] = useState(5);
  const [height, setHeight] = useState(5);

  return (
    <>
      <h2>設定</h2>
      <h3>Step1. 席数の指定</h3>
      <div className={EntryStyle.root}>
        <Grid container spacing={2} alignItems="center">
          縦に並ぶ数
          <Grid item xs={8} className={SliderStyle.slider}>
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
          <Grid item xs className={SliderStyle.input}>
            <Input
              className={SliderStyle.input}
              value={height}
              margin="dense"
              onChange={e => {
                if (e.target.value === "") return;
                let i = parseInt(e.target.value);
                if (i > 15) i = 15;
                setHeight(i);
                Property.onHeightChange(i);
              }}
            />
          </Grid>
        </Grid>
      </div>

      <div className={EntryStyle.root}>
        <Grid container spacing={2} alignItems="center">
          横に並ぶ数
          <Grid item xs={8} className={SliderStyle.slider}>
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
          <Grid item className={SliderStyle.input}>
            <Input
              className={SliderStyle.input}
              value={width}
              margin="dense"
              onChange={e => {
                if (e.target.value === "") return;
                let i = parseInt(e.target.value);
                if (i > 15) i = 15;
                setWidth(i);
                Property.onWidthChange(i);
              }}
            />
          </Grid>
        </Grid>
      </div>

      <Button
        variant={"contained"}
        color={"primary"}
        style={{ marginLeft: "37vw", marginTop: "1vh" }}
      >
        決定
      </Button>
    </>
  );
}
