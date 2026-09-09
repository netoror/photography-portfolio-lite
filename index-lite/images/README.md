# 🖼️ 图片文件夹说明

## 📋 需要添加的图片

请将你的摄影作品上传到以下位置（或使用在线图片链接）：

### 当前需要的图片列表：

| 文件名 | 用途 | 建议尺寸 |
|--------|------|----------|
| landscape-1.jpg | 风光摄影示例 1 | 600x400px |
| landscape-2.jpg | 风光摄影示例 2 | 600x400px |
| street-1.jpg | 街头摄影示例 1 | 600x400px |
| portrait-1.jpg | 人像摄影示例 1 | 600x400px |
| wedding-1.jpg | 婚礼纪实示例 1 | 600x400px |
| architecture-1.jpg | 建筑摄影示例 1 | 600x400px |
| travel-1.jpg | 旅行摄影示例 1 | 600x400px |
| black-white-1.jpg | 黑白摄影示例 1 | 600x400px |
| macro-1.jpg | 微距摄影示例 1 | 600x400px |

---

## 🎨 如何添加图片

### 方法一：使用本地图片（推荐）

1. **准备图片**
   - 选择你的精选摄影作品
   - 压缩到合适大小（建议单张不超过 500KB）
   - 重命名对应文件名

2. **上传到文件夹**
   ```bash
   将图片放入：摄影网站/index/images/
   ```

3. **修改代码中的路径**
   - 编辑 `js/main.js`
   - 更新每个作品的 `image` 字段

---

### 方法二：使用在线图片链接

如果暂时不想上传本地图片，可以使用以下在线占位服务：

- **Lorem Picsum**: https://picsum.photos/seed/[随机数]/600/400
- **Unsplash Source**: https://source.unsplash.com/random/600x400/?photography

---

## 💡 图片优化建议

### 1. 尺寸规范
- **缩略图**：800x600px（网格显示）
- **大图预览**：1200x800px（灯箱查看）
- **文件大小**：压缩到 300KB 以内（保持质量）

### 2. 格式选择
- ✅ JPG - 推荐，适合照片
- ✅ WebP - 更优，现代浏览器支持更好
- ❌ PNG - 体积过大（除非透明背景）

### 3. 压缩工具推荐
- **TinyPNG**：https://tinypng.com/
- **Squoosh**：https://squoosh.app/
- **在线免费**：https://ezgif.com/compress-photo

---

## 🚀 快速测试

1. 将图片放入 `images/` 文件夹
2. 修改 `js/main.js` 中的图片路径
3. 在浏览器打开 `index.html`
4. 查看效果！

---

## 🎯 下一步

- [ ] 替换所有占位图片
- [ ] 添加真实的社交媒体链接
- [ ] 修改邮箱和工作室地址
- [ ] 部署到 GitHub Pages / Netlify

---

**提示**：可以先用在线占位服务测试布局，确定满意后再上传本地图片！