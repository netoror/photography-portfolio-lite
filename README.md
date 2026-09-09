# 📸 个人摄影作品集网站

## ✨ 项目简介

这是一个为摄影师量身定制的个人作品集网站，采用响应式设计，支持手机端和桌面端完美显示。

---

## 🚀 快速开始

### 方法一：本地直接打开

1. 确保图片已上传到 `images/` 文件夹
2. 用浏览器打开 `index.html` 文件即可预览

### 方法二：使用 Live Server（推荐）

如果你有 VS Code，可以：

```bash
# 安装插件
1. 打开 VS Code
2. 安装 "Live Server" 扩展

# 启动
右键点击 index.html → "Open with Live Server"
```

---

## 📁 文件结构

```
摄影网站/
├── index/
│   ├── index.html          # 首页
│   ├── about.html          # 关于我页面
│   ├── css/
│   │   ├── style.css       # 主样式表
│   │   └── about.css       # 关于页样式
│   ├── js/
│   │   └── main.js         # JavaScript 交互
│   └── images/             # 图片文件夹（需自行添加）
└── README.md               # 说明文档
```

---

## 🖼️ 添加你的图片

### 图片要求：
- **尺寸建议**：800x600px（缩略图），1200x800px（大图）
- **格式**：JPG 或 PNG
- **命名规范**：对应 `portfolioData` 中的文件名

### 占位图片说明

当前使用 `picsum.photos` 作为图片占位符，展示效果。  
你需要将下面的真实图片替换进去：

```javascript
// 在 js/main.js 中修改这些路径：
const portfolioData = [
    {
        id: 1,
        title: "晨曦中的城市",
        category: "风光摄影",
        image: "images/landscape-1.jpg",  // ← 替换为你的图片路径
        description: "..."
    },
    ...
]
```

---

## 🎨 自定义配置

### 修改个人信息

在 `index.html` 和 `about.html` 中修改：

```html
<!-- 邮箱 -->
<a href="mailto:your.email@example.com">your.email@example.com</a>

<!-- 社交媒体链接 -->
<a href="https://instagram.com/yourname" target="_blank">Instagram</a>
<a href="https://weibo.com/yourname" target="_blank">微博</a>
<a href="your.wechat.id" target="_blank">微信</a>

<!-- 工作室地址 -->
<p>北京市朝阳区 xxx 摄影工作室</p>
```

### 修改作品集数据

编辑 `js/main.js` 中的 `portfolioData` 数组，添加或删除作品：

```javascript
const portfolioData = [
    {
        id: 1,
        title: "你的作品标题",
        category: "风光摄影/人像/街头",
        image: "images/photo-1.jpg",
        description: "作品描述文字"
    }
];
```

---

## 🌐 部署上线

### 免费托管方案：

#### 1. GitHub Pages（推荐）
```bash
# 1. 创建 GitHub 仓库
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin your-repo-url
git push -u origin main

# 2. 启用 GitHub Pages
GitHub 设置 → Pages → Source: Deploy from a branch → main / root
```

#### 2. Netlify（最简单）
```bash
# 1. 注册 Netlify
https://www.netlify.com/

# 2. 拖拽文件夹到 Netlify 界面
# 或输入 git 仓库地址直接部署
```

#### 3. Vercel
```bash
# 安装 Vercel CLI
npm install -g vercel

# 部署
cd 摄影网站/index
vercel
```

---

## 🎯 功能特性

- ✅ **响应式设计** - 完美适配手机、平板和电脑
- ✅ **灯箱效果** - 点击作品查看大图，支持左右切换
- ✅ **平滑滚动** - 导航链接平滑跳转
- ✅ **图片懒加载** - 提升页面加载速度
- ✅ **动画效果** - 优雅的淡入动画
- ✅ **SEO 优化** - Meta 标签基础配置

---

## 📱 移动端优化

网站完全响应式：
- 手机端自动调整布局
- 触摸友好的操作
- 优化的图片尺寸

---

## 🎨 配色方案（可在 CSS 中修改）

```css
/* 主色 */
--primary: #667eea;      /* 蓝色 */
--secondary: #764ba2;    /* 紫色 */

/* 背景渐变 */
background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
```

---

## 📝 开发说明

### 图片懒加载优化

使用 `loading="lazy"` 属性实现图片懒加载：

```html
<img src="" alt="" loading="lazy">
```

### SEO Meta 标签建议

可在 `head` 中添加：

```html
<meta name="description" content="摄影师 XXX 的个人作品集，展示人像、风光、街头摄影作品">
<meta name="keywords" content="摄影，作品集，人像摄影，风光摄影">
```

---

## 🔗 相关链接

- **图片占位符服务**：https://picsum.photos/
- **图标资源**：https://fonts.google.com/icons
- **配色灵感**：https://coolors.co/

---

## 📮 联系方式

有问题或合作意向？欢迎联系我！

📧 Email: your.email@example.com  
📷 Instagram: @yourname  
🐦 微博：@yourname  

---

## ⚖️ 许可证

MIT License - 可以自由修改和使用

---

**Happy Coding! 🎨**