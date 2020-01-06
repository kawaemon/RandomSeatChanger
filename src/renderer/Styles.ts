"use strict";

import CSS from "csstype";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

export const MainPaperStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      //padding: theme.spacing(3, 2),
      width: "43vw",
      height: "92vh",
      padding: "0.5vh 2vw"
    }
  })
);

export const BodyStyle: CSS.Properties = {
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};
