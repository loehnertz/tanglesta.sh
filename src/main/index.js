import {
    app,
    BrowserWindow,
    Menu,
    ipcMain,
    shell,
    dialog
} from 'electron'

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
        height: 820,
        width: 820,
        useContentSize: true,
    });

    mainWindow.loadURL(winURL);

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

function registerMenu() {
    let template = [
        {
            label: 'Edit',
            submenu: [
                {role: 'undo'},
                {role: 'redo'},
                {type: 'separator'},
                {role: 'cut'},
                {role: 'copy'},
                {role: 'paste'},
                {role: 'pasteandmatchstyle'},
                {role: 'delete'},
                {role: 'selectall'}
            ]
        },
        {
            label: 'View',
            submenu: [
                {role: 'reload'},
                {type: 'separator'},
                {role: 'resetzoom'},
                {role: 'zoomin'},
                {role: 'zoomout'},
                {type: 'separator'},
                {role: 'togglefullscreen'}
            ]
        },
        {
            role: 'window',
            submenu: [
                {role: 'minimize'},
                {role: 'close'}
            ]
        },
        {
            role: 'help',
            submenu: [
                {
                    label: 'Learn More',
                    click() {
                        shell.openExternal('http://tanglesta.sh/')
                    }
                }
            ]
        }
    ];

    if (process.platform === 'darwin') {
        // App menu
        template.unshift({
            label: app.getName(),
            submenu: [
                {role: 'about'},
                {type: 'separator'},
                {role: 'services', submenu: []},
                {type: 'separator'},
                {role: 'hide'},
                {role: 'hideothers'},
                {role: 'unhide'},
                {type: 'separator'},
                {role: 'quit'}
            ]
        });

        // Edit menu
        template[1].submenu.push(
            {type: 'separator'},
            {
                label: 'Speech',
                submenu: [
                    {role: 'startspeaking'},
                    {role: 'stopspeaking'}
                ]
            }
        );

        // Window menu
        template[3].submenu = [
            {role: 'close'},
            {role: 'minimize'},
            {role: 'zoom'},
            {type: 'separator'},
            {role: 'front'}
        ];
    }

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}

app.on('ready', () => {
    createWindow();
    registerMenu();
});

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

ipcMain.on('open-save-dialog', (e, defaultPath) => {
    const options = {
        title: 'Select save location',
        filters: [
            {name: 'All Files', extensions: ['*']},
        ],
    };
    if (defaultPath) options.defaultPath = defaultPath;
    dialog.showSaveDialog(options, (filename) => {
        e.sender.send('selected-save-location', filename);
    });
});

ipcMain.on('open-file-dialog', (e) => {
    dialog.showOpenDialog({
        properties: ['openFile']
    }, (files) => {
        if (files) e.sender.send('selected-file', files);
    });
});

ipcMain.on('open-directory-dialog', (e) => {
    dialog.showOpenDialog({
        properties: ['openDirectory']
    }, (directories) => {
        if (directories) e.sender.send('selected-directory', directories);
    });
});

ipcMain.on('get-userdata-location', (e) => {
    e.sender.send('retrieved-userdata-location', app.getPath('userData'));
});

ipcMain.on('decrease-z-index-for-modal', (e) => {
    e.sender.sendToAll('decrease-z-index-for-modal');
});

ipcMain.on('increase-z-index-for-modal', (e) => {
    e.sender.sendToAll('increase-z-index-for-modal');
});
