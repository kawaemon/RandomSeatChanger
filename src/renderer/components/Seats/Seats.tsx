"use strict";

import * as React from "react";
import * as Styles from "./Styles";
import { Paper } from "@material-ui/core";

type SeatPanelProperty = {
  isEnabled: boolean;
  showedNumber: number;
  ID: number;
  onClick: (ID: number) => void;
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

export type SeatProperty = {
  width: number;
  height: number;
  list: Seat[];
  onClick: (ID: number) => void;
};

export function seats(Property: SeatProperty) {
  const ListForMapWidth: number[] = Array.from(Array(Property.width).keys());
  const ListForMapHeight: number[] = Array.from(Array(Property.height).keys());
  const TeacherDeskStyle = Styles.TeacherDesk();
  const TeacherDeskContainerStyle = Styles.TeacherDeskContainer();
  const GridStyle = Styles.Grid();

  return (
    <>
      <h2>席イメージ</h2>
      <div className={TeacherDeskContainerStyle.root}>
        <Paper className={TeacherDeskStyle.root}>教卓</Paper>
      </div>

      <div className={GridStyle.verticalContainer}>
        {ListForMapHeight.map(n => {
          return (
            <div className={GridStyle.horizontalContainer} key={n}>
              {ListForMapWidth.map(p => {
                return (
                  <SeatPanel
                    key={n * Property.width + p + 1}
                    ID={n * Property.width + p}
                    isEnabled={Property.list[n * Property.width + p].isEnabled}
                    onClick={Property.onClick}
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
    </>
  );
}
