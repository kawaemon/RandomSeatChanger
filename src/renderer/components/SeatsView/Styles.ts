"use strict";

import { makeStyles } from "@material-ui/core/styles";

// 参照
// https://imgur.com/a/9RSolAE

export const SeatPanelStyle = makeStyles({
  visible: {
    width: "5vw",
    height: "5vh",
    fontSize: "2.5vmin",
    textAlign: "center",
    marginBottom: "0.4vh",
    marginTop: "0.4vh",
    marginLeft: "0.4vw",
    marginRight: "0.4vw",
    border:"1px solid #ccc"
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
});

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
    display: "flex",
    border:"1px solid #ccc"
  }
});

export const SeatsView = makeStyles({
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
