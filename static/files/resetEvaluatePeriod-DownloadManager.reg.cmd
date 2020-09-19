@ECHO OFF
REG DELETE "HKCU\SOFTWARE\DownloadManager" /f
IF %PROCESSOR_ARCHITECTURE%==AMD64 (
    REG DELETE "HKLM\SOFTWARE\WOW6432Node\Internet Download Manager" /f
) ELSE (
    REG DELETE "HKLM\Software\Internet Download Manager" /f
)
RMDIR /s /q "%AppData%\IDM"
ECHO Finished!
PAUSE>NUL
