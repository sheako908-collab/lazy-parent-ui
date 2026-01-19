@echo off
rem Switch to the correct drive and directory
d:
cd "d:\懒爸妈\lazy-parent-app"

echo Pushing to GitHub from %CD%...
"C:\Users\Lenovo\AppData\Local\GitHubDesktop\app-3.5.2\resources\app\git\cmd\git.exe" push -u origin master

echo.
echo If prompts appear, please enter your credentials.
pause
