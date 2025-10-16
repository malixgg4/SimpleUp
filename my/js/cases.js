// Секция кейсов с фильтрацией
class CasesSection {
    constructor() {
        this.activeFilter = 'all';
        this.currentPage = 1;
        this.init();
    }
    
    init() {
        this.setupFilters();
        this.setupCaseClicks();
        this.setupPagination();
        this.setupAnimations();
    }
    
    setupFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                
                // Обновляем активный фильтр
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                this.filterCases(filter);
            });
        });
    }
    
    filterCases(filter) {
        const caseCards = document.querySelectorAll('.case-card');
        const statsSection = document.querySelector('.cases-stats');
        
        this.activeFilter = filter;
        
        if (filter === 'all') {
            // Показываем все кейсы
            caseCards.forEach(card => {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            });
            
            if (statsSection) {
                statsSection.style.display = 'block';
                setTimeout(() => {
                    statsSection.style.opacity = '1';
                    statsSection.style.transform = 'translateY(0)';
                }, 100);
            }
        } else {
            // Фильтруем кейсы
            caseCards.forEach(card => {
                const categories = card.dataset.categories.split(' ');
                
                if (categories.includes(filter)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
            
            // Скрываем статистику при фильтрации
            if (statsSection) {
                statsSection.style.opacity = '0';
                statsSection.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    statsSection.style.display = 'none';
                }, 300);
            }
        }
    }
    
    setupCaseClicks() {
        const caseCards = document.querySelectorAll('.case-card');
        const caseBtns = document.querySelectorAll('.case-btn');
        
        // Клик по всей карточке
        caseCards.forEach(card => {
            card.addEventListener('click', (e) => {
                // Игнорируем клики по кнопке (у нее свой обработчик)
                if (!e.target.classList.contains('case-btn') && 
                    !e.target.closest('.case-btn')) {
                    this.openCaseDetail(card);
                }
            });
        });
        
        // Клик по кнопке "Смотреть кейс"
        caseBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const card = btn.closest('.case-card');
                this.openCaseDetail(card);
            });
        });
    }
    
    openCaseDetail(card) {
        const caseId = card.dataset.caseId;
        const caseTitle = card.querySelector('.case-title').textContent;
        
        // Показываем уведомление (в будущем - переход на страницу кейса)
        this.showCaseNotification(caseTitle);
        
        // Можно добавить переход на страницу кейса:
        // window.location.href = `/case-${caseId}.html`;
    }
    
    showCaseNotification(caseTitle) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: rgba(103, 58, 183, 0.95);
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            font-family: 'Inter', sans-serif;
            font-size: 14px;
            font-weight: 600;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        `;
        notification.textContent = `Открываем кейс: ${caseTitle}`;
        
        document.body.appendChild(notification);
        
        // Анимация появления
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Автоматическое скрытие
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    setupPagination() {
        const pageNumbers = document.querySelectorAll('.page-number');
        const prevBtn = document.querySelector('.page-arrow.prev');
        const nextBtn = document.querySelector('.page-arrow.next');
        
        const totalPages = 12;
        
        // Клик по номеру страницы
        pageNumbers.forEach(page => {
            page.addEventListener('click', () => {
                const pageNum = parseInt(page.textContent);
                if (!isNaN(pageNum)) {
                    this.goToPage(pageNum);
                }
            });
        });
        
        // Кнопка "назад"
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (this.currentPage > 1) {
                    this.goToPage(this.currentPage - 1);
                }
            });
        }
        
        // Кнопка "вперед"
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (this.currentPage < totalPages) {
                    this.goToPage(this.currentPage + 1);
                }
            });
        }
        
        // Обновление состояния кнопок
        this.updatePaginationState();
    }
    
    goToPage(pageNum) {
        const pageNumbers = document.querySelectorAll('.page-number');
        const prevBtn = document.querySelector('.page-arrow.prev');
        const nextBtn = document.querySelector('.page-arrow.next');
        
        // Обновляем активную страницу
        pageNumbers.forEach(page => {
            page.classList.remove('active');
            if (parseInt(page.textContent) === pageNum) {
                page.classList.add('active');
            }
        });
        
        this.currentPage = pageNum;
        this.updatePaginationState();
        
        // Здесь можно добавить загрузку данных для страницы
        console.log(`Переход на страницу: ${pageNum}`);
        
        // Прокрутка к верху секции
        document.querySelector('.cases-section').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
    
    updatePaginationState() {
        const prevBtn = document.querySelector('.page-arrow.prev');
        const nextBtn = document.querySelector('.page-arrow.next');
        
        if (prevBtn) {
            prevBtn.disabled = this.currentPage === 1;
        }
        
        if (nextBtn) {
            nextBtn.disabled = this.currentPage === 12;
        }
    }
    
    setupAnimations() {
        // Анимация появления при скролле
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Наблюдаем за карточками и статистикой
        const caseCards = document.querySelectorAll('.case-card');
        const statsSection = document.querySelector('.cases-stats');
        
        caseCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
        
        if (statsSection) {
            statsSection.style.opacity = '0';
            statsSection.style.transform = 'translateY(30px)';
            statsSection.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(statsSection);
        }
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    new CasesSection();
});