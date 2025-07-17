const slides = document.querySelector('.slider--slides');
const images = document.querySelectorAll('.slides--content');
const dots = document.querySelectorAll('.slider--buttons .slider--button');
const slideWidth = images[0].offsetWidth;

let currentSlide = 0;
let startX = 0;
let isSwiping = false;
const swipeThreshold = 50;

function updateDots() {
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlide);
  });
}


// Эта функция показывает слайд по индексу
function showSlide(index) {
  if (index < 0) {
    currentSlide = images.length - 1;
  } else if (index >= images.length) {
    currentSlide = 0;
  } else {
    currentSlide = index;
  }


  // Передвигаем контейнер слайдов
  slides.style.transform = `translateX(-${currentSlide * slideWidth}px)`;

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
// --- ФУНКЦИЯ СВАЙПА ---
slides.addEventListener('touchstart', function (event) {
  if (event.touches.length === 1) {
    startX = event.touches[0].clientX;
    isSwiping = true;
  }
});

slides.addEventListener('touchend', function (event) {
  if (!isSwiping) return;
  const endX = (event.changedTouches && event.changedTouches[0].clientX) || 0;
  const deltaX = endX - startX;
  if (Math.abs(deltaX) > swipeThreshold) {
    if (deltaX < 0) {
      showSlide(currentSlide + 1);
    } else {
      showSlide(currentSlide - 1);
    }
  }
  isSwiping = false;
});