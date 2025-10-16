// Анимация для секции проблем
class ProblemsAnimator {
    constructor() {
        this.animated = false;
        this.init();
    }
    
    init() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animated) {
                    this.animateProblems();
                    this.animated = true;
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });
        
        const problemsSection = document.querySelector('.problems-section');
        if (problemsSection) {
            this.observer.observe(problemsSection);
        }
        
        // Обработчик клика на белый блок
        this.setupFooterBlockClick();
    }
    
    animateProblems() {
        // Анимация карточек проблем
        const problemCards = document.querySelectorAll('.problem-card');
        problemCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animated');
            }, index * 150);
        });
        
        // Анимация белого блока с задержкой
        const footerBlock = document.querySelector('.problems-footer-block');
        if (footerBlock) {
            setTimeout(() => {
                footerBlock.classList.add('animated');
            }, problemCards.length * 150 + 300);
        }
    }
    
    setupFooterBlockClick() {
        const footerBlock = document.querySelector('.problems-footer-block');
        if (footerBlock) {
            footerBlock.addEventListener('click', function(e) {
                // Можно добавить дополнительную анимацию перед переходом
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
                
                // Здесь можно добавить аналитику или другие действия перед переходом
                console.log('Переход на страницу формы');
                
                // Если нужно открыть в новой вкладке, раскомментируйте:
                // e.preventDefault();
                // window.open(this.href, '_blank');
            });
        }
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    new ProblemsAnimator();
});