@echo off
echo ========================================
echo FabriControl - Complete Build Script
echo ========================================
echo.

REM Step 0: Check Prerequisites
echo [0/5] Checking prerequisites...
where python >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Python is not installed or not in PATH
    pause
    exit /b 1
)

where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed or not in PATH
    pause
    exit /b 1
)

echo Prerequisites OK
echo.

REM Step 1: Build Frontend
echo [1/5] Building React Frontend...
cd ../frontend
call yarn install
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to install frontend dependencies
    pause
    exit /b 1
)

call yarn build
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to build frontend
    pause
    exit /b 1
)

echo Copying frontend build to installer...
xcopy /E /I /Y build ..\installer\frontend-build
echo.

REM Step 2: Build Backend with PyInstaller
echo [2/5] Building FastAPI Backend with PyInstaller...
cd ../backend

echo Installing backend dependencies...
pip install -r requirements.txt
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to install backend dependencies
    pause
    exit /b 1
)

echo Installing PyInstaller...
pip install pyinstaller
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to install PyInstaller
    pause
    exit /b 1
)

echo Building backend executable...
cd ../installer
pyinstaller backend.spec --clean
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: PyInstaller build failed
    pause
    exit /b 1
)

echo Copying backend dist to installer...
xcopy /E /I /Y dist\fabricontrol-backend ..\installer\backend-dist
echo.

REM Step 3: Install Electron Dependencies
echo [3/5] Installing Electron dependencies...
cd installer
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to install Electron dependencies
    pause
    exit /b 1
)
echo.

REM Step 4: Build Electron App
echo [4/5] Building Electron installer...
call npm run dist
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Electron build failed
    pause
    exit /b 1
)
echo.

REM Step 5: Complete
echo [5/5] Build Complete!
echo.
echo ========================================
echo OUTPUT LOCATION:
echo dist\FabriControl_Setup_1.0.0.exe
echo ========================================
echo.
echo You can now distribute this installer!
pause
