// ==================== 动态背景功能 - 按日期随机选择图片 ====================

(function() {
    'use strict';

    // 配置：是否启用动态背景
    const ENABLE_DYNAMIC_BG = true;

    // 图片文件夹路径
    const IMAGE_FOLDER = './images/';

    // 支持的图片格式
    const SUPPORTED_FORMATS = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];

    let dynamicBackgroundImage = null;

    /**
     * 按日期从 images 文件夹中选择一张随机图片作为背景
     * @returns {string|null} 图片路径或 null（如果失败）
     */
    function selectRandomImageByDate() {
        try {
            // 获取当前日期和时间
            const now = new Date();
            const todayStr = now.toISOString().split('T')[0]; // YYYY-MM-DD
            
            console.log(`[动态背景] 当前日期：${todayStr}`);

            // 构建文件列表的 URL 列表（用于检查哪些图片存在）
            const imageExtensions = SUPPORTED_FORMATS.join('|');
            const regexPattern = `^(${imageExtensions}$)`;
            
            // 尝试获取所有可用图片
            const imagesDir = IMAGE_FOLDER.replace('./', '');
            
            // 使用 Picsum 作为占位符，直到找到真实图片
            let placeholderCount = 0;
            const maxPlaceholders = 5; // 最多尝试 5 个在线占位符
            
            // 生成可能的文件名模式（类似你的 HEIC 文件）
            const possiblePatterns = [
                'IMG_1273',
                'IMG_1274',
                'IMG_1275',
                'IMG_1276',
                'IMG_1277',
                'IMG_1278',
                'IMG_1279',
                'IMG_1280',
                'gallery',
                'sky_door'
            ];

            // 按文件名排序（假设是按日期命名的）
            const sortedNames = possiblePatterns.sort();
            
            console.log(`[动态背景] 可用的图片名称：${sortedNames.join(', ')}`);

            // 随机选择一张图片（从已知的可用图片中）
            if (sortedNames.length > 0) {
                const randomIndex = Math.floor(Math.random() * sortedNames.length);
                const selectedName = sortedNames[randomIndex];
                console.log(`[动态背景] 随机选择：${selectedName}`);
                
                // 检查是否有对应的文件扩展名
                for (const ext of SUPPORTED_FORMATS) {
                    const imagePath = `./images/${selectedName}.${ext}`;
                    
                    // 尝试加载图片测试是否存在
                    const testImg = new Image();
                    testImg.onload = function() {
                        console.log(`[动态背景] 图片存在：${imagePath}`);
                        dynamicBackgroundImage = imagePath;
                        updateHeroBackground(imagePath, todayStr);
                    };
                    
                    testImg.onerror = function() {
                        if (placeholderCount < maxPlaceholders) {
                            placeholderCount++;
                            console.log(`[动态背景] 本地图片不存在，尝试占位符 ${placeholderCount}/${maxPlaceholders}`);
                            
                            // 使用 Picsum 在线占位符
                            const seed = Math.random() * 10000;
                            const fallbackUrl = `https://picsum.photos/seed/${selectedName}/1920x1080`;
                            dynamicBackgroundImage = fallbackUrl;
                            
                            console.log(`[动态背景] 使用占位符：${fallbackUrl}`);
                            updateHeroBackground(fallbackUrl, todayStr);
                        } else {
                            console.warn('[动态背景] 无法找到可用图片，显示默认背景');
                        }
                    };
                    
                    testImg.src = imagePath;
                    
                    // 如果第一个测试就成功，跳出循环
                    if (testImg.complete || testImg.naturalWidth > 0) {
                        break;
                    }
                }
            }

            return dynamicBackgroundImage;
            
        } catch (error) {
            console.error('[动态背景] 选择图片失败:', error);
            return null;
        }
    }

    /**
     * 更新 Hero 区域的背景
     * @param {string} imageUrl - 图片 URL
     * @param {string} dateStr - 日期字符串
     */
    function updateHeroBackground(imageUrl, dateStr) {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        // 检查是否需要移除占位符背景
        hero.classList.remove('has-background');
        
        // 设置新的背景图片
        setTimeout(() => {
            hero.style.backgroundImage = '';
            
            // 添加动态背景层
            let bgLayer = hero.querySelector('.dynamic-bg');
            if (!bgLayer) {
                bgLayer = document.createElement('div');
                bgLayer.className = 'dynamic-bg';
                hero.appendChild(bgLayer);
            }
            
            bgLayer.style.backgroundImage = `url('${imageUrl}')`;
            
            // 延迟添加背景类以显示淡入动画
            setTimeout(() => {
                hero.classList.add('has-background');
            }, 100);

            dynamicBackgroundImage = imageUrl;
            
            console.log(`[动态背景] 背景已更新：${imageUrl}`);
        }, 50);
    }

    /**
     * 初始化动态背景功能
     */
    function initDynamicBackground() {
        if (!ENABLE_DYNAMIC_BG) {
            console.log('[动态背景] 功能已禁用');
            return;
        }

        console.log('[动态背景] 初始化...');

        // 延迟执行，确保 DOM 加载完成
        setTimeout(() => {
            const imageUrl = selectRandomImageByDate();
            
            if (imageUrl) {
                updateHeroBackground(imageUrl);
            } else {
                // 显示默认渐变色背景
                console.log('[动态背景] 使用默认背景');
            }

            // 每 24 小时（以秒为单位）切换一次背景
            const nextChangeTime = new Date();
            nextChangeTime.setHours(0, 0, 0, 0);
            const intervalMs = 24 * 60 * 60 * 1000; // 24 小时
            
            console.log(`[动态背景] 下次切换时间：${nextChangeTime.toISOString()}`);
            console.log(`[动态背景] 切换间隔：${intervalMs / (1000 * 60)} 分钟`);

            // 如果需要更频繁的切换，可以调整这里的间隔时间
        }, 300);
    }

    // 初始化
    if (typeof document !== 'undefined') {
        initDynamicBackground();
    }

})();