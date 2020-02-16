"use strict";

import * as path from "path";
import { app, BrowserWindow } from "electron";
import { autoUpdater } from "electron-updater";
import { format as formatUrl } from "url";

const isDevelopment = process.env.NODE_ENV !== "production";

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow: BrowserWindow | null;
app.commandLine.appendSwitch("lang", "ja");

function createMainWindow() {
  const window = new BrowserWindow({
    webPreferences: { nodeIntegration: true },
    title: `席替えソフト v${require("../../package.json").version}`,
    minWidth: 1000,
    minHeight: 680,
    width: 1000,
    height: 680,
    backgroundColor: "#f0f0f0"
  });

  if (isDevelopment) {
    window.webContents.openDevTools();
    window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`);
    import("electron-devtools-installer").then(m => {
      m.default([m.REDUX_DEVTOOLS, m.REACT_DEVELOPER_TOOLS]).catch(
        console.error
      );
    });
  } else {
    window.loadURL(
      formatUrl({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file",
        slashes: true
      })
    );
  }

  window.on("closed", () => {
    mainWindow = null;
  });

  window.webContents.on("devtools-opened", () => {
    window.focus();
    setImmediate(() => {
      window.focus();
    });
  });

  autoUpdater.checkForUpdatesAndNotify();

  return window;
}

// quit application when all windows are closed
app.on("window-all-closed", () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (mainWindow === null) {
    mainWindow = createMainWindow();
  }
});

// create main BrowserWindow when electron is ready
app.on("ready", () => {
  mainWindow = createMainWindow();
});

// autoUpdater.on("checking-for-update", () =>
//   console.log("アップデートを確認しています...")
// );

// autoUpdater.on("update-available", (e: UpdateInfo) =>
//   console.log(`アップデートがあります。新バージョンは ${e.version}です。`)
// );

// autoUpdater.on("update-not-available", (e: UpdateInfo) =>
//   console.log(`アップデートはありません。`)
// );

// let isDownloading: boolean = false;
// autoUpdater.on("download-progress", (e: ProgressInfo) => {
//   if (!isDownloading) {
//     isDownloading = true;
//     console.log(
//       `アップデートファイルをダウンロードしています。サイズは${Bytes(
//         e.total
//       )}です。`
//     );
//   }
// });

// let isDownloaded: boolean = false;
// autoUpdater.on("update-downloaded", (e: UpdateInfo) => {
//   isDownloaded = true;
//   console.log(
//     "アップデートファイルをダウンロードしました。アプリを再起動するとインストールします。"
//   );
// });
