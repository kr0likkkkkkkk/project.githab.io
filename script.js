document.addEventListener('DOMContentLoaded', function() {
    // ===== МОБИЛЬНОЕ МЕНЮ =====
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.add('active');
    });
    
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
    
    // ===== СЛАЙДЕР =====
    const sliderTrack = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // Функция обновления слайдера
    function updateSlider() {
        sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Обновляем активную точку
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Следующий слайд
    nextBtn.addEventListener('click', function() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    });
    
    // Предыдущий слайд
    prevBtn.addEventListener('click', function() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
    });
    
    // Переход по точкам
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentSlide = index;
            updateSlider();
        });
    });
    
    // Автопрокрутка
    let autoSlide = setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }, 5000);
    
    // Остановить автопрокрутку при наведении
    const slider = document.querySelector('.slider');
    slider.addEventListener('mouseenter', () => {
        clearInterval(autoSlide);
    });
    
    slider.addEventListener('mouseleave', () => {
        autoSlide = setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlider();
        }, 5000);
    });
    
    // ===== ВИДЕО =====
    const video = document.getElementById('header-video');
    if (video) {
        video.addEventListener('error', function() {
            console.log('Видео не загрузилось');
            this.style.display = 'none';
            document.querySelector('.video-overlay').style.background = 
                'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)';
        });
        
        video.muted = true;
        video.play().catch(e => console.log('Автовоспроизведение заблокировано'));
    }
    
    // ===== ФОРМА =====
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Простая валидация
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            
            if (!name || !email) {
                showMessage('Заполните обязательные поля', 'error');
                return;
            }
            
            // Имитация отправки
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Отправка...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showMessage('Спасибо! Мы свяжемся с вами', 'success');
                this.reset();
                
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            }, 1500);
        });
    }
    
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
});