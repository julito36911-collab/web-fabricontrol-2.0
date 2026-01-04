# FabriControl Installer - Build Instructions

## Prerequisites

Before building the installer, ensure you have the following installed:

1. **Python 3.10+**
   - Download from: https://www.python.org/downloads/
   - Make sure to check "Add Python to PATH" during installation

2. **Node.js 18+**
   - Download from: https://nodejs.org/
   - This includes npm automatically

3. **Yarn** (for frontend build)
   ```bash
   npm install -g yarn
   ```

4. **PyInstaller** (will be installed by build script)
   ```bash
   pip install pyinstaller
   ```

## Project Structure

```
/app/
├── backend/           # FastAPI backend source
├── frontend/          # React frontend source
└── installer/         # Build scripts and config
    ├── package.json       # Electron builder config
    ├── backend.spec       # PyInstaller spec file
    ├── build.bat          # Automated build script
    ├── electron/
    │   └── main.js        # Electron main process
    ├── build/
    │   └── icon.ico       # Application icon (YOU NEED TO ADD THIS)
    └── LICENSE.txt        # License file (YOU NEED TO ADD THIS)
```

## Build Process

### Option 1: Automated Build (Recommended)

1. Navigate to the installer directory:
   ```bash
   cd /app/installer
   ```

2. Run the build script:
   ```bash
   build.bat
   ```

3. The script will:
   - Build the React frontend
   - Package the FastAPI backend with PyInstaller
   - Create an Electron wrapper
   - Generate the final installer

4. Find your installer at:
   ```
   /app/installer/dist/FabriControl_Setup_1.0.0.exe
   ```

### Option 2: Manual Build

If you need to build step by step:

#### Step 1: Build Frontend
```bash
cd /app/frontend
yarn install
yarn build
xcopy /E /I /Y build ../installer/frontend-build
```

#### Step 2: Build Backend
```bash
cd /app/backend
pip install -r requirements.txt
pip install pyinstaller
cd ../installer
pyinstaller backend.spec --clean
xcopy /E /I /Y dist/fabricontrol-backend backend-dist
```

#### Step 3: Build Electron Installer
```bash
cd /app/installer
npm install
npm run dist
```

## Important Files to Add

Before building, you MUST add these files:

1. **Application Icon** (`/app/installer/build/icon.ico`)
   - 256x256 ICO file
   - Will be used for the app and installer

2. **License File** (`/app/installer/LICENSE.txt`)
   - Your software license text
   - Will be shown during installation

## Configuration

### Update Version

Edit `/app/installer/package.json`:
```json
{
  "version": "1.0.0"  // Change this
}
```

### Update Backend Port

Edit `/app/installer/electron/main.js`:
```javascript
const BACKEND_PORT = 8001;  // Change if needed
```

## Troubleshooting

### Backend executable doesn't start
- Check if all dependencies are in `backend.spec` `hiddenimports`
- Verify `.env` file is included in `datas`

### Frontend shows blank screen
- Ensure `yarn build` completed successfully
- Check that `frontend-build` directory exists

### Installer build fails
- Run `npm install` in installer directory
- Check that both `frontend-build` and `backend-dist` directories exist

### "Python not found" error
- Make sure Python is in your PATH
- Restart your terminal after installing Python

## Output Files

Successful build will create:

- `FabriControl_Setup_1.0.0.exe` - Main installer (distributable)
- `dist/win-unpacked/` - Unpacked application (for testing)

## Testing the Installer

1. Run the installer on a clean Windows machine
2. Install to default location or custom path
3. Launch FabriControl from desktop shortcut
4. Verify:
   - Backend starts automatically
   - Frontend loads
   - MongoDB connection works
   - All features functional

## Distribution

Once built, you can distribute `FabriControl_Setup_1.0.0.exe` to users.

Recommended hosting:
- GitHub Releases
- AWS S3
- Cloudflare R2
- Your own CDN

## Next Steps

After building:

1. Test the installer thoroughly
2. Upload to your download server
3. Update website download links:
   - `/en/download.html`
   - `/descargar` (Spanish version)
4. Announce the release!

---

**Questions?** Check the main documentation or contact the development team.
