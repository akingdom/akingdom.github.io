// Function to create the gallery
function initializeGallery() {
    const galleryElement = document.querySelector('.gallery');
    galleryElement.innerHTML = ''; // Clear content

    // Sort imagesData by the 'modified' field in descending order
    document.imagesData.sort((a, b) => b.modified - a.modified);

	document.imagesData.forEach(imageData => {
		const galleryItem = document.createElement('div');
		galleryItem.classList.add('gallery-item');
	
		const link = document.createElement('a');
		link.href = imageData.path; // Full image path
		link.setAttribute('data-caption', imageData.title); // Optional caption
	
		const img = document.createElement('img');
		img.src = imageData.thumbnail; // Thumbnail path
		img.alt = imageData.title;
	
		link.appendChild(img);
		galleryItem.appendChild(link);
		document.querySelector('.gallery').appendChild(galleryItem);
	});
}

// Load gallery on page load
document.addEventListener('DOMContentLoaded', initializeGallery);
