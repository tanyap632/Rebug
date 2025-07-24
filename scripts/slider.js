const slides = document.querySelector('.slider--slides');
const images = document.querySelectorAll('.slides--content');
const dots = document.querySelectorAll('.slider--buttons .slider--button');

let currentSlide = 0;

function updateDots() {
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlide);
  });
}

function showSlide(index) {
  if (window.innerWidth >= 768 && window.innerWidth <= 1023) {
    currentSlide = index;
    images[currentSlide].scrollIntoView({ behavior: "smooth", inline: "start" });
    updateDots();
    return;
  }

  if (index < 0) currentSlide = images.length - 1;
  else if (index >= images.length) currentSlide = 0;
  else currentSlide = index;
  slides.style.transform = \translateX(-${currentSlide * 505}px)\;
  updateDots();
}

// dots — обработчик клика
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => showSlide(index));
});

function updateDotOnScroll() {
  if (window.innerWidth >= 768 && window.innerWidth <= 1023) {
    const slideWidth = images[0].offsetWidth + 30; // +gap
    const scrollLeft = slides.scrollLeft;
    const index = Math.round(scrollLeft / slideWidth);
    if (currentSlide !== index) {
      currentSlide = index;
      updateDots();
    }
  }
}

// Изначально
updateDots();
showSlide(currentSlide);

if(window.innerWidth >= 768 && window.innerWidth <= 1023){
  slides.addEventListener('scroll', updateDotOnScroll);
}

// Добавить обработчик при ресайзе (и снимать при выходе за диапазон)
window.addEventListener('resize', () => {
  if(window.innerWidth >= 768 && window.innerWidth <= 1023){
    slides.addEventListener('scroll', updateDotOnScroll);
  } else {
    slides.removeEventListener('scroll', updateDotOnScroll);
  }
});
