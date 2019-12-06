// Initial welcome page. Delete the following line to remove it.
"use strict";

/*const styles=document.createElement('style');styles.innerText=`@import url(https://unpkg.com/spectre.css/dist/spectre.min.css);.empty{display:flex;flex-direction:column;justify-content:center;height:100vh;position:relative}.footer{bottom:0;font-size:13px;left:50%;opacity:.9;position:absolute;transform:translateX(-50%);width:100%}`;const vueScript=document.createElement('script');vueScript.setAttribute('type','text/javascript'),vueScript.setAttribute('src','https://unpkg.com/vue'),vueScript.onload=init,document.head.appendChild(vueScript),document.head.appendChild(styles);function init(){Vue.config.devtools=false,Vue.config.productionTip=false,new Vue({data:{versions:{electron:process.versions.electron,electronWebpack:require('electron-webpack/package.json').version}},methods:{open(b){require('electron').shell.openExternal(b)}},template:`<div><div class=empty><p class="empty-title h5">Welcome to your new project!<p class=empty-subtitle>Get qwdqwd now and take advantage of the great documentation at hand.<div class=empty-action><button @click="open('https://webpack.electron.build')"class="btn btn-primary">Documentation</button> <button @click="open('https://electron.atom.io/docs/')"class="btn btn-primary">Electron</button><br><ul class=breadcrumb><li class=breadcrumb-item>electron-webpack v{{ versions.electronWebpack }}</li><li class=breadcrumb-item>electron v{{ versions.electron }}</li></ul></div><p class=footer>This intitial landing page can be easily removed from <code>src/renderer/index.js</code>.</p></div></div>`}).$mount('#app')}*/

import * as React from "react";
import { useState } from "react";
import * as ReactDOM from "react-dom";
import { Grid, Paper } from "@material-ui/core/";

import * as SeatComponent from "./components/Seats/Seats";
import * as SettingsComponent from "./components/Settings/Settings";

import * as Styles from "./Styles"

require("./SetFonts.css");

function App() {
  const MainPaperStyle = Styles.MainPaperStyle();
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  return (
    <div>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <Paper className={MainPaperStyle.root}>
            <SeatComponent.seats width={width} height={6} />
          </Paper>
        </Grid>
        <Grid item>
          <Paper className={MainPaperStyle.root}>
            <SettingsComponent.settings onWidthChange={setWidth} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

let meta = document.createElement("meta");
meta.name = "viewport";
meta.content = "width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1, user-scalable=no";

document.head.appendChild(meta);
ReactDOM.render(<App />, document.getElementById("app"));
