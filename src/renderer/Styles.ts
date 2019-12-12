"use strict";

import CSS from "csstype";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

export const MainPaperStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      //padding: theme.spacing(3, 2),
      width: "45vw",
      height: "90vh"
    }
  })
);

export const BodyStyle: CSS.Properties = {
  width: "99vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};
