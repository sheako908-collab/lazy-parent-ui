$ErrorActionPreference = "Stop"
# 强制设置输出编码为 UTF8，解决中文乱码
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "🚀 正在通过相对路径准备全栈版本部署..." -ForegroundColor Green

# 1. 定义 Git 绝对路径
$gitPath = "C:\Users\Lenovo\AppData\Local\GitHubDesktop\app-3.5.2\resources\app\git\cmd\git.exe"

# 2. 定位到脚本所在的当前目录 (解决 D:\懒爸妈 乱码问题)
$targetDir = $PSScriptRoot
Set-Location $targetDir
Write-Host "> 当前工作目录: $targetDir" -ForegroundColor Gray

# 3. 执行 Git 标准三部曲
Write-Host "> 正在暂存文件..." -ForegroundColor Cyan
& $gitPath add .

Write-Host "> 正在提交记录..." -ForegroundColor Cyan
# 使用 -m "" 避免某些环境下的编码问题
& $gitPath commit -m "Final Fullstack Deployment"


Write-Host "✅ 部署同步完成！代码已发往 Vercel。" -ForegroundColor Green
Write-Host "请等待 2 分钟后打开 Vercel 链接测试。" -ForegroundColor Yellow
Start-Sleep -Seconds 3
