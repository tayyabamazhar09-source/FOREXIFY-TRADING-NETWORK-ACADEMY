@echo off
title Opening Forexify Academy Website...
echo Opening Forexify Trading Network & Academy in your browser...
if exist "C:\Program Files\Google\Chrome\Application\chrome.exe" (
    start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" "%~dp0index.html"
) else (
    start "" msedge "%~dp0index.html"
)
