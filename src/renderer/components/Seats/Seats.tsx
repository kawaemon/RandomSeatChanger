"use strict";

import * as React from "react";
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(3, 2),
    },
  }),
);

export type SeatProperty = {

};

export type SeatState = {

};

export function seats(Property: SeatProperty, State: SeatState) {
  const classes = useStyles();

  return (
    <>
      <Paper className={classes.root}>
        test
      </Paper>
    </>
  );
}