document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu      = document.querySelector('.header--nav_mobile');
    const openMenuBtn     = document.querySelector('.header--mobile_open');
    const closeMenuBtn    = document.getElementById('closeMenuBtn');
    
    function closeMenu() {
        mobileMenu.classList.remove('menu-open');
        document.body.style.overflow = "";
    }

    openMenuBtn.addEventListener('click', function() {
         console.log('Кнопка нажата!');
        mobileMenu.classList.add('menu-open');
        document.body.style.overflow = "hidden";
    });

    closeMenuBtn.addEventListener('click', closeMenu);

    // тут нужная часть:
    // найти ВСЕ ссылки внутри мобильного меню
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
});
