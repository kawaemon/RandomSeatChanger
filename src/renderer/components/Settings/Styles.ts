"use strict";

import { makeStyles } from "@material-ui/core/styles";

export const Styles = makeStyles({
  slider: {
    marginTop: "0.4vw",
    width: "28vw",
    WebkitAppRegion: "none"
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
    width: "4vw"
  },
  addList: {
    marginRight: "1vw"
  },
  frontRow: {
    margin: "0 1vw"
  },
  rangeInput: {
    width: "3.5vw",
    margin: "1vh 0"
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
    fontSize: "0.8rem"
  },
  sliderText: {
    fontSize: "1.4vw"
  },
  tipText: {
    fontSize: "0.85rem",
    textAlign: "right",
    marginTop: "1vh"
  },
  fixedSize: {
    border: "1px solid #4153AF",
    boxShadow:
      "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12), inset 0 0 1px #4153AF",
    borderRadius: "4px"
  }
});
