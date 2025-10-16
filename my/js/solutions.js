// Аккордеон для секции решений
class SolutionsAccordion {
    constructor() {
        this.animated = false;
        this.init();
    }
    
    init() {
        this.setupAccordion();
        this.setupScrollAnimation();
    }
    
    setupAccordion() {
        const accordionItems = document.querySelectorAll('.accordion-item');
        
        accordionItems.forEach((item, index) => {
            const header = item.querySelector('.accordion-header');
            const icon = item.querySelector('.accordion-icon');
            
            // Первый элемент открыт по умолчанию
            if (index === 0) {
                item.classList.add('active');
                icon.textContent = '−';
            }
            
            header.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Закрываем все элементы
                accordionItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.accordion-icon').textContent = '+';
                    }
                });
                
                // Переключаем текущий элемент
                if (!isActive) {
                    item.classList.add('active');
                    icon.textContent = '−';
                } else {
                    item.classList.remove('active');
                    icon.textContent = '+';
                }
            });
        });
    }
    
    setupScrollAnimation() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animated) {
                    this.animateItems();
                    this.animated = true;
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });
        
        const solutionsSection = document.querySelector('.solutions-section');
        if (solutionsSection) {
            observer.observe(solutionsSection);
        }
    }
    
    animateItems() {
        const items = document.querySelectorAll('.accordion-item');
        items.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('animated');
            }, index * 150);
        });
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    new SolutionsAccordion();
});