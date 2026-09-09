// ==================== 作品集数据（全部使用本地图片） ====================
const portfolioData = [
    { id: 1, title: "京都美术馆大厅", category: "城市摄影", image: "./index-lite/images/gallery.jpg", fullImage: "./index-lite/images/gallery.jpg", description:"京都美术馆大厅，平整、洁白、对称。。。", likes: 0 },
    { id: 2, title: "天空之门", category: "城市摄影", image: "./index-lite/images/sky_door.jpg", fullImage: "./index-lite/images/sky_door.jpg", description:"京都美术馆门口的巨大鸟居", likes: 0 },
    { id: 3, title: "前往大阪某大型超市的路上的随手一拍", category: "城市摄影", image: "./index-lite/images/osaka_road.jpg", fullImage: "./index-lite/images/osaka_road.jpg", description:"莫名其妙地决定前往当地一家大型超市。走在路上", likes: 0 },
    { id: 4, title: "前往大阪某大型超市的路上的随手一拍", category: "城市摄影", image: "./index-lite/images/osaka_road1.jpg", fullImage: "./index-lite/images/osaka_road1.jpg", description:"还是在路上。。。", likes: 0 },    
    { id: 5, title: "利贝尔酒店外的大桥", category: "城市摄影", image: "./index-lite/images/osaka_hotel.jpg", fullImage: "./index-lite/images/osaka_hotel.jpg", description:"第二次选择的大版当地酒店，在樱岛区", likes: 0 },   
    { id: 6, title: "大阪某大型平价超市门口街景", category: "城市摄影", image: "./index-lite/images/osaka_outside_supermarket.jpg", fullImage: "./index-lite/images/osaka_outside_supermarket.jpg", description:"终于走到了超市门口，平静的生活", likes: 0 },
    { id: 7, title: "9 点来钟在大阪某 jr 站里", category: "城市摄影", image: "./index-lite/images/a_jr_station_at_osaka_night.jpg", fullImage: "./index-lite/images/a_jr_station_at_osaka_night.jpg", description:"十点来钟的电车站，几乎没有人，心里毛毛地。。。", likes: 0 },
];

let currentIndex = 0;

// ==================== Lightbox 功能 ====================
function openLightbox(photoId) {
    const lightbox = document.getElementById('lightbox');
    const img = lightbox.querySelector('.lightbox-img');
    const caption = lightbox.querySelector('.lightbox-caption');
    
    const photo = portfolioData.find(p => p.id === photoId);
    
    if (photo) {
        console.log(`[Lightbox] 加载本地原图：${photo.fullImage}`);
        img.src = photo.fullImage;
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

// ==================== 点赞功能 ====================
function getLikes(photoId) {
    const stored = localStorage.getItem(`like_${photoId}`);
    return stored ? parseInt(stored, 10) : 0;
}

function loadLikesFromStorage() {
    console.log('[初始化] 开始从 LocalStorage 加载点赞数据...');
    portfolioData.forEach(photo => {
        const storedLikes = getLikes(photo.id);
        if (storedLikes > 0) {
            photo.likes = storedLikes;
            console.log(`[初始化] ID: ${photo.id} - 已加载存储的点赞数：${storedLikes}`);
        }
    });
}

function resetLike(photoId) {
    localStorage.removeItem(`like_${photoId}`);
    console.log(`[重置] 已清零：点赞数 ${photoId}`);
    
    const galleryItem = document.querySelector(`.gallery-item[data-id="${photoId}"]`);
    if (galleryItem) {
        const likeBtn = galleryItem.querySelector('.like-btn');
        const likeCountSpan = likeBtn.querySelector('.like-count');
        if (likeCountSpan) {
            likeCountSpan.textContent = '0';
        }
    }
}

function resetAllLikes() {
    portfolioData.forEach(photo => {
        resetLike(photo.id);
    });
    console.log('[重置] 所有点赞数已清零！');
    
    const resetBtn = document.getElementById('reset-likes-container');
    if (resetBtn) {
        resetBtn.style.display = 'none';
    }
}

function addLike(photoId) {
    const currentLikes = getLikes(photoId);
    const newLikes = currentLikes + 1;
    
    localStorage.setItem(`like_${photoId}`, newLikes.toString());
    
    console.log(`[点赞] ${photoId}: ${currentLikes} → ${newLikes}`);
    
    const photo = portfolioData.find(p => p.id === photoId);
    if (photo) {
        photo.likes = newLikes;
    }
    
    const galleryItem = document.querySelector(`.gallery-item[data-id="${photoId}"]`);
    if (galleryItem) {
        const likeBtn = galleryItem.querySelector('.like-btn');
        const likeCountSpan = likeBtn.querySelector('.like-count');
        if (likeCountSpan) {
            likeCountSpan.textContent = newLikes;
            console.log(`[点赞] 更新了按钮显示：${likeCountSpan.textContent}`);
        }
    }
    
    showLikeAnimation(photoId);
}

function showLikeAnimation(photoId) {
    const galleryItem = document.querySelector(`.gallery-item[data-id="${photoId}"]`);
    if (galleryItem) {
        const likeBtn = galleryItem.querySelector('.like-btn');
        if (likeBtn) {
            likeBtn.classList.add('like-active');
            setTimeout(() => {
                likeBtn.classList.remove('like-active');
            }, 300);
        }
    }
}

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
        div.setAttribute('data-id', photo.id);
        
        // ✅ 生成缩略图 URL
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
        
        // ✅ 添加点赞按钮和计数显示
        const likeContainer = document.createElement('div');
        likeContainer.className = 'like-container';
        
        // ✅ 点赞图标（心形）
        const likeBtn = document.createElement('span');
        likeBtn.className = 'like-btn';
        likeBtn.innerHTML = '❤️ ';
        likeBtn.title = `喜欢 (${photo.likes})`;
        likeBtn.onclick = (e) => {
            e.stopPropagation();
            addLike(photo.id);
        };
        
        // ✅ 点赞计数数字
        const likeCount = document.createElement('span');
        likeCount.className = 'like-count';
        likeCount.textContent = photo.likes;
        likeBtn.appendChild(likeCount);
        
        likeContainer.appendChild(likeBtn);
        div.appendChild(likeContainer);
        
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
    loadLikesFromStorage();
    initGallery();
    initSmoothScroll();
    initObserver();
    console.log('[画廊] 所有功能已初始化');
    
    // ✅ 调试信息 - 在控制台显示所有本地图片路径和点赞数
    console.log('=== 本地图片路径列表 ===');
    portfolioData.forEach(photo => {
        console.log(`ID: ${photo.id} - ${photo.title}`);
        console.log(`  缩略图：${photo.image}`);
        console.log(`  原图：${photo.fullImage}`);
        console.log(`  点赞数：${photo.likes}`);
    });
});