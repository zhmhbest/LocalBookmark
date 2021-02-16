# LocalBookmark 2.0

- [View on Github](https://zhmhbest.github.io/LocalBookmark/#)
- [View on Gitee](http://zhmhbest.gitee.io/localbookmark/#)

- [Repository on Github](https://github.com/zhmhbest/LocalBookmark)
- [Repository on Gitee](https://gitee.com/zhmhbest/LocalBookmark)

## 其它功能

### 本仓库提供“无 Internet， 安全”解决方案

```batch
REM Batch
REG add "HKLM\SYSTEM\CurrentControlSet\Services\NlaSvc\Parameters\Internet" /f /v "EnableActiveProbing"   /t REG_DWORD /d 1
REG add "HKLM\SYSTEM\CurrentControlSet\Services\NlaSvc\Parameters\Internet" /f /v "ActiveWebProbeHost"    /t REG_SZ    /d "zhmhbest.gitee.io"
REG add "HKLM\SYSTEM\CurrentControlSet\Services\NlaSvc\Parameters\Internet" /f /v "ActiveWebProbePath"    /t REG_SZ    /d "localbookmark/connecttest.html"
REG add "HKLM\SYSTEM\CurrentControlSet\Services\NlaSvc\Parameters\Internet" /f /v "ActiveWebProbeContent" /t REG_SZ    /d "connected"
echo http://zhmhbest.gitee.io/localbookmark/connecttest.html
```
