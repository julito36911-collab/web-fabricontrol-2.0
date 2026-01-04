const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let mainWindow;
let backendProcess;

const BACKEND_PORT = 8001;
const FRONTEND_PORT = 3000;

function startBackend() {
  const isDev = !app.isPackaged;
  
  if (isDev) {
    console.log('Development mode: Backend should be running separately');
    return;
  }

  // Path to the packaged backend executable
  const backendPath = path.join(process.resourcesPath, 'backend', 'fabricontrol-backend.exe');
  
  console.log('Starting backend from:', backendPath);
  
  backendProcess = spawn(backendPath, [], {
    cwd: path.join(process.resourcesPath, 'backend'),
    env: {
      ...process.env,
      PORT: BACKEND_PORT.toString()
    }
  });

  backendProcess.stdout.on('data', (data) => {
    console.log(`Backend: ${data}`);
  });

  backendProcess.stderr.on('data', (data) => {
    console.error(`Backend Error: ${data}`);
  });

  backendProcess.on('close', (code) => {
    console.log(`Backend process exited with code ${code}`);
  });
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    icon: path.join(__dirname, '../build/icon.ico'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    },
    autoHideMenuBar: true,
    title: 'FabriControl'
  });

  const isDev = !app.isPackaged;
  
  if (isDev) {
    // Development: Load from localhost
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools();
  } else {
    // Production: Load from packaged files
    const frontendPath = path.join(process.resourcesPath, 'frontend', 'index.html');
    mainWindow.loadFile(frontendPath);
  }

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  startBackend();
  
  // Wait 2 seconds for backend to start
  setTimeout(() => {
    createWindow();
  }, 2000);

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (backendProcess) {
    backendProcess.kill();
  }
  
  if (process.platform !== 'darwin') app.quit();
});

app.on('before-quit', () => {
  if (backendProcess) {
    backendProcess.kill();
  }
});
