"use strict";

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

export const SeatPanelStyle = makeStyles((theme: Theme) =>
  createStyles({
    visible: {
      width: "5vw",
      height: "5vh",
      fontSize: "2.5vmin",
      textAlign: "center",
      marginBottom: "0.3vh",
      marginTop: "0.3vh",
      marginLeft: "0.3vw",
      marginRight: "0.3vw"
    },
    invisible: {
      width: "5vw",
      height: "5vh",
      fontSize: "2.5vmin",
      textAlign: "center",
      marginBottom: "0.3vh",
      marginTop: "0.3vh",
      marginLeft: "0.3vw",
      marginRight: "0.3vw",
      opacity: 0
    }
  })
);

export const TeacherDeskContainer = makeStyles({
  root: {
    width: "100%",
    display: "flex",
    justifyContent: "center"
  }
});

export const TeacherDesk = makeStyles({
  root: {
    width: "10vw",
    height: "5vh",
    fontSize: "2.5vmin",
    alignItems: "center",
    justifyContent: "center",
    display: "flex"
  }
});

export const Grid = makeStyles({
  root: {
    transform: "translateY(5vh)"
  },
  horizontalContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row"
  },
  verticalContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    transform: "translateY(3vh)"
  }
});
