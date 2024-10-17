import { app, BrowserWindow } from 'electron';
import path from 'path';

const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), // Optional
            contextIsolation: true, // Recommended
            enableRemoteModule: false, // Recommended
        },
    });

    // Load your HTML file here
    win.loadFile(path.join(__dirname, 'dist/index.html'))
        .catch(err => console.error('Failed to load index.html:', err));
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

