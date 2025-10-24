// 生成星星
const starsContainer = document.querySelector('.entrance-stars');
for (let i = 0; i < 50; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animationDelay = Math.random() * 2 + 's';
    starsContainer.appendChild(star);
}

// 进场动画控制
const entrance = document.getElementById('entrance');
const mainContent = document.getElementById('main-content');

// 点击或滚动触发进入主内容
let entryTriggered = false;
const triggerEntry = () => {
    if (entryTriggered) return;
    entryTriggered = true;
    entrance.classList.add('hide');
    setTimeout(() => {
        mainContent.classList.add('show');
    }, 500);
};

entrance.addEventListener('click', triggerEntry);
window.addEventListener('wheel', triggerEntry, { once: true });
window.addEventListener('touchstart', triggerEntry, { once: true });

// 卡片翻页功能
const cards = document.querySelectorAll('.card');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const indicatorContainer = document.getElementById('pageIndicator');
let indicators = [];
let currentIndex = 0;

// 根据卡片数量生成页码指示器，保持导航同步
const buildIndicators = () => {
    indicatorContainer.innerHTML = '';
    cards.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'indicator-dot';
        dot.setAttribute('role', 'button');
        dot.setAttribute('aria-label', `前往第 ${index + 1} 页`);
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCards();
        });
        indicatorContainer.appendChild(dot);
    });
    indicators = indicatorContainer.querySelectorAll('.indicator-dot');
};

buildIndicators();

const updateCards = () => {
    cards.forEach((card, index) => {
        card.classList.remove('active', 'prev');
        if (index === currentIndex) {
            card.classList.add('active');
        } else if (index < currentIndex) {
            card.classList.add('prev');
        }
    });

    indicators.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === cards.length - 1;
};

updateCards();

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCards();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentIndex < cards.length - 1) {
        currentIndex++;
        updateCards();
    }
});

// 键盘导航
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevBtn.click();
    } else if (e.key === 'ArrowRight') {
        nextBtn.click();
    }
});

// 触摸滑动支持
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

const handleSwipe = () => {
    if (touchEndX < touchStartX - 50) {
        nextBtn.click();
    }
    if (touchEndX > touchStartX + 50) {
        prevBtn.click();
    }
};
