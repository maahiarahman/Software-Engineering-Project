(() => {
    // Ensure no double declaration if bundled or re-run
    if (window.__dessertImageLoaded__) return;
    window.__dessertImageLoaded__ = true;
  
    const apiUrl = 'https://foodish-api.com/api/images/dessert';
  
    async function fetchDessertImage() {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Failed to fetch image');
  
        const data = await response.json();
        const imageUrl = data.image;
        const imageElement = document.querySelector('#dessertImage');
        const imageSrc = imageUrl?.trim() ? imageUrl : '/images/placeholder.jpg';
  
        if (imageElement) {
          imageElement.setAttribute('src', imageSrc);
        } else {
          console.error('Image element not found');
        }
      } catch (error) {
        console.error('Error fetching dessert image:', error);
        const fallback = document.querySelector('#dessertImage');
        if (fallback) fallback.setAttribute('src', '/images/placeholder.jpg');
      }
    }
  
    document.addEventListener('DOMContentLoaded', fetchDessertImage);
  })();
  