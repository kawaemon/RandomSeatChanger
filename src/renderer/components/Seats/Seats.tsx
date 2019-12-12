"use strict";

import * as React from "react";
import * as Styles from "./Styles";
import { Grid, Paper } from "@material-ui/core";

type SeatPanelProperty = {
  ID: number;
};

function SeatPanel(Property: SeatPanelProperty) {
  const Style = Styles.SeatPanelStyle();
  return (
    <Paper className={Style.root}>
      <div>{Property.ID}</div>
    </Paper>
  );
}

export type SeatProperty = {
  width: number;
  height: number;
  //list: number[];
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
        {ListForMapHeight.map((n, indexn) => {
          return (
            <div className={GridStyle.horizontalContainer} key={indexn}>
              {ListForMapWidth.map((p, indexp) => {
                return (
                  <SeatPanel ID={n * Property.width + p + 1} key={indexp} />
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
}
