@echo off

:: Navigate to elite-dwell-assist
echo Running in elite-dwell-assist...
cd elite-dwell-assist
start cmd /k "npm run start"

:: Navigate to elite-dwell-assist-server
echo Running in elite-dwell-assist-server...
cd ..\elite-dwell-assist-server
start cmd /k "npm run start"