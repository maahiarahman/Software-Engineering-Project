const apiUrl = 'https://foodish-api.com/api/images/dessert';


async function dessertImage() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch image');
        }

        const data = await response.json();
        const imageUrl = data.image;

        document.querySelector('#imageContainer img').src = imageUrl;



    } catch (error) {
        console.error('Error fetching dessert image:', error);
        document.getElementById('imageContainer').textContent = 'Failed to load dessert image';
    }
}

// Fetch a dessert image on page load
dessertImage();
