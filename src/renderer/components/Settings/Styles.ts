"use strict";

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

export const SliderStyle = makeStyles((theme: Theme) =>
  createStyles({
    slider: {
      width: "35vw",
      color: "red"
    },
    input: {
      width: "5vw"
    },
    test: {
      width: "40vw"
    }
  })
);

export const SettingsEntryStyle = makeStyles({
  root: {
    width: "40vw",
    marginLeft: "1.5vw"
  }
});
