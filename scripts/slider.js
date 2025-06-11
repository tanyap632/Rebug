const slides = document.querySelector('.slider--slides');
const images = document.querySelectorAll('.slides--content'); // убедитесь, что так называются ваши слайды
const dots = document.querySelectorAll('.slider--buttons .slider--button'); // исправляем селектор

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
  slides.style.transform = `translateX(-${currentSlide * 500}px)`;

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