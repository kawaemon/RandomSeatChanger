// Initial welcome page. Delete the following line to remove it.
"use strict";

/*const styles=document.createElement('style');styles.innerText=`@import url(https://unpkg.com/spectre.css/dist/spectre.min.css);.empty{display:flex;flex-direction:column;justify-content:center;height:100vh;position:relative}.footer{bottom:0;font-size:13px;left:50%;opacity:.9;position:absolute;transform:translateX(-50%);width:100%}`;const vueScript=document.createElement('script');vueScript.setAttribute('type','text/javascript'),vueScript.setAttribute('src','https://unpkg.com/vue'),vueScript.onload=init,document.head.appendChild(vueScript),document.head.appendChild(styles);function init(){Vue.config.devtools=false,Vue.config.productionTip=false,new Vue({data:{versions:{electron:process.versions.electron,electronWebpack:require('electron-webpack/package.json').version}},methods:{open(b){require('electron').shell.openExternal(b)}},template:`<div><div class=empty><p class="empty-title h5">Welcome to your new project!<p class=empty-subtitle>Get qwdqwd now and take advantage of the great documentation at hand.<div class=empty-action><button @click="open('https://webpack.electron.build')"class="btn btn-primary">Documentation</button> <button @click="open('https://electron.atom.io/docs/')"class="btn btn-primary">Electron</button><br><ul class=breadcrumb><li class=breadcrumb-item>electron-webpack v{{ versions.electronWebpack }}</li><li class=breadcrumb-item>electron v{{ versions.electron }}</li></ul></div><p class=footer>This intitial landing page can be easily removed from <code>src/renderer/index.js</code>.</p></div></div>`}).$mount('#app')}*/

import * as React from "react";
import * as ReactDOM from "react-dom";
import { Grid, Paper } from "@material-ui/core/";

import * as SeatComponent from "./components/SeatsView/SeatsView";
import * as SettingsComponent from "./components/Settings/Settings";

import * as Styles from "./Styles";

require("./Global.css");

type Seats = { width: number; height: number; array: SeatComponent.Seat[] };
let DefaultSeat: SeatComponent.Seat[] = buildSeatArray(5, 5);

function sizeChangeHandler(
  isWidth: boolean,
  value: number,
  currentSeats: Seats,
  setSeats: (s: Seats) => void
) {
  let width, height: number;

  if (isWidth) {
    width = value;
    height = currentSeats.height;
  } else {
    width = currentSeats.width;
    height = value;
  }

  let SeatArray: SeatComponent.Seat[] = currentSeats.array;

  if (currentSeats.array.length !== width * height) {
    SeatArray = buildSeatArray(width, height);
  }

  setSeats({
    width: width,
    height: height,
    array: SeatArray
  });
}

function seatClickHandler(
  ID: number,
  currentSeats: Seats,
  setSeats: (s: Seats) => void
) {
  let newArray: SeatComponent.Seat[] = currentSeats.array;
  newArray[ID].isEnabled = false;

  let GenNumber = 0;
  for (let i = 0; i < newArray.length; i++) {
    if (newArray[i].isEnabled) ++GenNumber;
    newArray[i].showedNumber = GenNumber;
  }

  setSeats({
    width: currentSeats.width,
    height: currentSeats.height,
    array: newArray
  });
}

function buildSeatArray(width: number, height: number): SeatComponent.Seat[] {
  let newArray: SeatComponent.Seat[] = [];
  for (let i = 0; i < width * height; i++) {
    newArray.push({ isEnabled: true, ID: i + 1, showedNumber: i + 1 });
  }
  return newArray;
}

function Execute(
  CurrentSeats: SeatComponent.Seat[],
  width: number,
  isForceFrontFuntcionEnabled: boolean,
  ForceFrontList: number[],
  ForceFrontRange: number
): SeatComponent.Seat[] {
  console.log(
    `execute ${CurrentSeats} ${width} ${isForceFrontFuntcionEnabled} ${ForceFrontList} ${ForceFrontRange}`
  );

  //シャッフルする対象の席を抜き出し
  const EnabledSeats: SeatComponent.Seat[] = CurrentSeats.filter(
    s => s.isEnabled
  );

  const ShowedNumbers: number[] = EnabledSeats.map(s => s.showedNumber);

  //シャッフル (Fisher-Yates)
  while (true) {
    for (let i = ShowedNumbers.length - 1; i > 0; i--) {
      let r = Math.floor(Math.random() * (i + 1));
      let tmp = ShowedNumbers[i];
      ShowedNumbers[i] = ShowedNumbers[r];
      ShowedNumbers[r] = tmp;
    }
    if (!isForceFrontFuntcionEnabled) break;

    let flag: boolean = false;
    ForceFrontList.forEach(n => {
      flag = flag || ShowedNumbers.indexOf(n) > width * ForceFrontRange - 1;
    });
    if (!flag) break;
  }

  //書き戻し
  for (let i: number = 0; i < EnabledSeats.length; i++) {
    EnabledSeats[i].showedNumber = ShowedNumbers[i];
  }
  const NewArray = CurrentSeats.slice();
  for (let i: number = 0; i < NewArray.length; i++) {
    EnabledSeats.forEach(s => {
      if (NewArray[i].ID == s.ID) {
        NewArray[i].showedNumber = s.showedNumber;
      }
    });
  }

  return NewArray;
}

function App() {
  const MainPaperStyle = Styles.MainPaperStyle();
  const [seats, setSeats] = React.useState<Seats>({
    width: 5,
    height: 5,
    array: DefaultSeat
  });

  return (
    <div style={Styles.BodyStyle}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <Paper className={MainPaperStyle.root}>
            <SeatComponent.SeatsView
              width={seats.width}
              height={seats.height}
              list={seats.array}
              onSeatClick={i => seatClickHandler(i, seats, setSeats)}
            />
          </Paper>
        </Grid>
        <Grid item>
          <Paper className={MainPaperStyle.root}>
            <SettingsComponent.Settings
              onWidthChange={w => sizeChangeHandler(true, w, seats, setSeats)}
              onHeightChange={h => sizeChangeHandler(false, h, seats, setSeats)}
              onResetSeats={() =>
                setSeats({
                  width: seats.width,
                  height: seats.height,
                  array: buildSeatArray(seats.width, seats.height)
                })
              }
              onExecute={(a, b, c) =>
                setSeats({
                  ...seats,
                  array: Execute(seats.array, seats.width, a, b, c)
                })
              }
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

//viewport settings
let meta = document.createElement("meta");
meta.name = "viewport";
meta.content =
  "width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1, user-scalable=no";

document.head.appendChild(meta);
ReactDOM.render(<App />, document.getElementById("app"));
