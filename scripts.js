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