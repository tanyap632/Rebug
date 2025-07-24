const slides = document.querySelector('.slider--slides');
const images = document.querySelectorAll('.slides--content');
const dots = document.querySelectorAll('.slider--buttons .slider--button');
const slideWidth = images[0].offsetWidth;

let currentSlide = 0;
let startX = 0;
let isSwiping = false;

function updateDots() {
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlide);
  });
}


// Эта функция показывает слайд по индексу
function showSlide(index) {
  if (window.innerWidth >= 768 && window.innerWidth <= 1023) {
    // НЕ меняем transform на планшете — управление вручную scroll-ом
    currentSlide = index;
    updateDots();
    // Центрируем активный слайд:
    images[currentSlide].scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    return;
  }

  // Старая логика для десктопа (transform):
  if (index < 0) currentSlide = images.length - 1;
  else if (index >= images.length) currentSlide = 0;
  else currentSlide = index;

  slides.style.transform = `translateX(-${currentSlide * 505}px)`;
  updateDots();
}
if(window.innerWidth >= 768 && window.innerWidth <= 1023){
  slides.addEventListener('scroll', function(){
    // Определить активный слайд по scrollLeft
    const slideWidth = images[0].offsetWidth + 30; // 332 + gap
    const scrollPosition = slides.scrollLeft;
    const index = Math.round(scrollPosition / slideWidth);
    currentSlide = index;
    updateDots();
  });
}
// Следим за изменением размера окна
window.addEventListener('resize', enableSwipeOnTablet);
// Инициализируем при загрузке
document.addEventListener('DOMContentLoaded', enableSwipeOnTablet);
