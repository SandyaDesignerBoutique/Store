// =================== LIGHT/DARK MODE TOGGLE SECTION ===================
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
// =================== END LIGHT/DARK MODE TOGGLE SECTION ===================

// =================== LIGHTBOX GALLERY SECTION ===================
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
// =================== END LIGHTBOX GALLERY SECTION ===================

// =================== ABOUT US CAROUSEL SECTION ===================
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
// =================== END ABOUT US CAROUSEL SECTION ===================

// =================== TOP CUSTOMERS CAROUSEL SECTION ===================
// --- Top Customers Stack Carousel ---
(function() {
  const stacksContainer = document.getElementById('topCustomersStacks');
  const stacks = stacksContainer ? stacksContainer.querySelectorAll('.customer-stack') : [];
  const prevBtn = document.getElementById('customersPrev');
  const nextBtn = document.getElementById('customersNext');
  const indicators = document.getElementById('customersIndicators');
  let currentStack = 0;
  let currentCard = 0;
  let autoInterval;

  function isMobile() {
    return window.innerWidth <= 700;
  }

  function updateIndicators() {
    if (!indicators) return;
    indicators.innerHTML = '';
    if (isMobile() && stacks.length) {
      // Mobile: one dot per card
      const cards = stacks[0].querySelectorAll('.customer-card');
      cards.forEach((_, idx) => {
        const dot = document.createElement('span');
        dot.className = 'carousel-dot' + (idx === currentCard ? ' active' : '');
        dot.addEventListener('click', () => showCard(idx));
        indicators.appendChild(dot);
      });
    } else {
      // Desktop: one dot per stack
      stacks.forEach((_, idx) => {
        const dot = document.createElement('span');
        dot.className = 'carousel-dot' + (idx === currentStack ? ' active' : '');
        dot.addEventListener('click', () => showStack(idx));
        indicators.appendChild(dot);
      });
    }
  }

  function showStack(idx) {
    stacks.forEach((stack, i) => {
      stack.classList.toggle('active', i === idx);
    });
    currentStack = idx;
    updateIndicators();
  }

  function showCard(idx) {
    if (!stacks.length) return;
    const cards = stacks[0].querySelectorAll('.customer-card');
    cards.forEach((card, i) => {
      card.classList.toggle('active', i === idx);
    });
    currentCard = idx;
    updateIndicators();
  }

  function next() {
    if (isMobile()) {
      const cards = stacks[0].querySelectorAll('.customer-card');
      currentCard = (currentCard + 1) % cards.length;
      showCard(currentCard);
    } else {
      currentStack = (currentStack + 1) % stacks.length;
      showStack(currentStack);
    }
  }

  function prev() {
    if (isMobile()) {
      const cards = stacks[0].querySelectorAll('.customer-card');
      currentCard = (currentCard - 1 + cards.length) % cards.length;
      showCard(currentCard);
    } else {
      currentStack = (currentStack - 1 + stacks.length) % stacks.length;
      showStack(currentStack);
    }
  }

  function startAuto() {
    clearInterval(autoInterval);
    autoInterval = setInterval(next, 2000);
  }

  function handleResize() {
    if (isMobile()) {
      // Only one stack, show one card at a time
      stacks.forEach((stack, i) => stack.classList.toggle('active', i === 0));
      showCard(currentCard);
    } else {
      // Show stacks of 3
      stacks.forEach((stack, i) => stack.classList.toggle('active', i === currentStack));
    }
    updateIndicators();
    startAuto();
  }

  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); startAuto(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { next(); startAuto(); });
  window.addEventListener('resize', handleResize);

  // Initial setup
  if (stacks.length) {
    handleResize();
    startAuto();
  }
})();
// =================== END TOP CUSTOMERS CAROUSEL SECTION ===================

// =================== ORGANIZATION JSON-LD SECTION ===================
// Inject JSON-LD for Organization
(function() {
  var orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Sandya Designer Boutique",
    "url": "https://sandyadesignerboutique.github.io/Store/",
    "logo": "https://i.postimg.cc/PrK4fMtb/goldennn-1.png"
  };
  // Only inject if not already present
  if (!document.querySelector('script[type="application/ld+json"][data-org-jsonld]')) {
    var script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-org-jsonld', 'true');
    script.text = JSON.stringify(orgJsonLd);
    document.head.appendChild(script);
  }
})();
// =================== END ORGANIZATION JSON-LD SECTION ===================

