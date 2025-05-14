document.addEventListener("DOMContentLoaded", () => {
  const galleryImages = document.querySelectorAll(".gallery img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");

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
});

document.getElementById('reviewForm').addEventListener('submit', function (e) {
  e.preventDefault();

  // Get the reviewer's name and review text
  const name = document.getElementById('reviewerName').value;
  const review = document.getElementById('reviewText').value;

  // Create a new review element
  const reviewItem = document.createElement('li');
  reviewItem.innerHTML = `<strong>${name}</strong><p>${review}</p>`;

  // Add the review to the reviews container
  document.getElementById('reviewsContainer').appendChild(reviewItem);

  // Clear the form
  document.getElementById('reviewForm').reset();
});