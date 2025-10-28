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
const pageIndicator = document.getElementById('pageIndicator');
let currentIndex = 0;

// 构建可输入的页码指示器，便于快速跳转
pageIndicator.innerHTML = '';
pageIndicator.setAttribute('role', 'group');
pageIndicator.setAttribute('aria-label', '页面跳转与页码信息');

const pagePrefix = document.createElement('span');
pagePrefix.className = 'page-label';
pagePrefix.textContent = '第';

const pageInput = document.createElement('input');
pageInput.type = 'number';
pageInput.className = 'page-input';
pageInput.min = 1;
pageInput.value = currentIndex + 1;
pageInput.setAttribute('aria-label', '输入页码快速跳转');

const pageDivider = document.createElement('span');
pageDivider.className = 'page-divider';
pageDivider.textContent = '/';

const pageTotal = document.createElement('span');
pageTotal.className = 'page-total';

const pageSuffix = document.createElement('span');
pageSuffix.className = 'page-suffix';
pageSuffix.textContent = '页';

pageIndicator.append(pagePrefix, pageInput, pageDivider, pageTotal, pageSuffix);

const clampPage = (value) => {
    if (Number.isNaN(value)) return currentIndex + 1;
    return Math.min(cards.length, Math.max(1, value));
};

const handlePageChange = (value) => {
    const targetPage = clampPage(Number(value));
    currentIndex = targetPage - 1;
    updateCards();
};

pageInput.addEventListener('change', () => {
    handlePageChange(pageInput.value);
});

pageInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        handlePageChange(pageInput.value);
        pageInput.blur();
    }
});

const updateCards = () => {
    cards.forEach((card, index) => {
        card.classList.remove('active', 'prev');
        if (index === currentIndex) {
            card.classList.add('active');
        } else if (index < currentIndex) {
            card.classList.add('prev');
        }
    });

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === cards.length - 1;
    pageInput.max = cards.length;
    pageTotal.textContent = cards.length;
    pageInput.value = currentIndex + 1;
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
    const targetTag = e.target && e.target.tagName;
    if (targetTag === 'INPUT' || targetTag === 'TEXTAREA') {
        return;
    }
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
