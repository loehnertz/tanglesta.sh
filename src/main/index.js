import {app, BrowserWindow, ipcMain, dialog} from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
    global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\');
}

let mainWindow;
const winURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`;

function createWindow() {
    /**
     * Initial window options
     */
    mainWindow = new BrowserWindow({
        height: 563,
        useContentSize: true,
        width: 1000
    });

    mainWindow.loadURL(winURL);

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});


// Custom Listeners

ipcMain.on('open-file-dialog', (e) => {
    dialog.showOpenDialog({
        properties: ['openFile']
    }, (files) => {
        if (files) e.sender.send('selected-file', files)
    });
});

ipcMain.on('open-directory-dialog', (e) => {
    dialog.showOpenDialog({
        properties: ['openDirectory']
    }, (directories) => {
        if (directories) e.sender.send('selected-directory', directories)
    });
});
