// Анимация чисел при скролле
class NumberAnimator {
    constructor() {
        this.animated = false;
        this.init();
    }
    
    init() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animated) {
                    this.animateNumbers();
                    this.animateChartBars();
                    this.animated = true;
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        });
        
        const statsSection = document.querySelector('.stats');
        if (statsSection) {
            this.observer.observe(statsSection);
        }
    }
    
    animateNumbers() {
        const numberElements = document.querySelectorAll('.stat-number');
        
        numberElements.forEach((element, index) => {
            const target = 95;
            const duration = 2000;
            const startTime = performance.now();
            const startValue = 0;
            
            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                const easeProgress = this.easeOutBack(progress);
                const currentValue = Math.min(
                    Math.floor(startValue + (target - startValue) * easeProgress),
                    target
                );
                
                element.textContent = currentValue + '%';
                
                if (progress < 1 && currentValue < target) {
                    requestAnimationFrame(animate);
                } else {
                    element.textContent = target + '%';
                }
            };
            
            setTimeout(() => {
                requestAnimationFrame(animate);
            }, index * 300);
        });
    }
    
    // Функция для пружинного эффекта
    easeOutBack(x) {
        const c1 = 1.70158;
        const c3 = c1 + 1;
        return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
    }
    
    // Анимация столбиков графика
    animateChartBars() {
        const bars = document.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            setTimeout(() => {
                bar.style.animationPlayState = 'running';
            }, index * 80);
        });
    }
}

// Общие функции
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация аниматора чисел
    new NumberAnimator();
    
    // Плавная прокрутка для меню
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Анимация для кнопки
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }
});