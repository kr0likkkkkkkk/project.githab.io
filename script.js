document.addEventListener('DOMContentLoaded', function() {
    // ===== МОБИЛЬНОЕ МЕНЮ =====
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    
    // Открытие мобильного меню
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.add('active');
    });
    
    // Закрытие мобильного меню
    mobileMenuClose.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
    });
    
    // Выпадающие меню в мобильной версии
    document.querySelectorAll('.mobile-dropdown > a').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            this.parentElement.querySelector('.mobile-submenu').classList.toggle('active');
        });
    });
    
    // ===== ВИДЕО =====
    const video = document.getElementById('header-video');
    
    // Обработка ошибки видео
    if (video) {
        video.addEventListener('error', function() {
            console.log('Видео не загрузилось, используем фон');
            this.style.display = 'none';
            document.querySelector('.video-overlay').style.background = 
                'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)';
        });
        
        // Пытаемся запустить видео
        video.muted = true;
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log('Автовоспроизведение заблокировано:', error);
            });
        }
    }
    
    // ===== ФОРМА =====
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Валидация
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        
        if (!name || !email) {
            showMessage('Пожалуйста, заполните обязательные поля', 'error');
            return;
        }
        
        // Имитация отправки
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Отправка...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showMessage('Спасибо! Мы свяжемся с вами в течение 24 часов', 'success');
            this.reset();
            
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Скрыть сообщение через 5 секунд
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }, 1500);
    });
    
    function showMessage(text, type) {
        formMessage.textContent = text;
        formMessage.className = '';
        formMessage.classList.add(type);
        formMessage.style.display = 'block';
    }
    
    // ===== ПЛАВНАЯ ПРОКРУТКА =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Закрыть мобильное меню
                mobileMenu.classList.remove('active');
            }
        });
    });
    
    // ===== АНИМАЦИЯ ПРИ ПРОКРУТКЕ =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Наблюдать за элементами с классом fade-in
    document.querySelectorAll('.service-card, .project-card, .about-content, .contact-container').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});