"use strict";

import * as React from "react";
import * as Styles from "./Styles"
import { Typography, Grid, Slider, Input, Paper } from '@material-ui/core';

type SeatPanelProperty = {
  ID: number
};

function SeatPanel(Property: SeatPanelProperty) {
  const Style = Styles.SeatPanelStyle();
  return (
    <Paper className={Style.root}>
      <div>
        {Property.ID}
      </div>
    </Paper>
  )
}

export type SeatProperty = {
  width: number;
  height: number;
  //list: number[];
};


export function seats(Property: SeatProperty) {
  const ListForMapWidth: number[] = Array.from(Array(Property.width).keys());
  const ListForMapHeight: number[] = Array.from(Array(Property.height).keys());


  return (
    <>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        {ListForMapHeight.map(n => {
          return (
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={2}
            >
              {ListForMapWidth.map(p => {
                return (
                  <Grid item>
                    <SeatPanel ID={n * Property.width + p + 1} />
                  </Grid>
                );
              })}
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
