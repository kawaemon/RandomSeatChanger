"use strict";

import { createStyles, makeStyles } from "@material-ui/core/styles";

export const SliderStyle = makeStyles(
  createStyles({
    slider: {
      marginTop: "0.4vw",
      width: "28vw"
    },
    input: {
      width: "5vw",
      fontSize: "1.3vw"
    }
  })
);

export const ContainerStyle = makeStyles({
  toplevel: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column"
  },
  secondLevel: {
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
  forceFrontListContainer1: {
    display: "flex",
    flexDirection: "row"
  },
  forceFrontListContainer2: {
    display: "flex",
    flexDirection: "column"
  },
  forceFrontPaper: {
    width: "25vw",
    height: "30vh",
    marginBottom: "1vh"
  },
  input: {
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
  ListEntry: {
    width: "100%"
  }
});

export const ButtonStyle = makeStyles({
  button: {
    marginTop: "1vh",
    marginLeft: "30vw",
    marginBottom: "1vh",
    fontSize: "1.1vw"
  }
});

export const TextStyle = makeStyles({
  sliderText: {
    fontSize: "1.4vw"
  },
  tipText: {
    fontSize: "1.4vw",
    marginBottom: "2vh"
  }
});
