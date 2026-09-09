@echo off
REM ========================================
REM 使用特定 Python 版本运行 HEIC 转换脚本
REM ========================================

REM 设置 Python 路径（根据实际情况修改）
set PYTHON_PATH=C:\Users\18268\AppData\Local\Programs\Python\Python311\python.exe

if exist "%PYTHON_PATH%" (
    echo 使用 Python: %PYTHON_PATH%
    "%PYTHON_PATH%" "convert_heic.py"
) else (
    echo Python 路径不存在：%PYTHON_PATH%
    echo.
    echo 请修改此文件中的 PYTHON_PATH 变量，或安装对应版本的 Python
    pause
)

echo.
echo ========================================
echo 转换脚本已运行完成！
echo ========================================