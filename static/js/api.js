const apiUrl = 'https://foodish-api.com/api/images/dessert';

async function fetchDessertImage() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch image');
        }

        const data = await response.json();
        const imageUrl = data.image;

        // If a valid image URL is found, set the image; otherwise, use a fallback
        const imageElement = document.querySelector('#dessertImage');
        const imageSrc = imageUrl && imageUrl.trim() !== '' ? imageUrl : '/images/placeholder.jpg';

        if (imageElement) {
            imageElement.setAttribute('src', imageSrc);
        } else {
            console.error('Image element not found');
        }

    } catch (error) {
        console.error('Error fetching dessert image:', error);
        const imageElement = document.querySelector('#dessertImage');
        if (imageElement) {
            imageElement.setAttribute('src', '/images/placeholder.jpg');  // Use fallback image
        }
    }
}

// Fetch a dessert image when the page loads
document.addEventListener('DOMContentLoaded', fetchDessertImage);
