// ==================== 作品集数据（全部使用本地图片） ====================
const portfolioData = [
    { id: 1, title: "京都美术馆大厅", category: "城市摄影", image: "./images/gallery.jpg", fullImage: "./images/gallery.jpg" },
    { id: 2, title: "天空之门", category: "城市摄影", image: "./images/sky_door.jpg", fullImage: "./images/sky_door.jpg" },
    { id: 3, title: "前往大阪某大型超市的路上的随手一拍", category: "城市摄影", image: "./images/osaka_road.jpg", fullImage: "./images/osaka_road.jpg" },
    { id: 4, title: "前往大阪某大型超市的路上的随手一拍", category: "城市摄影", image: "./images/osaka_road1.jpg", fullImage: "./images/osaka_road1.jpg" },    
    { id: 5, title: "利贝尔酒店外的大桥", category: "城市摄影", image: "./images/osaka_hotel.jpg", fullImage: "./images/osaka_hotel.jpg" },   
    { id: 6, title: "大阪某大型平价超市门口街景", category: "城市摄影", image: "./images/osaka_outside_supermarket.jpg", fullImage: "./images/osaka_outside_supermarket.jpg" },
    { id: 7, title: "大阪某大型平价超市门口街景 1", category: "城市摄影", image: "./images/osaka_outside_supermarket1.jpg", fullImage: "./images/osaka_outside_supermarket1.jpg" },	
    { id: 8, title: "9 点来钟在大阪某 jr 站里，准备前往难波区的 bic camera 买 kindle", category: "城市摄影", image: "./images/a_jr_station_at_osaka_night.jpg", fullImage: "./images/a_jr_station_at_osaka_night.jpg" },
];

let currentIndex = 0;

// ==================== Lightbox 功能 - 简化版，直接使用本地原图 ====================
function openLightbox(photoId) {
    const lightbox = document.getElementById('lightbox');
    const img = lightbox.querySelector('.lightbox-img');
    const caption = lightbox.querySelector('.lightbox-caption');
    
    // ✅ 直接获取对应的图片数据
    const photo = portfolioData.find(p => p.id === photoId);
    
    if (photo) {
        console.log(`[Lightbox] 加载本地原图：${photo.fullImage}`);
        img.src = photo.fullImage;  // ✅ 直接使用完整路径
        caption.textContent = photo.title;
    } else {
        console.error(`[错误] 找不到 ID 为 ${photoId} 的图片`);
        return;
    }
    
    lightbox.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    const img = lightbox.querySelector('.lightbox-img');
    
    img.src = '';
    setTimeout(() => {
        lightbox.classList.remove('show');
        document.body.style.overflow = '';
    }, 300);
}

document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
document.getElementById('lightbox').addEventListener('click', function(e) {
    if (e.target === this) closeLightbox();
});

// ==================== 键盘导航 ====================
document.addEventListener('keydown', function(e) {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox || !lightbox.classList.contains('show')) return;
    
    switch(e.key) {
        case 'ArrowLeft': 
            currentIndex = (currentIndex - 1 + portfolioData.length) % portfolioData.length;
            openLightbox(portfolioData[currentIndex].id);
            break;
        case 'ArrowRight': 
            currentIndex = (currentIndex + 1) % portfolioData.length;
            openLightbox(portfolioData[currentIndex].id);
            break;
        case 'Escape': closeLightbox(); break;
    }
});

// ==================== 初始化画廊 ====================
function initGallery() {
    const grid = document.getElementById('galleryGrid');
    console.log('[Gallery] 开始渲染画廊...');
    
    portfolioData.forEach((photo, i) => {
        console.log(`[Gallery] 处理第 ${i+1} 张图片：${photo.title}`);
        
        const div = document.createElement('div');
        div.className = 'gallery-item';
        div.style.animationDelay = (i * 0.1) + 's';
        
        // ✅ 生成缩略图 URL - 直接使用本地图片
        const thumbnailUrl = photo.image;
        console.log(`[Gallery] 本地图片缩略图：${thumbnailUrl}`);
        
        const img = document.createElement('img');
        img.src = thumbnailUrl;
        img.alt = photo.title;
        img.loading = 'lazy';
        img.onerror = function() {
            console.error(`[错误] 图片加载失败：${thumbnailUrl}`);
        };
        div.appendChild(img);
        
        // ✅ 添加信息面板
        const infoDiv = document.createElement('div');
        infoDiv.className = 'photo-info';
        
        infoDiv.innerHTML = `
            <h3 class="info-title">${photo.title}</h3>
            <p class="info-category">${photo.category}</p>
            <p class="info-description">${photo.description}</p>
        `;
        
        div.appendChild(infoDiv);
        console.log(`[Gallery] 第 ${i+1} 张图的 HTML 结构创建完成`);
        
        // ✅ 点击放大 - 传递图片 ID，自动查找对应的本地原图
        div.addEventListener('click', (e) => {
            e.stopPropagation();
            console.log(`[Gallery Item Click] ID: ${photo.id}, Title: ${photo.title}`);
            openLightbox(photo.id);
        });
        
        grid.appendChild(div);
    });
    
    console.log('[Gallery] 画廊渲染完成');
}

// ==================== 平滑滚动 ====================
function initSmoothScroll() {
    const links = document.querySelectorAll('.nav-menu a');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                this.classList.add('active');
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// ==================== 动画效果 ====================
function initObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.gallery-item, .stat-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ==================== 初始化所有功能 ====================
document.addEventListener('DOMContentLoaded', () => {
    initGallery();
    initSmoothScroll();
    initObserver();
    console.log('[画廊] 所有功能已初始化');
    
    // ✅ 调试信息 - 在控制台显示所有本地图片路径
    console.log('=== 本地图片路径列表 ===');
    portfolioData.forEach(photo => {
        console.log(`ID: ${photo.id} - ${photo.title}`);
        console.log(`  缩略图：${photo.image}`);
        console.log(`  原图：${photo.fullImage}`);
    });
});