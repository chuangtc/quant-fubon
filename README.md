# quant-fubon

Python and TypeScript version of interaction with Fubon TradeAPI

### Pre-Required

- python3>=3.10
- nvm (macOS, Linux) or nvm-windows (Windows)
- node v22

## python3

### pip install

```bash
python3 -m venv .venv
# Linux and macOS
source .venv/bin/activate
# Windows 11
.\.venv\Scripts\Activate.ps1

pip install -r requirements.txt
pip install --force-reinstall --no-cache ./lib/fubon-neo-py/XXXX.whl
python quant_fubon/run1_check_accounts.py
```

## nodejs v22

### Install TypeScript related

```bash
npm install
```

### Use npm run DEV src/index.ts

```bash
npm run dev
```

### Use node run DEV src/index.js

```bash
node src/index.js
```
