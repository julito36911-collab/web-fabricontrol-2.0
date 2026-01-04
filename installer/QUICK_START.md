# 🚀 FabriControl Installer - Quick Start Guide

## ⚡ Build in 3 Steps

### Step 1: Add Required Files
Before building, you need to add 2 files:

1. **Icon File**: `/app/installer/build/icon.ico`
   - 256x256 pixels
   - ICO format
   - This will be the app icon

2. You're done! The LICENSE.txt is already included.

### Step 2: Open Terminal & Navigate
```bash
cd /app/installer
```

### Step 3: Run Build Script
```bash
build.bat
```

## ⏱️ Build Time
- **Frontend Build**: ~2-3 minutes
- **Backend Build**: ~3-5 minutes  
- **Electron Package**: ~1-2 minutes
- **Total**: ~8-10 minutes

## 📦 Output Location
After successful build:
```
/app/installer/dist/FabriControl_Setup_1.0.0.exe
```

This is your distributable installer!

## ✅ What's Included

The build script automatically:
- ✅ Builds React frontend (production optimized)
- ✅ Packages FastAPI backend into .exe
- ✅ Wraps everything in Electron
- ✅ Creates Windows installer with NSIS
- ✅ Includes desktop shortcut
- ✅ Includes start menu entry
- ✅ Allows custom install directory

## 🎯 Next Steps After Build

1. **Test Locally**:
   ```bash
   # Run the installer
   dist/FabriControl_Setup_1.0.0.exe
   ```

2. **Upload to Server**:
   - GitHub Releases (recommended)
   - AWS S3
   - Cloudflare R2
   - Your CDN

3. **Update Website**:
   Replace in `/app/frontend/public/en/download.html`:
   ```html
   <a href="YOUR_CDN_URL/FabriControl_Setup_1.0.0.exe" download>
   ```

## 🐛 Common Issues

### "Python not found"
```bash
# Add Python to PATH, then restart terminal
```

### "Node not found"  
```bash
# Install Node.js from https://nodejs.org
```

### "yarn not found"
```bash
npm install -g yarn
```

### Backend build fails
```bash
# Install missing dependencies
pip install -r ../backend/requirements.txt
```

## 📊 File Sizes (Approximate)

- Frontend build: ~5-10 MB
- Backend executable: ~50-100 MB
- Final installer: ~150-200 MB

## 🔧 Customization

### Change Version
Edit `/app/installer/package.json`:
```json
{
  "version": "1.0.1"  // Update here
}
```

### Change App Name
Edit `/app/installer/package.json`:
```json
{
  "productName": "FabriControl Pro"  // Update here
}
```

### Change Ports
Edit `/app/installer/electron/main.js`:
```javascript
const BACKEND_PORT = 8001;
const FRONTEND_PORT = 3000;
```

---

## 🎉 You're Ready!

Just add the icon file and run `build.bat`!
