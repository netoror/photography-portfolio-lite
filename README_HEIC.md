# 🔄 HEIC → JPG 批量转换工具

## 📋 功能说明

这是一个用于批量将 **HEIC** 格式图片转换为 **JPG** 格式的 Python 工具，特别适合处理 iPhone 照片。

---

## 🚀 快速开始

### 1️⃣ 安装依赖（必须）

打开命令行（PowerShell / CMD / Terminal），运行：

```bash
pip install Pillow libheif-cxx opencv-python-headless
```

或者安装简版：

```bash
pip install Pillow libheif
```

---

### 2️⃣ 使用方法

#### **方法一：自动转换当前目录（推荐）**

```bash
cd /workspace/摄影网站/index/images
python heic_to_jpg.py
```

会自动转换 `images/` 文件夹中的所有 `.HEIC` 文件。

---

#### **方法二：跨目录转换**

```bash
python convert_heic.py "输入目录" "输出目录"

# 示例
python convert_heic.py "C:\Users\18268\Downloads\iphone_photos" "/workspace/摄影网站/index/images"
```

---

#### **方法三：在 Python IDE 中运行**

在 VS Code / PyCharm 中打开 `convert_heic.py`，直接点击运行按钮。

---

## 📂 转换结果

脚本会将所有 HEIC 文件转换为 JPG 格式，并保存在原目录中：

- **输入文件**: `IMG_1273.HEIC` (约 5.2MB)
- **输出文件**: `IMG_1273.jpg` (约 2.8MB, 质量 95%)
- **压缩率**: 通常节省 40-60% 空间

---

## 🔍 查看转换结果

### Windows PowerShell:

```powershell
# 列出所有 JPG 文件
Get-ChildItem .\*.jpg | Select-Object Name, @{N='Size(MB)';E={($_.Length/1MB)}}

# 按大小排序
Get-ChildItem .\*.jpg | Sort-Object Length -Descending
```

### Windows CMD:

```cmd
dir /b *.jpg | more
```

---

## 💡 清理建议

转换完成后，可以删除原 HEIC 文件以节省空间：

### PowerShell:

```powershell
# 删除所有 HEIC 文件
Remove-Item *.HEIC -Force

# 确认删除（带提示）
Remove-Item *.HEIC -Force -Confirm:$true
```

### CMD:

```cmd
del *.HEIC
```

---

## 🎨 更新摄影网站配置

转换完成后，在 `js/main.js` 中添加这些新图片到作品集：

```javascript
const portfolioData = [
    {
        id: 1,
        title: "IMG_1273",
        category: "人像摄影",
        image: "./images/IMG_1273.jpg",  // ← 已转换的 JPG
        description: "..."
    },
    {
        id: 2,
        title: "IMG_1274",
        category: "风光摄影",
        image: "./images/IMG_1274.jpg",
        description: "..."
    }
    // ... 继续添加其他图片
];
```

---

## 🐛 常见问题

### Q1: "找不到 libheif"

**解决方案：**
```bash
pip install libheif-cxx opencv-python-headless
```

如果仍然失败，尝试：

```bash
pip install --upgrade Pillow libheif-cxx opencv-python-headless
```

---

### Q2: 转换后图片模糊

**原因：** 可能是原始 HEIC 图片质量不高。

**解决方案：**
- 检查原始 HEIC 文件尺寸
- 或在脚本中修改质量参数（`quality=95` → `quality=100`）

---

### Q3: Windows 上找不到 Pillow

**安装命令：**

```bash
pip install Pillow
```

如果 pip 源速度慢，使用：

```bash
pip install Pillow -i https://pypi.tuna.tsinghua.edu.cn/simple
```

---

## 📝 技术说明

### 转换流程：

1. **读取 HEIC** → 使用 libheif-cxx / OpenCV
2. **转换为 RGB** → 确保颜色模式一致
3. **保存为 JPG** → 质量 95%，启用优化

### 支持的格式：

- ✅ `.HEIC` → `.jpg`
- ✅ `.heic` → `.jpg`（不区分大小写）

---

## 🌐 替代方案

如果 Python 转换失败，可以使用：

1. **在线转换**：[cloudconvert.com/heic-to-jpg](https://cloudconvert.com/heic-to-jpg)
2. **ImageMagick**：`magick convert image.HEIC image.jpg`
3. **Windows Photo Viewer**：右键 → "打开方式" → 选择转换

---

## 📮 联系方式

有问题？欢迎反馈！🎨

---

**Happy Converting! 🎉**
