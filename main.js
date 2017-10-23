const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

// Keep global reference of the window object, if not,
// the window will be closed when the javascript is garbage collected
let window;

// FUnction to create a window
function createWindow() {
  // Create the browser window
  window = new BrowserWindow({
    width: 1281,
    height: 800,
    minWidth: 1281,
    minHeight: 800,
  });

  // Load the index.html of the App
  window.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true,
  }));

  // Open the DevTools
  window.webContents.openDevTools();

  // Emitted when the window is closed
  window.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    window = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed
app.on('window-all-closed', () => {
  // Check if not a mac
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (window === null) {
    createWindow();
  }
});
