@ECHO OFF
FOR /F "usebackq delims=" %%f in (`DIR /A:D /B "%Userprofile%\.IntelliJIdea*" "%Userprofile%\.CLion*"`) DO (
    CD /D "%Userprofile%\%%f"
    REM Eval
    RMDIR /S /Q .\config\eval 2>NUL
    DEL /F .\config\options\other.xml 2>NUL
    REM Cache
    RMDIR /S /Q .\config\terminal 2>NUL
    RMDIR /S /Q .\config\workspace 2>NUL
    RMDIR /S /Q .\system\log 2>NUL
)
REG DELETE "HKCU\SOFTWARE\JavaSoft\Prefs\jetbrains" /f >NUL 2>NUL
ECHO Finished!
PAUSE>NUL