import { app, BrowserWindow } from "electron";
import isDev from "electron-is-dev";

let mainWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 680,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  const url = isDev ? "http://localhost:3000" : "example";
  mainWindow.loadURL(url);
});
