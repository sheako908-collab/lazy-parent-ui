$ErrorActionPreference = "Continue"
# 强制设置输出编码为 UTF8，解决中文乱码
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "🚀 正在全速同步修复补丁到 Vercel (Main 分支)..." -ForegroundColor Green

# 1. 定义 Git 绝对路径
$gitPath = "C:\Users\Lenovo\AppData\Local\GitHubDesktop\app-3.5.2\resources\app\git\cmd\git.exe"

# 2. 定位到脚本所在的当前目录
$targetDir = $PSScriptRoot
Set-Location $targetDir

# 3. 执行 Git 操作
Write-Host "> 正在暂存文件..." -ForegroundColor Cyan
& $gitPath add .

Write-Host "> 正在提交记录..." -ForegroundColor Cyan
& $gitPath commit -m "Fix backend routing and branches"

Write-Host "> 正在强制推送至远程 main 分支 (解决 404 关键步)..." -ForegroundColor Cyan
# 这里最关键：将本地 master 推送到远程 main
& $gitPath push origin master:main --force

Write-Host "✅ 分支同步完成！Vercel 正在从 main 分支重新构建。" -ForegroundColor Green
Write-Host "请等待 1 分钟后测试账号登录。" -ForegroundColor Yellow
Start-Sleep -Seconds 3
