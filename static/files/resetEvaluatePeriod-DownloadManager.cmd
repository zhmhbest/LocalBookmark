@ECHO OFF
REG DELETE "HKCU\SOFTWARE\DownloadManager" /f
IF %PROCESSOR_ARCHITECTURE%==AMD64 (
    REM REG DELETE "HKCR\IDMan.CIDMLinkTransmitter" /f
    REG DELETE "HKCU\SOFTWARE\DownloadManager" /f
    REG DELETE "HKLM\SOFTWARE\WOW6432Node\Internet Download Manager" /f
    REG DELETE "HKLM\SOFTWARE\WOW6432Node\Microsoft\DownloadManager" /f
    REM REG DELETE "HKLM\SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Uninstall\Internet Download Manager" /f
) ELSE (
    ECHO Dose not support win32 system!
    PAUSE>NUL & EXIT
)

RMDIR /s /q "%AppData%\IDM"
ECHO Finished!
PAUSE>NUL
