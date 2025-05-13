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