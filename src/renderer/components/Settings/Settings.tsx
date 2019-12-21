"use strict";

import * as React from "react";
import { useState } from "react";
import { Grid, Slider, Input, Button, Slide } from "@material-ui/core";
import * as Styles from "./Styles";

export type settingsProps = {
  onWidthChange: (newWidth: number) => void;
  onHeightChange: (newHeight: number) => void;
  onClickSeatsReset: () => void;
};

export function settings(Property: settingsProps) {
  const SliderStyle = Styles.SliderStyle();
  const ContainerStyle = Styles.ContainerStyle();
  const ButtonStyle = Styles.ButtonStyle();
  const TextStyle = Styles.TextStyle();
  const [width, setWidth] = useState(5);
  const [height, setHeight] = useState(5);

  return (
    <>
      <h2>設定</h2>
      <h3>席数の指定</h3>
      <div className={ContainerStyle.toplevel}>
        <div className={ContainerStyle.secondLevel}>
          <div className={TextStyle.sliderText}>縦に並ぶ数</div>
          <div>
            <Slider
              className={SliderStyle.slider}
              marks
              step={1}
              min={1}
              max={13}
              defaultValue={5}
              value={height}
              onChange={(s, v) => {
                const i = v as number;
                setHeight(i);
                Property.onHeightChange(i);
              }}
            />
          </div>
          <div>
            <Input
              className={SliderStyle.input}
              value={height}
              margin="dense"
              onChange={e => {
                if (e.target.value === "") return;
                let i = parseInt(e.target.value);
                if (i > 13) i = 13;
                setHeight(i);
                Property.onHeightChange(i);
              }}
            />
          </div>
        </div>

        <div className={ContainerStyle.secondLevel}>
          <div className={TextStyle.sliderText}>横に並ぶ数</div>
          <div>
            <Slider
              className={SliderStyle.slider}
              marks
              step={1}
              min={1}
              max={13}
              defaultValue={5}
              value={width}
              onChange={(s, v) => {
                const i = v as number;
                setWidth(i);
                Property.onWidthChange(i);
              }}
            />
          </div>
          <div>
            <Input
              className={SliderStyle.input}
              value={width}
              margin="dense"
              onChange={e => {
                if (e.target.value === "") return;
                let i = parseInt(e.target.value);
                if (i > 13) i = 13;
                setWidth(i);
                Property.onWidthChange(i);
              }}
            />
          </div>
        </div>
      </div>

      <div className={ContainerStyle.buttonContainer}>
        <Button
          color="primary"
          className={ButtonStyle.button}
          onClick={Property.onClickSeatsReset}
        >
          削除した席を復元
        </Button>
      </div>
      <div className={TextStyle.tipText}>
        削除したい席を、左の席イメージ上でクリックすると消去できます。
      </div>
    </>
  );
}
