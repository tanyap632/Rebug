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
  if (index < 0) {
    currentSlide = images.length - 1; // Переход на последний слайд
  } else if (index >= images.length) {
    currentSlide = 0; // Переход на первый слайд
  } else {
    currentSlide = index;
  }


  // Передвигаем контейнер слайдов
  slides.style.transform = `translateX(-${currentSlide * 505}px)`;

  // Обновляем точки
  updateDots();
}

// Обработчики клика по точкам
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => showSlide(index));
});

// Изначально активируем первую точку
updateDots();
showSlide(currentSlide);
// Ловим свайпы только на планшете
function enableSwipeOnTablet() {
  // Проверяем ширину экрана
  if(window.innerWidth >= 768 && window.innerWidth <= 1023) {
    slides.addEventListener('touchstart', handleTouchStart);
    slides.addEventListener('touchmove', handleTouchMove);
    slides.addEventListener('touchend', handleTouchEnd);
  } else {
    slides.removeEventListener('touchstart', handleTouchStart);
    slides.removeEventListener('touchmove', handleTouchMove);
    slides.removeEventListener('touchend', handleTouchEnd);
  }
}

// Обработка начала свайпа
function handleTouchStart(e) {
  startX = e.touches[0].clientX;
  isSwiping = true;
}

// Пока двигаем палец
function handleTouchMove(e) {
  if (!isSwiping) return;
  // Можно добавить анимацию слайда при свайпе, если нужно
}

// Заканчиваем свайп
function handleTouchEnd(e) {
  if (!isSwiping) return;
  const endX = e.changedTouches[0].clientX;
  const diffX = endX - startX;
  if(Math.abs(diffX) > 50) { // Порог для свайпа, можно регулировать
    if(diffX < 0) { // свайп влево
      showSlide(currentSlide + 1);
    } else { // свайп вправо
      showSlide(currentSlide - 1);
    }
  }
  isSwiping = false;
}

// Следим за изменением размера окна
window.addEventListener('resize', enableSwipeOnTablet);
// Инициализируем при загрузке
document.addEventListener('DOMContentLoaded', enableSwipeOnTablet);
