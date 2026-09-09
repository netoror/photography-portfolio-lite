"""
🔄 版本 A 一键恢复工具

使用方法:
1. Python 脚本在 versions 目录下运行
2. 自动备份当前 main.js 和 style.css
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
INDEX_CSS_DIR = BASE_DIR / "index" / "css"
VERSIONS_A = BASE_DIR / "versions" / "a-version"

def main():
    print("=" * 60)
    print("🔄 版本管理系统 - 恢复版本 A")
    print("=" * 60)
    
    # 检查版本 A 是否存在
    if not VERSIONS_A.exists():
        print(f"❌ 错误：版本 A 不存在于 {VERSIONS_A}")
        return
    
    js_backup_file = INDEX_JS_DIR / "main.js.backup.beforerestore"
    css_backup_file = INDEX_CSS_DIR / "style.css.backup.beforerestore"
    
    # 备份 JS
    current_js = INDEX_JS_DIR / "main.js"
    if current_js.exists():
        shutil.copy2(current_js, js_backup_file)
        print(f"✅ JS 已备份：{js_backup_file}")
    else:
        print("⚠️  JS 当前文件不存在")
    
    # 备份 CSS
    current_css = INDEX_CSS_DIR / "style.css"
    if current_css.exists():
        shutil.copy2(current_css, css_backup_file)
        print(f"✅ CSS 已备份：{css_backup_file}")
    else:
        print("⚠️  CSS 当前文件不存在")
    
    # 替换为版本 A
    target_js = VERSIONS_A / "index" / "js" / "main.js"
    target_css = VERSIONS_A / "index" / "css" / "style.css"
    
    if target_js.exists():
        shutil.copy2(target_js, INDEX_JS_DIR / "main.js")
        print(f"✅ JS 已替换为版本 A")
    else:
        print(f"❌ 错误：无法找到版本 A 的 JS 文件")
        return
    
    if target_css.exists():
        shutil.copy2(target_css, INDEX_CSS_DIR / "style.css")
        print(f"✅ CSS 已替换为版本 A")
    else:
        print(f"❌ 错误：无法找到版本 A 的 CSS 文件")
        return
    
    print("\n" + "=" * 60)
    print("🎉 恢复完成！")
    print("=" * 60)
    print("\n📋 下一步操作:")
    print("1. 按 Ctrl+Shift+R 强制刷新浏览器")
    print("2. 检查点赞功能是否恢复正常")
    print(f"\n📁 JS 备份文件：{js_backup_file}")
    print(f"📁 CSS 备份文件：{css_backup_file}")
    print("=" * 60)
    
    # 自动打开浏览器测试
    if input("\n是否自动打开浏览器测试？(y/n): ").lower() == 'y':
        index_html = BASE_DIR / "index" / "index.html"
        if index_html.exists():
            webbrowser.open("file://" + str(index_html.resolve()))
            print(f"✅ 已打开：{index_html}")

if __name__ == "__main__":
    main()