// =================== REVIEWS CAROUSEL SECTION ===================
// === Review Carousel Logic ===
(function() {
  const reviews = [
    { name: "Vipula", text: "Customer satisfaction 100 percent" },
    { name: "Sreedevi Deshpandey", text: "I have had the pleasure of working with Sandhya garu for my tailoring needs, be it bridal work, dress stitching and many more. The attention to detail, quality of work and the fitting are always spot on. Whether it is a simple alteration job or a custom piece, they consistently deliver the best. What started as a customer relationship has become a beautiful friendship. For this I can't recommend them enough for their expert tailoring and top-notch Customer care." },
    { name: "Srinidhi", text: "Sandhya aunty gives her 100% for every piece that she picks up for design. What started with my Sister's bridal designs, to my bridal designs and everything after, Sandhya aunty is our go-to person, everything ethnic." },
    { name: "Vemula sridevi", text: "I highly recommend Sandhya Designer Boutique fr high-quality, stylish clothing and especially impressed with their on-time delivery and exclusive designer wear saree Collection" },
    { name: "Kadali Kuntla", text: "Lovely designs and great work." },
    { name: "Polleni Madhav", text: "Smart work 👍" },
    { name: "Buzz", text: "elegant stitching. Love it." },
    { name: "Pavanisai Pala", text: "Lovely boutique with a great collection. Amazing work!!!" },
    { name: "Prasana Laxmi", text: "Excellent designs at affordable prices" },
    { name: "Navyasree P", text: "Nice stitching...." },
    { name: "Kruthika", text: "Sandhya Boutique offers elegant, handcrafted designs with a personal touch. Perfect for those seeking unique, traditional styles." }
  ];

  const carouselList = document.getElementById('reviewCarouselList');
  const upBtn = document.querySelector('.review-arrow.up');
  const downBtn = document.querySelector('.review-arrow.down');
  let current = 0;
  let autoScrollTimer = null;
  let isPaused = false;

  function getIndices(center) {
    // Returns [top, middle, bottom] indices, looping
    const n = reviews.length;
    const mid = center % n;
    const top = (mid - 1 + n) % n;
    const bot = (mid + 1) % n;
    return [top, mid, bot];
  }

  function render() {
    const [top, mid, bot] = getIndices(current);
    carouselList.innerHTML = '';
    [top, mid, bot].forEach((idx, i) => {
      const item = document.createElement('div');
      item.className = 'review-item' + (i === 1 ? ' middle' : '');
      item.innerHTML = `<strong class="reviewer-name">${reviews[idx].name}</strong><p>${reviews[idx].text}</p>`;
      carouselList.appendChild(item);
    });
    // Animate: slide up/down
    carouselList.style.transform = 'translateY(0)';
  }

  function next() {
    current = (current + 1) % reviews.length;
    render();
  }
  function prev() {
    current = (current - 1 + reviews.length) % reviews.length;
    render();
  }

  function autoScroll() {
    if (isPaused) return;
    next();
    autoScrollTimer = setTimeout(autoScroll, 3500);
  }

  function pauseAutoScroll() {
    isPaused = true;
    clearTimeout(autoScrollTimer);
    setTimeout(() => { isPaused = false; autoScroll(); }, 9000);
  }

  upBtn.addEventListener('click', () => { prev(); pauseAutoScroll(); });
  downBtn.addEventListener('click', () => { next(); pauseAutoScroll(); });

  // Touch/drag support for mobile
  let startY = null;
  carouselList.addEventListener('touchstart', e => { startY = e.touches[0].clientY; });
  carouselList.addEventListener('touchend', e => {
    if (startY === null) return;
    const endY = e.changedTouches[0].clientY;
    if (endY - startY > 30) { prev(); pauseAutoScroll(); }
    else if (startY - endY > 30) { next(); pauseAutoScroll(); }
    startY = null;
  });

  render();
  setTimeout(autoScroll, 3500);
})();
// =================== END REVIEWS CAROUSEL SECTION ===================