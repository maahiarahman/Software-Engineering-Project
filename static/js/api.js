const apiUrl = 'https://foodish-api.com/api/images/dessert';

async function dessertImage() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error('Failed to fetch image');

    const data = await response.json();
    const imageUrl = data.image;

    const dessertImg = document.getElementById('dessertImage');
    if (dessertImg) dessertImg.src = imageUrl;

  } catch (error) {
    console.error('Error fetching dessert image:', error);
    const container = document.getElementById('imageContainer');
    if (container) container.textContent = 'Failed to load dessert image';
  }
}

document.addEventListener('DOMContentLoaded', dessertImage);

// Fetch a dessert image on page load
dessertImage();
