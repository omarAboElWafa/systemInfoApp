//modules from electron
const {app, BrowserWindow} = require('electron');

//to load the index.html file
//core modules from node
const path = require('path');
const url = require('url');



//to keep the window object opened after garbage collecting the js object
//Global Reference to the window object
//init Window
let window;


function createWindow() {
  //creates the object (browser Window)
  window = new BrowserWindow({
    width: 800,
    height:600,
    icon: __dirname+'/img/syslogo.jpg',
    webPreferences: {
      nodeIntegration: true
    }
  });

    //loads the index.html
    window.loadURL(url.format({
      pathname: path.join(__dirname, 'index.html'),
      //as we use the file system
      protocol: 'file:',
      slashes: true
    }));

    //open devtools
    window.webContents.openDevTools();

    window.on('closed', () => {
      window = null;
    });
}

//Run createWindow function
app.on('ready', createWindow);

//Quite when all windows are closed
app.on('window-all-closed', () => {
  //if is not on Mac device
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
