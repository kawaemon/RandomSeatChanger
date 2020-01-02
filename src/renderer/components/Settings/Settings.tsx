"use strict";

import * as React from "react";
import * as Styles from "./Styles";

import {
  Slider,
  Input,
  Button,
  ListItem,
  ListItemText,
  Paper
} from "@material-ui/core";
import { useState } from "react";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import { vw } from "../../utils/SizeCalcurator";

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

  const [ForceFrontList, setForceFrontList] = useState<number[]>([]);

  const [ForceFrontListInputValue, setForceFrontListInputValue] = useState("");
  const [isInputError, setInputError] = useState(true);
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

      <h3>強制的に前列に来る人の指定</h3>

      <Paper className={ContainerStyle.forceFrontPaper}>
        <FixedSizeList
          itemCount={ForceFrontList.length}
          itemSize={40}
          height={200}
          width={vw(20)}
        >
          {ForceFrontListEntryProvider(ForceFrontList)}
        </FixedSizeList>
      </Paper>
      <Input
        placeholder="出席番号"
        className={ContainerStyle.input}
        error={isInputError}
        value={ForceFrontListInputValue}
        type="number"
        onChange={e => {
          setForceFrontListInputValue(e.target.value);
          try {
            if (e.target.value === "") {
              setInputError(true);
              return;
            }
            const x: number = parseInt(e.target.value);
            setInputError(
              x > width * height || x <= 0 || ForceFrontList.includes(x)
            );
          } catch (e) {}
        }}
        onKeyDown={e => {
          if (e.keyCode == 13) {
            //TODO: 実装
          }
        }}
      />
      <Button
        disabled={isInputError}
        color="primary"
        variant="contained"
        onClick={e => {
          if (!isInputError) {
            setForceFrontList(
              ForceFrontList.concat(parseInt(ForceFrontListInputValue))
            );
            //重複登録防止
            setInputError(true);
          }
        }}
      >
        リストに追加
      </Button>
    </>
  );
}

function ForceFrontListEntryProvider(
  CurrentList: number[]
): (props: ListChildComponentProps) => JSX.Element {
  return (props: ListChildComponentProps) => {
    const { index, style } = props;

    return (
      <ListItem button style={style}>
        <ListItemText primary={CurrentList[index]} />
      </ListItem>
    );
  };
}
