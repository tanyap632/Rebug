const slides = document.querySelector('.slider--slides');
const images = document.querySelectorAll('.slides--content'); // убедитесь, что так называются ваши слайды
const dots = document.querySelectorAll('.slider--buttons .slider--button'); // исправляем селектор
const slideWidth = images[0].offsetWidth;

let currentSlide = 0; // текущий слайд

// Эта функция обновляет активную точку
function updateDots() {
  dots.forEach((dot, index) => {
    if (index === currentSlide) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

// Эта функция показывает слайд по индексу
function showSlide(index) {
  // Обеспечиваем цикличность
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
  dot.addEventListener('click', () => {
    showSlide(index);
  });
});

// Изначально активируем первую точку
updateDots();

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
      // свайп влево
      showSlide(currentSlide + 1);
    } else {
      // свайп вправо
      showSlide(currentSlide - 1);
    }
  }
  isSwiping = false;
});