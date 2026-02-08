// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Portfolio tabs
const portfolioData = {
    industrial: {
        title: 'Промышленные предприятия',
        desc: 'Импортозамещение запчастей, шестерни, втулки. Высокая точность и прочность материалов.',
        image: 'gear_industrial_1770276504684.png'
    },
    startups: {
        title: 'Стартапы и приборостроение',
        desc: 'Прототипирование корпусов, функциональные детали. От идеи до тестового образца за 48 часов.',
        image: 'startup_prototype_new_1770276540618.png'
    },
    auto: {
        title: 'Автосервисы и тюнинг',
        desc: 'Тюнинг-детали, элементы салона, крепления. Термостойкие материалы для подкапотного пространства.',
        image: 'auto_tuning_parts_1770276561849.png'
    },
    design: {
        title: 'Дизайн и Декор',
        desc: 'Интерьерные элементы, архитектурные макеты, декоративные панели. Любые формы и текстуры.',
        image: 'gear_industrial_1770276504684.png' // Reusing for now
    }
};

const tabs = document.querySelectorAll('.tab');
const portTitle = document.getElementById('port-title');
const portDesc = document.getElementById('port-desc');
const portImg = document.getElementById('port-img');
let currentPortfolioIdx = 0;

if (tabs.length > 0 && portTitle && portDesc && portImg) {
    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            const dataId = this.getAttribute('data-id');
            const data = portfolioData[dataId];

            portTitle.style.opacity = '0';
            portDesc.style.opacity = '0';
            portImg.style.opacity = '0';

            setTimeout(() => {
                if (data) {
                    portTitle.textContent = data.title;
                    portDesc.textContent = data.desc;
                    portImg.src = data.image;
                    // Update currentIdx to match the clicked tab
                    const tabKeys = Object.keys(portfolioData);
                    currentPortfolioIdx = tabKeys.indexOf(dataId);
                }

                portTitle.style.opacity = '1';
                portDesc.style.opacity = '1';
                portImg.style.opacity = '1';
            }, 200);
        });
    });
}

// Scroll animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
});

// Interactivity for buttons
document.querySelectorAll('.btn-calculate').forEach(btn => {
    btn.addEventListener('click', () => {
        alert('Функционал онлайн-расчета в разработке. Пожалуйста, напишите нам в Telegram или WhatsApp для быстрого ответа.');
    });
});

// Portfolio navigation arrows (simple loop)
const arrowLeft = document.querySelector('.arrow:first-child');
const arrowRight = document.querySelector('.arrow:last-child');

if (arrowLeft && arrowRight) {
    const tabKeys = Object.keys(portfolioData);

    arrowRight.addEventListener('click', () => {
        currentPortfolioIdx = (currentPortfolioIdx + 1) % tabKeys.length;
        tabs[currentPortfolioIdx].click();
    });

    arrowLeft.addEventListener('click', () => {
        currentPortfolioIdx = (currentPortfolioIdx - 1 + tabKeys.length) % tabKeys.length;
        tabs[currentPortfolioIdx].click();
    });
}

// Transitions for portfolio
if (portTitle) portTitle.style.transition = 'opacity 0.3s ease';
if (portDesc) portDesc.style.transition = 'opacity 0.3s ease';
if (portImg) portImg.style.transition = 'opacity 0.3s ease';

