"""
🔄 快速回滚到版本 A 工具

使用方法：
1. Python 脚本在 versions 目录下运行
2. 自动备份当前 main.js
3. 替换为版本 A 的稳定代码
4. 自动打开浏览器测试
"""

import os
import shutil
import webbrowser
from pathlib import Path

# 路径设置
BASE_DIR = Path(__file__).parent.parent
INDEX_JS_DIR = BASE_DIR / "index" / "js"
VERSIONS_A = BASE_DIR / "versions" / "a-version" / "index" / "js"

def main():
    print("=" * 60)
    print("🔄 版本管理系统 - 回滚到版本 A")
    print("=" * 60)
    
    # 检查版本 A 是否存在
    if not VERSIONS_A.exists():
        print(f"❌ 错误：版本 A 不存在于 {VERSIONS_A}")
        return
    
    # 检查当前 main.js 是否存在
    current_file = INDEX_JS_DIR / "main.js"
    if not current_file.exists():
        print(f"⚠️  警告：当前主目录的 main.js 不存在")
        print("💡 请确保已经创建了 index/js/main.js 文件")
        return
    
    # 备份当前代码
    backup_name = "main.js.backup.beforerevert"
    backup_path = INDEX_JS_DIR / backup_name
    
    if current_file.exists():
        shutil.copy2(current_file, backup_path)
        print(f"✅ 已备份当前代码：{backup_path}")
    else:
        print("⚠️  当前没有可备份的代码")
    
    # 替换为版本 A
    target_a = VERSIONS_A / "main.js"
    if target_a.exists():
        shutil.copy2(target_a, current_file)
        print(f"✅ 已替换为版本 A：{current_file}")
    else:
        print(f"❌ 错误：无法找到版本 A 的代码")
        return
    
    print("\n" + "=" * 60)
    print("🎉 回滚完成！")
    print("=" * 60)
    print("\n📋 下一步操作：")
    print("1. 按 Ctrl+Shift+R 强制刷新浏览器")
    print("2. 检查功能是否恢复正常")
    print(f"\n📁 备份文件：{backup_path}")
    print("=" * 60)
    
    # 自动打开浏览器测试
    if input("\n是否自动打开浏览器测试？(y/n): ").lower() == 'y':
        index_html = BASE_DIR / "index" / "index.html"
        if index_html.exists():
            webbrowser.open("file://" + str(index_html.resolve()))
            print(f"✅ 已打开：{index_html}")

if __name__ == "__main__":
    main()