document.addEventListener('DOMContentLoaded', function() {
    // Мобильное меню
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const submenuToggle = document.querySelector('.submenu-toggle');
    const submenu = document.querySelector('.submenu');

    menuToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
    });

    if (submenuToggle) {
        submenuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            submenu.classList.toggle('active');
        });
    }

    // Выпадающее меню для десктопа
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(drop => {
        drop.addEventListener('mouseenter', function() {
            this.querySelector('.dropdown-content').style.display = 'block';
        });
        drop.addEventListener('mouseleave', function() {
            this.querySelector('.dropdown-content').style.display = 'none';
        });
    });

    // Форма
    const form = document.getElementById('form');
    const formMessage = document.getElementById('form-message');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        formMessage.textContent = 'Отправка...';
        formMessage.style.color = 'blue';

        // Имитация отправки
        setTimeout(() => {
            formMessage.textContent = 'Форма успешно отправлена!';
            formMessage.style.color = 'green';
            form.reset();
        }, 1500);
    });
});
