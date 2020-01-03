"use strict";

import { makeStyles } from "@material-ui/core/styles";

export const Styles = makeStyles({
  slider: {
    marginTop: "0.4vw",
    width: "28vw",
    WebkitAppRegion:"none"
  },
  sliderInput: {
    width: "5vw",
    fontSize: "1.3vw"
  },
  VerticalContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column"
  },
  HorizontalContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  buttonContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end"
  },
  forceFrontListPaper: {
    width: "25vw",
    height: "30vh",
    marginBottom: "1vh"
  },
  forceFrontInput: {
    width: "11vw",
    marginRight: "2vw"
  },
  rangeInput: {
    width: "4vw"
  },
  executeButton: {
    marginLeft: "34vw",
    width: "10vw",
    height: "6vh"
  },
  listEntry: {
    width: "100%"
  },
  restoreButton: {
    marginTop: "1vh",
    marginLeft: "30vw",
    marginBottom: "1vh",
    fontSize: "1.1vw"
  },
  sliderText: {
    fontSize: "1.4vw"
  },
  tipText: {
    fontSize: "1.4vw",
    marginBottom: "2vh"
  }
});
