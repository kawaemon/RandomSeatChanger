"use strict";

import * as React from "react";
import * as Styles from "./Styles";

import {
  Slider,
  Input,
  Button,
  ListItem,
  ListItemText,
  Paper,
  Checkbox
} from "@material-ui/core";
import { useState } from "react";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import { vw, vh } from "../../utils/SizeCalcurator";

export type settingsProps = {
  onWidthChange: (newWidth: number) => void;
  onHeightChange: (newHeight: number) => void;
  onClickSeatsReset: () => void;
  onExecute: (
    isForceFrontFuntcionEnabled: boolean,
    ForceFrontList: number[],
    ForceFrontRange: number
  ) => void;
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
  const [ForceFrontRangeInputValue, setForceFrontRangeInputValue] = useState(
    ""
  );
  const [isInputError, setInputError] = useState(true);
  const [isRangeInputError, setRangeInputError] = useState(true);
  const [isForwardEnabled, setForwardEnabled] = useState(true);

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
      <div>
        <h3>
          <Checkbox
            checked={isForwardEnabled}
            onChange={e => setForwardEnabled(e.target.checked)}
          />
          強制的に前列に来る人の設定
        </h3>
      </div>
      前から
      <Input
        placeholder="列"
        className={ContainerStyle.rangeInput}
        error={isRangeInputError}
        value={ForceFrontRangeInputValue}
        type="number"
        onChange={e => {
          setForceFrontRangeInputValue(e.target.value);
          try {
            if (e.target.value === "") {
              setRangeInputError(true);
              return;
            }
            const x: number = parseInt(e.target.value);
            setRangeInputError(x > height || x <= 0);
          } catch (e) {}
        }}
      />
      以内に
      <Paper className={ContainerStyle.forceFrontPaper}>
        <FixedSizeList
          itemCount={ForceFrontList.length}
          itemSize={40}
          width={vw(25)}
          height={vh(30)}
        >
          {ForceFrontListEntryProvider(
            ForceFrontList,
            ContainerStyle.ListEntry,
            (n: number) => {
              const NewArray = ForceFrontList.slice();
              NewArray.splice(n, 1);
              setForceFrontList(NewArray);
            }
          )}
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
      <div>
        <Button
          variant="contained"
          color="secondary"
          disabled={
            isForwardEnabled
              ? !(!(ForceFrontList.length <= 0) && !isRangeInputError)
              : false
          }
          className={ContainerStyle.executeButton}
          onClick={e => {
            Property.onExecute(
              isForwardEnabled,
              ForceFrontList,
              parseInt(ForceFrontRangeInputValue)
            );
          }}
        >
          実行!
        </Button>
      </div>
    </>
  );
}

function ForceFrontListEntryProvider(
  CurrentList: number[],
  ClassName: string,
  deleteHandler: (n: number) => void
): (props: ListChildComponentProps) => JSX.Element {
  return (props: ListChildComponentProps) => {
    const { index, style } = props;

    return (
      <ListItem
        button
        style={style}
        className={ClassName}
        onClick={e => deleteHandler(index)}
      >
        <ListItemText primary={`${CurrentList[index]}番`} />
      </ListItem>
    );
  };
}
