@echo off

start cmd /k "npm install"
start cmd /k "cd Backend && pip install -r requirements.txt"
timeout /t 10 /nobreak
start cmd /k "npm run build && npm start"
start cmd /k "cd Backend && python app.py"
pause
