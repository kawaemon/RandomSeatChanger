"use strict";

import * as React from "react";
import * as Styles from "./Styles";
import DeleteIcon from "@material-ui/icons/Delete";
import { useState } from "react";
import { FixedSizeGrid, GridChildComponentProps } from "react-window";
import { vw, vh } from "../../utils/SizeCalcurator";

import {
  Slider,
  Input,
  Button,
  ListItem,
  Paper,
  Checkbox
} from "@material-ui/core";

export type SettingsProps = {
  onWidthChange: (newWidth: number) => void; //横数の変更のときに呼ばれる関数
  onHeightChange: (newHeight: number) => void; //縦数の変更のときに呼ばれる関数
  onResetSeats: () => void; //「削除した席を復元」ボタンが押された時に呼ばれる関数
  onExecute: (
    isForceFrontFuntcionEnabled: boolean,
    ForceFrontList: number[],
    ForceFrontRange: number
  ) => void; //実行ボタンが押されたときに呼ばれる関数
};

export function Settings(Property: SettingsProps) {
  const styles = Styles.Styles();

  const [width, setWidth] = useState(5); //横に並ぶ数
  const [height, setHeight] = useState(5); //縦に並ぶ数

  const [ForceFrontList, setForceFrontList] = useState<number[]>([]); //強制的に前列に来る人の出席番号リスト
  const [ForceFrontListInputValue, setForceFrontListInputValue] = useState(""); //「出席番号」入力欄に書かれた値
  const [ForceFrontRangeInputValue, setForceFrontRangeInputValue] = useState(
    ""
  ); //「列」入力欄に書かれた値
  const [isFrontInputError, setFrontInputError] = useState(false); //「出席番号」入力欄がエラーかどうか
  const [isFrontListLimitExceeded, setFrontListLimitExceeded] = useState(false);
  const [isRangeInputError, setRangeInputError] = useState(true); ///「列」入力欄がエラーかどうか
  const [isForceFrontFunctionEnabled, setForceFrontFunctionEnabled] = useState(
    true
  ); //強制的に... の左のチェックボックスが有効かどうか（そもそも前列に特定の人を来させる機能を有効にするか無効にするか）

  return (
    <>
      <h2>設定</h2>
      <h3>席数の指定</h3>
      <div className={styles.VerticalContainer}>
        <div className={styles.HorizontalContainer}>
          <div className={styles.sliderText}>縦に並ぶ数</div>
          <div>
            <Slider
              className={styles.slider}
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
              className={styles.sliderInput}
              value={height}
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

        <div className={styles.HorizontalContainer}>
          <div className={styles.sliderText}>横に並ぶ数</div>
          <div>
            <Slider
              className={styles.slider}
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
              className={styles.sliderInput}
              value={width}
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
      <div className={styles.tipText}>
        削除したい席を、左の席イメージ上でクリックすると消去できます。
      </div>
      <div className={styles.buttonContainer}>
        <Button
          color="primary"
          className={styles.restoreButton}
          onClick={Property.onResetSeats}
        >
          削除した席を復元
        </Button>
      </div>
      <div>
        <h3>
          <Checkbox
            color="primary"
            checked={isForceFrontFunctionEnabled}
            onChange={e => setForceFrontFunctionEnabled(e.target.checked)}
          />
          強制的に前列に来る人の設定
        </h3>
      </div>
      <div className={styles.frontRow}>
        前から
        <Input
          placeholder=""
          className={styles.rangeInput}
          color="primary"
          error={isRangeInputError && isForceFrontFunctionEnabled}
          value={ForceFrontRangeInputValue}
          disabled={!isForceFrontFunctionEnabled}
          type="number"
          onChange={e => {
            setForceFrontRangeInputValue(e.target.value);
            try {
              if (e.target.value === "") {
                //空はエラー
                setRangeInputError(true);
                return;
              } else {
                setRangeInputError(false);
              }
              const x: number = parseInt(e.target.value);
              if (x <= 0) setForceFrontRangeInputValue("1");
              else if (x > height)
                setForceFrontRangeInputValue(height.toString());
            } catch (e) {}
          }}
        />
        列目以内に
        <Paper className={`${styles.forceFrontListPaper} ${styles.fixedSize}`}>
          <FixedSizeGrid
            columnCount={2}
            rowCount={ForceFrontList.length / 2 + 1}
            width={vw(40)}
            height={vh(30)}
            columnWidth={vw(20)}
            rowHeight={vh(8)}
            //ここにはCSSのvh vwが使えなかったので手動で関数作ってなんとかしました。
          >
            {ForceFrontListEntryProvider(
              ForceFrontList,
              styles.listEntry,
              (n: number) => {
                const NewArray = ForceFrontList.slice(); //配列を複製
                NewArray.splice(n, 1); //クリックされたものを取り除く
                setForceFrontList(NewArray); //反映
              }
            )}
          </FixedSizeGrid>
        </Paper>
        <div className={styles.addList_div}>
          <span className={styles.addList}>
            出席番号
            <Input
              placeholder=""
              disabled={!isForceFrontFunctionEnabled}
              className={styles.forceFrontInput}
              error={isFrontInputError && isForceFrontFunctionEnabled}
              value={ForceFrontListInputValue}
              type="number"
              onChange={e => {
                setForceFrontListInputValue(e.target.value);
                try {
                  let x: number = parseInt(e.target.value);
                  if (x > width * height) {
                    x = width * height;
                    setForceFrontListInputValue(x.toString());
                  } else if (x <= 0) {
                    x = 1;
                    setForceFrontListInputValue("1");
                  }
                  setFrontInputError(
                    ForceFrontList.includes(x) //すでにリストに入ってたらエラー
                  );
                } catch (e) {}
              }}
            />
            番
          </span>
          <Button
            disabled={
              isFrontInputError ||
              isFrontListLimitExceeded ||
              !isForceFrontFunctionEnabled
            }
            color="primary"
            variant="contained"
            onClick={e => {
              setForceFrontListInputValue("");
              setFrontInputError(true);
              setForceFrontList(
                ForceFrontList.concat(parseInt(ForceFrontListInputValue)).sort(
                  (a, b) => a - b
                )
              );
              setFrontListLimitExceeded(
                ForceFrontList.length >=
                  parseInt(ForceFrontRangeInputValue) * width
              );
            }}
          >
            {isFrontListLimitExceeded ? "数が多すぎます。" : "リストに追加"}
          </Button>
        </div>
      </div>
      <Button
        variant="contained"
        color="secondary"
        disabled={
          isForceFrontFunctionEnabled
            ? !(!(ForceFrontList.length <= 0) && !isRangeInputError)
            : false
        }
        className={styles.executeButton}
        onClick={e => {
          Property.onExecute(
            isForceFrontFunctionEnabled,
            ForceFrontList,
            parseInt(ForceFrontRangeInputValue)
          );
        }}
      >
        実行!
      </Button>
    </>
  );
}

//前列に来る人リストの一つ一つの要素を返す関数を返す関数
function ForceFrontListEntryProvider(
  CurrentList: number[],
  ClassName: string,
  deleteHandler: (n: number) => void
): (props: GridChildComponentProps) => JSX.Element {
  return (props: GridChildComponentProps) => {
    const [isHovered, setHovered] = useState(false);
    const { rowIndex, columnIndex, style } = props;
    const arrayIndex = rowIndex * 2 + columnIndex;
    if (CurrentList.length > arrayIndex) {
      return (
        <ListItem
          button
          style={style}
          className={ClassName}
          onClick={e => deleteHandler(arrayIndex)}
          onMouseEnter={e => setHovered(true)}
          onMouseLeave={e => setHovered(false)}
        >
          <div style={{ display: "flex", alignItems: "flex-start" }}>
            <div>{`${CurrentList[arrayIndex]}番`}</div>
            <small style={{ margin: "0 0 0 11vw" }}>
              <DeleteIcon color={isHovered ? "secondary" : "disabled"} />
            </small>
          </div>
        </ListItem>
      );
    } else {
      return <div></div>;
    }
  };
}
