"use strict";

import * as React from "react";
import * as Styles from "./Styles";
import { Paper } from "@material-ui/core";

type SeatPanelProperty = {
  isEnabled: boolean; //表示されてるかされてないか
  showedNumber: number; //表示される番号
  ID: number; //固有の数字
  onClick: (ID: number) => void; //クリックされた時（消される時）
};

function SeatPanel(Property: SeatPanelProperty) {
  const Style = Styles.SeatPanelStyle();
  return (
    <Paper
      className={Property.isEnabled ? Style.visible : Style.invisible}
      onClick={e => {
        Property.onClick(Property.ID);
      }}
    >
      <div>{Property.showedNumber}</div>
    </Paper>
  );
}

export type Seat = {
  isEnabled: boolean;
  ID: number;
  showedNumber: number;
};

export type SeatsViewProperty = {
  width: number;
  height: number;
  list: Seat[];
  onSeatClick: (ID: number) => void;
};

// 構造はだいたいこんな感じ
// https://imgur.com/a/9RSolAE

export function SeatsView(Property: SeatsViewProperty) {
  const TeacherDeskStyle = Styles.TeacherDesk();
  const TeacherDeskContainerStyle = Styles.TeacherDeskContainer();
  const GridStyle = Styles.SeatsView();

  return (
    <div>
      <h2>席イメージ</h2>
      <div className={TeacherDeskContainerStyle.root}>
        <Paper className={TeacherDeskStyle.root}>教卓</Paper>
      </div>

      <div className={GridStyle.verticalContainer}>
        {Array.from(Array(Property.height).keys()).map(n => {
          return (
            <div className={GridStyle.horizontalContainer} key={n}>
              {Array.from(Array(Property.width).keys()).map(p => {
                return (
                  <SeatPanel
                    key={n * Property.width + p}
                    ID={n * Property.width + p}
                    isEnabled={Property.list[n * Property.width + p].isEnabled}
                    onClick={Property.onSeatClick}
                    showedNumber={
                      Property.list[n * Property.width + p].showedNumber
                    }
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
