// Бесконечная карусель с квадратными блоками
class IndustriesCarousel {
    constructor() {
        this.currentIndex = 0;
        this.blockWidth = 280; // Ширина блока + gap
        this.visibleBlocks = 0;
        this.autoPlayInterval = null;
        this.isAnimating = false;
        this.init();
    }
    
    init() {
        this.carouselTrack = document.querySelector('.carousel-track');
        this.blocks = document.querySelectorAll('.industry-block');
        this.prevBtn = document.querySelector('.carousel-arrow.prev');
        this.nextBtn = document.querySelector('.carousel-arrow.next');
        this.dots = document.querySelectorAll('.carousel-dot');
        
        this.calculateVisibleBlocks();
        this.setupEventListeners();
        this.startAutoPlay();
        this.updateNavigation();
        
        // Клонируем блоки для бесконечной прокрутки
        this.setupInfiniteScroll();
        
        window.addEventListener('resize', () => {
            this.calculateVisibleBlocks();
            this.updateCarousel();
        });
    }
    
    calculateVisibleBlocks() {
        const containerWidth = this.carouselTrack.parentElement.offsetWidth;
        this.visibleBlocks = Math.floor(containerWidth / this.blockWidth);
    }
    
    setupInfiniteScroll() {
        // Клонируем первые и последние блоки для бесконечного эффекта
        const firstClone = this.blocks[0].cloneNode(true);
        const lastClone = this.blocks[this.blocks.length - 1].cloneNode(true);
        
        this.carouselTrack.appendChild(firstClone);
        this.carouselTrack.insertBefore(lastClone, this.blocks[0]);
        
        // Обновляем ссылки на блоки
        this.blocks = document.querySelectorAll('.industry-block');
        
        // Устанавливаем начальную позицию
        this.currentIndex = 1;
        this.updateCarousel(true);
    }
    
    setupEventListeners() {
        // Стрелки
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                this.prevSlide();
            });
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                this.nextSlide();
            });
        }
        
        // Навигационные точки
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goToSlide(index);
            });
        });
        
        // Клики по блокам
        this.setupBlockClicks();
        
        // Пауза автоплея при наведении
        this.carouselTrack.addEventListener('mouseenter', () => {
            this.stopAutoPlay();
        });
        
        this.carouselTrack.addEventListener('mouseleave', () => {
            this.startAutoPlay();
        });
        
        // Свайпы для мобильных устройств
        this.setupTouchEvents();
    }
    
    setupTouchEvents() {
        let startX = 0;
        let endX = 0;
        
        this.carouselTrack.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        this.carouselTrack.addEventListener('touchmove', (e) => {
            endX = e.touches[0].clientX;
        });
        
        this.carouselTrack.addEventListener('touchend', () => {
            const diff = startX - endX;
            const minSwipeDistance = 50;
            
            if (Math.abs(diff) > minSwipeDistance) {
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
        });
    }
    
    setupBlockClicks() {
        this.blocks.forEach((block, index) => {
            block.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Анимация клика
                block.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    block.style.transform = '';
                }, 150);
                
                // Перенаправление на будущие страницы
                this.handleBlockClick(index);
            });
        });
    }
    
    handleBlockClick(blockIndex) {
        const realIndex = (blockIndex - 1 + this.blocks.length - 2) % (this.blocks.length - 2);
        const industries = ['Медицина', 'Недвижимость', 'Доставка', 'Услуги'];
        const industry = industries[realIndex] || 'Услуги';
        
        // Показываем уведомление (замените на реальный переход)
        this.showRedirectNotification(industry);
        
        // В будущем заменить на:
        // window.location.href = `/industry-${realIndex + 1}.html`;
    }
    
    showRedirectNotification(industry) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: rgba(103, 58, 183, 0.9);
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
        notification.textContent = `Переход в раздел: ${industry}`;
        
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
        }, 2000);
    }
    
    nextSlide() {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        this.currentIndex++;
        
        this.updateCarousel();
        
        // Проверка бесконечной прокрутки
        if (this.currentIndex >= this.blocks.length - 1) {
            setTimeout(() => {
                this.currentIndex = 1;
                this.updateCarousel(true);
            }, 500);
        }
        
        setTimeout(() => {
            this.isAnimating = false;
        }, 500);
    }
    
    prevSlide() {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        this.currentIndex--;
        
        this.updateCarousel();
        
        // Проверка бесконечной прокрутки
        if (this.currentIndex <= 0) {
            setTimeout(() => {
                this.currentIndex = this.blocks.length - 2;
                this.updateCarousel(true);
            }, 500);
        }
        
        setTimeout(() => {
            this.isAnimating = false;
        }, 500);
    }
    
    goToSlide(slideIndex) {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        this.currentIndex = slideIndex + 1; // +1 из-за клонированного элемента
        
        this.updateCarousel();
        
        setTimeout(() => {
            this.isAnimating = false;
        }, 500);
    }
    
    updateCarousel(instant = false) {
        const translateX = -this.currentIndex * this.blockWidth;
        
        if (instant) {
            this.carouselTrack.style.transition = 'none';
        } else {
            this.carouselTrack.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        }
        
        this.carouselTrack.style.transform = `translateX(${translateX}px)`;
        
        this.updateNavigation();
    }
    
    updateNavigation() {
        const realIndex = (this.currentIndex - 1 + (this.blocks.length - 2)) % (this.blocks.length - 2);
        
        // Обновление точек
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === realIndex);
        });
        
        // Обновление состояния стрелок
        if (this.prevBtn) {
            this.prevBtn.disabled = this.isAnimating;
        }
        if (this.nextBtn) {
            this.nextBtn.disabled = this.isAnimating;
        }
    }
    
    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 4000); // Смена каждые 4 секунды
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
    
    resetAutoPlay() {
        this.stopAutoPlay();
        this.startAutoPlay();
    }
}

