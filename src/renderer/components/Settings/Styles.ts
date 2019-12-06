"use strict";

import CSS from 'csstype';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';


export const SliderStyle = makeStyles((theme: Theme) =>
    createStyles({
        slider: {
            width: "35vw",
        },
        input: {
            width: "5vw"
        }
    })
)