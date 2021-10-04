const electron = require('electron'),
app = electron.app,
BrowserWindow = electron.BrowserWindow;
   
const path = require('path'),
isDev = require('electron-is-dev');
const server = require("./server.js");
   
let mainWindow;
   
const createWindow = () => {
  mainWindow = new BrowserWindow({ width: 480, height: 320,  icon: __dirname + '../src/assets/Icon.icns' })
  const appUrl = 'http://localhost:3000' 
  mainWindow.loadURL(appUrl)
  mainWindow.maximize()
  mainWindow.setFullScreen(true)
  mainWindow.on('closed', () => mainWindow = null)
}
app.on('ready', createWindow)
app.on('window-all-closed', () => {
  // Follow OS convention on whether to quit app when
  // all windows are closed.
  if (process.platform !== 'darwin') { app.quit() }
})

app.on(
  "window-all-closed",
  () => process.platform !== "darwin" && app.quit() // "darwin" targets macOS only.
);

app.on('activate', () => {
  // If the app is still open, but no windows are open,
  // create one when the app comes into focus.
  if (mainWindow === null) { createWindow() }
})