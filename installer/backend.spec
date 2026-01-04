# -*- mode: python ; coding: utf-8 -*-

block_cipher = None

a = Analysis(
    ['../backend/server.py'],
    pathex=['../backend'],
    binaries=[],
    datas=[
        ('../backend/.env', '.'),
        ('../backend/routes', 'routes'),
        ('../backend/models', 'models'),
        ('../backend/utils', 'utils'),
    ],
    hiddenimports=[
        'fastapi',
        'uvicorn',
        'uvicorn.logging',
        'uvicorn.loops',
        'uvicorn.loops.auto',
        'uvicorn.protocols',
        'uvicorn.protocols.http',
        'uvicorn.protocols.http.auto',
        'uvicorn.protocols.websockets',
        'uvicorn.protocols.websockets.auto',
        'uvicorn.lifespan',
        'uvicorn.lifespan.on',
        'pydantic',
        'pydantic.fields',
        'pymongo',
        'motor',
        'motor.motor_asyncio',
        'passlib',
        'passlib.handlers',
        'passlib.handlers.bcrypt',
        'python_multipart',
        'python-jose',
        'jose',
        'email_validator',
    ],
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=[],
    win_no_prefer_redirects=False,
    win_private_assemblies=False,
    cipher=block_cipher,
    noarchive=False,
)

pyz = PYZ(a.pure, a.zipped_data, cipher=block_cipher)

exe = EXE(
    pyz,
    a.scripts,
    [],
    exclude_binaries=True,
    name='fabricontrol-backend',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    console=True,
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
    icon='../installer/build/icon.ico'
)

coll = COLLECT(
    exe,
    a.binaries,
    a.zipfiles,
    a.datas,
    strip=False,
    upx=True,
    upx_exclude=[],
    name='fabricontrol-backend',
)