// Обработчик формы (остается без изменений)
class IndustriesFormHandler {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupPhoneMask();
        this.setupFormValidation();
    }
    
    setupPhoneMask() {
        const phoneInput = document.querySelector('.industries-form-input[type="tel"]');
        if (phoneInput) {
            phoneInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                
                if (value.length > 0) {
                    if (!value.startsWith('7')) {
                        value = '7' + value;
                    }
                    
                    let formattedValue = '+7 (';
                    
                    if (value.length > 1) {
                        formattedValue += value.substring(1, 4);
                    }
                    if (value.length >= 4) {
                        formattedValue += ') ' + value.substring(4, 7);
                    }
                    if (value.length >= 7) {
                        formattedValue += '-' + value.substring(7, 9);
                    }
                    if (value.length >= 9) {
                        formattedValue += '-' + value.substring(9, 11);
                    }
                    
                    e.target.value = formattedValue;
                }
            });
        }
    }
    
    setupFormValidation() {
        const form = document.querySelector('.industries-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                if (this.validateForm()) {
                    this.submitForm();
                }
            });
        }
    }
    
    validateForm() {
        const inputs = document.querySelectorAll('.industries-form-input[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                this.showError(input, 'Это поле обязательно для заполнения');
                isValid = false;
            } else {
                this.hideError(input);
            }
        });
        
        const checkbox = document.querySelector('.industries-privacy-checkbox input');
        if (checkbox && !checkbox.checked) {
            this.showError(checkbox, 'Необходимо согласие с политикой конфиденциальности');
            isValid = false;
        } else {
            this.hideError(checkbox);
        }
        
        return isValid;
    }
    
    showError(element, message) {
        this.hideError(element);
        
        const errorElement = document.createElement('div');
        errorElement.className = 'form-error';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: #e74c3c;
            font-size: 11px;
            margin-top: 4px;
            font-family: 'Inter', sans-serif;
        `;
        
        element.parentNode.appendChild(errorElement);
        element.style.borderColor = '#e74c3c';
    }
    
    hideError(element) {
        const errorElement = element.parentNode.querySelector('.form-error');
        if (errorElement) {
            errorElement.remove();
        }
        element.style.borderColor = '#e0e0e0';
    }
    
    submitForm() {
        const submitBtn = document.querySelector('.industries-submit-btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Отправка...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Спасибо! Мы свяжемся с вами для расчета стоимости продвижения.');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            document.querySelector('.industries-form').reset();
        }, 2000);
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    new IndustriesCarousel();
    new IndustriesFormHandler();
});