"use strict";

import { createStyles, makeStyles } from "@material-ui/core/styles";

export const SliderStyle = makeStyles(
  createStyles({
    slider: {
      width: "28vw"
    },
    input: {
      width: "5vw"
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
  }
});

export const ButtonStyle = makeStyles({
  button: {
    marginTop: "1vh",
    marginLeft: "30vw",
    marginBottom: "1vh"
  }
});

export const TextStyle = makeStyles({
  sliderText: {
    fontSize: "1.4vw"
  },
  tipText: {
    fontSize: "1.4vw"
  }
});
