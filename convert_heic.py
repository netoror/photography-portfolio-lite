#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
HEIC 转 JPG 批量转换工具
使用方法：
1. 安装依赖：pip install Pillow libheif-cxx opencv-python-headless
2. 运行脚本：python heic_to_jpg.py
3. 指定输入目录和输出目录
"""

import os
import sys
from PIL import Image


def convert_heic_to_jpg(input_dir, output_dir=None):
    """
    批量转换 HEIC 文件为 JPG
    
    Args:
        input_dir: 包含 HEIC 文件的输入目录路径
        output_dir: 输出目录（如果为空字符串，则与输入目录相同）
    """
    
    # 确保输出目录存在
    if not output_dir or output_dir == '':
        output_dir = input_dir
    
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        print(f"✅ 已创建输出目录：{output_dir}")
    
    print("=" * 70)
    print("🔄 HEIC → JPG 批量转换工具".center(70))
    print("=" * 70)
    print(f"\n输入目录：{input_dir}")
    print(f"输出目录：{output_dir}")
    print("-" * 70)
    
    # 查找所有 HEIC 文件（不区分大小写）
    heic_files = []
    for filename in os.listdir(input_dir):
        if filename.upper().endswith('.HEIC'):
            heic_files.append(filename)
    
    if not heic_files:
        print("\n⚠️ 未找到 HEIC 文件！")
        return
    
    print(f"\n📦 共发现 {len(heic_files)} 个 HEIC 文件:\n")
    for i, f in enumerate(heic_files, 1):
        print(f"  {i:2}. {f}")
    
    print("-" * 70)
    
    converted = 0
    failed = 0
    
    # 打开 libheif 库（用于读取 HEIC）
    try:
        import cv2
        heif_lib = cv2.HEIF_FEATURES()
        print(f"\n✅ 检测到 libheif 支持：{heif_lib['LIBHEIF_VERSION']}\n")
    except Exception as e:
        print(f"\n⚠️ 未安装 libheif，将尝试使用 PIL 直接读取\n")
    
    # 批量转换
    for i, heic_file in enumerate(heic_files, 1):
        input_path = os.path.join(input_dir, heic_file)
        base_name = os.path.splitext(heic_file)[0]
        output_path = os.path.join(output_dir, base_name + '.jpg')
        
        try:
            # 方法 1：尝试使用 OpenCV + libheif（推荐）
            if 'cv2' in globals():
                heif_img = cv2.heif_read4(input_path)[0]
                if heif_img is not None:
                    pil_img = Image.fromarray(cv2.cvtColor(heif_img, cv2.COLOR_BGRA2RGB))
                    # 转换为 RGB 模式（避免 RGBA/Palette 等问题）
                    if pil_img.mode not in ('RGB', 'L'):
                        pil_img = pil_img.convert('RGB')
                    
                    # 保存为 JPG，质量 95
                    pil_img.save(output_path, 'JPEG', quality=95, optimize=True)
                    
                    # 获取文件大小
                    original_size = os.path.getsize(input_path) / (1024 * 1024)
                    converted_size = os.path.getsize(output_path) / (1024 * 1024)
                    
                    print(f"✅ [{i}/{len(heic_files)}] {heic_file}")
                    print(f"   → {base_name}.jpg ({converted_size:.2f} MB)")
                    converted += 1
                    continue
            
            # 方法 2：使用 PIL + libheif-cxx
            try:
                from libheif import Heif
                heif = Heif()
                img_data = heif.read_from_file(input_path)
                pil_img = Image.frombuffer('RGB', img_data.size, img_data.tobytes(), 'raw', 'BGR', 0, 0)
                
                if pil_img.mode not in ('RGB', 'L'):
                    pil_img = pil_img.convert('RGB')
                
                pil_img.save(output_path, 'JPEG', quality=95, optimize=True)
                
                original_size = os.path.getsize(input_path) / (1024 * 1024)
                converted_size = os.path.getsize(output_path) / (1024 * 1024)
                
                print(f"✅ [{i}/{len(heic_files)}] {heic_file}")
                print(f"   → {base_name}.jpg ({converted_size:.2f} MB)")
                converted += 1
                continue
                
            except ImportError:
                pass
            except Exception as e:
                print(f"   ⚠️ libheif-cxx 不可用，继续尝试 PIL...")
            
            # 方法 3：使用 PIL（仅适用于已安装 libheif 的情况）
            try:
                with Image.open(input_path) as img:
                    if img.mode not in ('RGB', 'L'):
                        img = img.convert('RGB')
                    
                    img.save(output_path, 'JPEG', quality=95, optimize=True)
                    
                    print(f"✅ [{i}/{len(heic_files)}] {heic_file}")
                    print(f"   → {base_name}.jpg")
                    converted += 1
                    continue
                    
            except Exception as e:
                print(f"❌ [{i}/{len(heic_files)}] {heic_file} - {str(e)[:50]}...")
                failed += 1
                continue
            
        except Exception as e:
            print(f"❌ [{i}/{len(heic_files)}] {heic_file}: {str(e)[:60]}...")
            failed += 1
    
    # 汇总报告
    print("\n" + "=" * 70)
    print("📊 转换完成!".center(70))
    print("=" * 70)
    print(f"✅ 成功转换：{converted} / {len(heic_files)}")
    if failed:
        print(f"⚠️  转换失败：{failed} 个文件（可能是缺少 libheif 依赖）")
    
    # 建议
    print("\n💡 建议操作:")
    print("   1. 检查输出目录中的 JPG 文件")
    print("   2. 删除原 HEIC 文件以节省空间（可选）")
    print(f"   3. 运行命令确认：dir /s {output_dir}\\*.jpg 2>nul\n")
    
    return converted, failed


def main():
    """主函数"""
    # 使用方法说明
    print("=" * 70)
    print("📖 使用方法".center(70))
    print("=" * 70)
    print("""
安装依赖：
   pip install Pillow libheif-cxx opencv-python-headless

运行示例（在 images/目录下）:
   python heic_to_jpg.py

运行示例（跨目录转换）:
   python heic_to_jpg.py ./src ./dst

使用方法 1（自动转换当前目录所有 HEIC）:
   python heic_to_jpg.py ./images
   """)
    print("=" * 70)
    
    # 自动检测当前工作目录中的 HEIC 文件
    current_dir = os.path.dirname(os.getcwd()) + '\\摄影网站\\index\\images'
    
    if not os.path.exists(current_dir):
        print(f"\n⚠️ 未找到路径：{current_dir}\n")
        print("请在命令行中运行:")
        print('   python heic_to_jpg.py "C:\\path\\to\\your\\images"')
        return
    
    convert_heic_to_jpg(current_dir)


if __name__ == '__main__':
    main()
