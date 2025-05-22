// Light/Dark mode toggle logic
const btn = document.getElementById('toggleModeBtn');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedMode = localStorage.getItem('themeMode');
if (savedMode === 'dark' || (!savedMode && prefersDark)) {
  document.body.classList.add('dark-mode');
  btn.textContent = '☀️';
}
btn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  btn.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('themeMode', isDark ? 'dark' : 'light');
  btn.blur(); // Remove focus after click
});

// Lightbox gallery logic
document.addEventListener("DOMContentLoaded", () => {
  const galleryImages = document.querySelectorAll(".gallery img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");

  if (!lightbox || !lightboxImage) return; // Defensive: only run if lightbox exists

  // Open lightbox
  galleryImages.forEach((img) => {
    img.addEventListener("click", () => {
      const originalUrl = img.getAttribute("data-original"); // Get the original URL
      lightboxImage.src = originalUrl; // Set the lightbox image to the original URL
      lightbox.classList.remove("hidden");
      document.body.classList.add("lightbox-active");
    });
  });

  // Close lightbox when clicking outside the image
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox || e.target === lightboxImage) {
      lightbox.classList.add("hidden");
      document.body.classList.remove("lightbox-active");
    }
  });

  // Close lightbox when clicking the close button
  const closeBtn = document.querySelector('.lightbox-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      lightbox.classList.add('hidden');
      document.body.classList.remove('lightbox-active');
    });
  }
});

// About Us Carousel Functionality
(function() {
  const slides = document.querySelectorAll('.about-us-carousel .carousel-box');
  const prevBtn = document.getElementById('aboutPrev');
  const nextBtn = document.getElementById('aboutNext');
  let current = 0;
  let autoSlideInterval;
  const SLIDE_INTERVAL = 5000; // 5 seconds for a slower transition

  function updateIndicators(idx) {
    const dot0 = document.getElementById('carouselDot0');
    const dot1 = document.getElementById('carouselDot1');
    if (dot0 && dot1) {
      dot0.classList.toggle('active', idx === 0);
      dot1.classList.toggle('active', idx === 1);
    }
  }

  function showSlide(idx) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === idx);
    });
    updateIndicators(idx);
  }

  function nextSlide() {
    const prev = current;
    current = (current + 1) % slides.length;
    animateSlide(prev, current, 'next');
    showSlide(current);
  }

  function prevSlide() {
    const prev = current;
    current = (current - 1 + slides.length) % slides.length;
    animateSlide(prev, current, 'prev');
    showSlide(current);
  }

  prevBtn.addEventListener('click', function() {
    prevSlide();
    resetAutoSlide();
  });
  nextBtn.addEventListener('click', function() {
    nextSlide();
    resetAutoSlide();
  });

  // Optional: swipe support for mobile
  let startX = null;
  const slideContainer = document.getElementById('aboutCarouselSlides');
  if (slideContainer) {
    slideContainer.addEventListener('touchstart', function(e) {
      startX = e.touches[0].clientX;
    });
    slideContainer.addEventListener('touchend', function(e) {
      if (startX === null) return;
      let endX = e.changedTouches[0].clientX;
      if (endX - startX > 50) prevBtn.click();
      else if (startX - endX > 50) nextBtn.click();
      startX = null;
    });
  }

  // Animation for sliding (slow slide)
  function animateSlide(prevIdx, nextIdx, direction) {
    slides.forEach((slide, i) => {
      slide.classList.remove('slide-in-left', 'slide-in-right', 'slide-out-left', 'slide-out-right');
      if (i === prevIdx) {
        slide.classList.add(direction === 'next' ? 'slide-out-left' : 'slide-out-right');
      } else if (i === nextIdx) {
        slide.classList.add(direction === 'next' ? 'slide-in-right' : 'slide-in-left');
      }
    });
  }

  // Auto slide every 4 seconds
  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      nextSlide();
    }, SLIDE_INTERVAL);
  }
  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }
  // Initialize
  showSlide(current);
  startAutoSlide();
  updateIndicators(current);
})();