# ============================================
# HEIC 批量转换为 JPG - PowerShell 脚本
# ============================================

$imagesDir = "D:\Users\18268\.lmstudio\apps\bionic\projects\d49037d8-47f4-5808-9028-c707de117f8f\workspace\摄影网站\index\images"
$heicFiles = Get-ChildItem -Path $imagesDir -Filter "*.HEIC" -File

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "   HEIC 批量转换为 JPG 工具" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

$total = $heicFiles.Count
$processed = 0

foreach ($file in $heicFiles) {
    $name = $file.Name.Replace('.HEIC', '')
    $jpgPath = Join-Path $imagesDir "$name.jpg"
    
    Write-Host "正在转换 [$processed/$total]：$($file.Name)" -NoNewline
    ProgressPreference = 'SilentlyContinue'
    
    try {
        # 方法 1：使用 Windows Photo Viewer（最通用）
        $shell = New-Object -ComObject WScript.Shell
        $photoViewerPath = "$($imagesDir)\$($file.Name)"
        
        # 启动 Windows 照片查看器打开 HEIC
        $shell.Run("powershell -Command Start-Process 'explorer.exe' -ArgumentList '""" + $photoViewerPath + """', 'open')", '', $True)
        
        Write-Host " ✅（已打开，请在 Photo Viewer 中另存为 JPG）" -ForegroundColor Green
        $processed++
    }
    catch {
        Write-Host " ❌" -ForegroundColor Red
        
        # 方法 2：尝试使用 ImageMagick（如果已安装）
        try {
            & "magick" "$($file.FullName)" "$($jpgPath)" -ErrorAction Stop
            if ($LASTEXITCODE -eq 0) {
                Write-Host " ✅（使用 ImageMagick 转换完成）" -ForegroundColor Green
                $processed++
            }
        }
        catch {
            # 方法 3：尝试使用系统 HEIF 解码器
            try {
                & "heif2jpg" "$($file.FullName)" "$($jpgPath)" -ErrorAction Stop
                if ($LASTEXITCODE -eq 0) {
                    Write-Host " ✅（使用 heif2jpg 转换完成）" -ForegroundColor Green
                    $processed++
                }
            }
            catch {
                # 方法 4：使用在线工具提示
                Write-Host " 💡 建议使用在线工具转换：cloudconvert.com" -ForegroundColor Yellow
                Write-Host "   或使用第三方软件（如 XnView、PhotoConvert HEIC）" -ForegroundColor Yellow
            }
        }
    }
    
    $processed++
}

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "转换完成！已处理 $processed/$total 个文件" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Cyan

# 显示转换后的 JPG 文件列表
Write-Host ""
Write-Host "生成的 JPG 文件：" -ForegroundColor Cyan
$jpgFiles = Get-ChildItem -Path $imagesDir -Filter "*.jpg" | Sort-Object Name
foreach ($jpgFile in $jpgFiles) {
    Write-Host "  ✓ $($jpgFile.Name)" -ForegroundColor Green
}

# 统计文件大小
$totalSize = 0
foreach ($jpgFile in $jpgFiles) {
    $sizeKB = [math]::Round(($jpgFile.Length / 1KB), 2)
    $totalSize += $jpgFile.Length
    Write-Host "   大小：$($sizeKB) KB" -ForegroundColor Gray
}

$totalMB = [math]::Round($totalSize / 1MB, 2)
Write-Host ""
Write-Host "总大小：$($totalMB) MB" -ForegroundColor Gray