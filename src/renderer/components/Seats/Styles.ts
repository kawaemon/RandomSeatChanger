"use strict";

import CSS from 'csstype';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

export const SeatPanelStyle = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "5vw",
            height: "5vh",
            fontSize: "2.3vmax",
            textAlign: "center",

        },
    }),
);