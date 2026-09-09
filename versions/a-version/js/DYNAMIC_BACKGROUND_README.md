# 🌅 动态背景功能使用说明

## ✨ 功能简介

首页 Hero 区域会自动从 `images/` 文件夹中按日期随机选择一张照片作为背景！

---

## 📋 工作原理

### **1. 自动选择机制**
- 系统会从 `images/` 文件夹中的图片中随机选择一张作为背景
- 优先使用本地 JPG/PNG 格式的图片
- 如果找不到本地图片，会自动使用在线占位符（Picsum）

### **2. 切换时间**
- **默认**：每 24 小时切换一次（以服务器时间为基准）
- **下次切换时间**：显示在控制台日志中

### **3. 支持的图片格式**
- ✅ JPG / JPEG
- ✅ PNG  
- ✅ GIF
- ✅ BMP
- ✅ WEBP

---

## 📂 图片放置位置

```
摄影网站/
└── index/
    └── images/           ← 将你的照片放在这里
        ├── IMG_1273.jpg
        ├── IMG_1274.jpg
        ├── gallery.jpg
        └── sky_door.jpg
```

**注意：**
- 图片必须放在 `images/` 文件夹中
- 建议使用 JPG 格式（文件较小）
- 推荐尺寸：1920x1080px 或更大（全屏显示）

---

## 🔧 配置选项

### **在 `background.js` 中修改：**

```javascript
// ==================== 动态背景功能 - 按日期随机选择图片 ====================

(function() {
    'use strict';

    // 配置：是否启用动态背景（true=启用，false=禁用）
    const ENABLE_DYNAMIC_BG = true;  // ← 改为 false 禁用此功能

    // 图片文件夹路径（相对于 index.html）
    const IMAGE_FOLDER = './images/';   // ← 修改为其他路径（如 '../photos/'）
```

---

## 🎨 视觉效果

### **背景淡入动画**
- 每张照片切换时有平滑的淡入效果
- 动画持续时间：2 秒

### **文字始终可见**
- 所有文字和按钮始终保持在最上层
- 不会被背景图片遮挡

---

## 🌐 在线占位符

如果 `images/` 文件夹中还没有真实图片，系统会自动使用 Picsum 在线占位符：

```javascript
// 示例：使用 seed/city-morning 作为背景
https://picsum.photos/seed/city-morning/1920/1080
```

这确保即使没有本地图片也能正常显示！

---

## 📊 控制台日志

打开浏览器开发者工具（F12），可以看到：

```
[动态背景] 当前日期：2024-12-28
[动态背景] 可用的图片名称：IMG_1273, IMG_1274, ...
[动态背景] 随机选择：IMG_1273
[动态背景] 图片存在：./images/IMG_1273.jpg
[动态背景] 背景已更新：./images/IMG_1273.jpg
```

---

## ⚙️ 高级配置

### **修改切换频率**

在 `background.js` 中找到：

```javascript
// 如果需要更频繁的切换，可以调整这里的间隔时间
const intervalMs = 24 * 60 * 60 * 1000; // 24 小时
```

- `8 * 60 * 60 * 1000` = 8 小时切换一次
- `2 * 60 * 60 * 1000` = 2 小时切换一次

---

## 🎯 下一步操作

1. ✅ **检查图片文件夹**：确保 `images/` 中有照片
2. ✅ **等待页面加载**：打开 http://localhost:8080
3. ✅ **查看控制台**：按 F12 查看日志信息
4. ✅ **测试切换**：关闭浏览器再打开，背景不会立即变化

---

## 📝 常见问题

### **Q: 背景一直显示占位符怎么办？**
**A:** 
- 检查 `images/` 文件夹中是否有 JPG/PNG 文件
- 确认文件名没有被转义（如 `.HEIC` 需要转换为 `.JPG`）
- 查看浏览器控制台是否有错误提示

### **Q: 如何禁用动态背景？**
**A:** 在 `background.js` 第一行修改：
```javascript
const ENABLE_DYNAMIC_BG = false;
```

### **Q: 能否指定某张图片作为背景？**
**A:** 当前是随机选择。如果要指定，可以在控制台运行：
```javascript
document.querySelector('.hero').style.backgroundImage = "url('./images/gallery.jpg')";
```

---

## 🚀 快速测试

在浏览器控制台手动设置背景：

```javascript
// 方法 1：使用本地图片
document.querySelector('.hero').style.backgroundImage = "url('./images/gallery.jpg')";

// 方法 2：使用在线图片  
document.querySelector('.hero').style.backgroundImage = "url('https://picsum.photos/seed/test/1920/1080')";
```

---

**Happy Coding! 📸✨**