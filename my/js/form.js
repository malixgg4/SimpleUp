// Обработка формы
class FormHandler {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupPhoneMask();
        this.setupFormValidation();
    }
    
    // Маска для телефона
    setupPhoneMask() {
        const phoneInput = document.querySelector('input[type="tel"]');
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
    
    // Валидация формы
    setupFormValidation() {
        const form = document.querySelector('.contact-form');
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
        const inputs = document.querySelectorAll('.form-input[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                this.showError(input, 'Это поле обязательно для заполнения');
                isValid = false;
            } else {
                this.hideError(input);
            }
        });
        
        const checkbox = document.querySelector('.privacy-checkbox input');
        if (checkbox && !checkbox.checked) {
            this.showError(checkbox, 'Необходимо согласие с политикой конфиденциальности');
            isValid = false;
        } else {
            this.hideError(checkbox);
        }
        
        return isValid;
    }
    
    showError(element, message) {
        // Убираем старую ошибку
        this.hideError(element);
        
        // Создаем элемент ошибки
        const errorElement = document.createElement('div');
        errorElement.className = 'form-error';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: #e74c3c;
            font-size: 12px;
            margin-top: 5px;
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
        const submitBtn = document.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        // Эффект загрузки
        submitBtn.textContent = 'Отправка...';
        submitBtn.disabled = true;
        
        // Имитация отправки
        setTimeout(() => {
            alert('Форма успешно отправлена! Мы свяжемся с вами в ближайшее время.');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            document.querySelector('.contact-form').reset();
        }, 2000);
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    new FormHandler();
});