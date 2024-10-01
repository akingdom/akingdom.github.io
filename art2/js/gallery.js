console.log('AK+gallery 1.0.25');

function mergeImagesData(imagesData,imagesDescriptions) {

	const maxnum = 9999999999;
	
	// Add an index property to each object in the imagesDescriptions dictionary
	const imagesDescriptionsWithIndex = document.imagesDescriptions.reduce((acc, { id, alt }, idx) => {
	  acc[id] = {
		alt,
		index: maxnum - idx // maintains original array order
	  };
	  return acc;
	}, {});

	return  document.imagesData.map(image => {
	  let odesc = imagesDescriptionsWithIndex[image.title];
	  if(odesc) {
		  image.modified = odesc.index;  // hack to put images in correct order
		  description = odesc.alt;
	  } else { description = image.description; }
	
	  if (description) {
		const punctuationIndex = Math.min(
		  description.indexOf(','),
		  description.indexOf(';'),
		  description.indexOf('.')
		);
		if (punctuationIndex !== -1) {
		  image.title = description.substring(0, punctuationIndex) || image.title;
		  image.description = description.substring(punctuationIndex + 1).trim();
		} else {
		  image.title = description || image.title;
		}
	  }
	
	  return image;
	});
}


// Function to create the gallery
function initializeGallery() {
    const galleryElement = document.querySelector('.gallery');
    galleryElement.innerHTML = ''; // Clear content

    // Merge data records -- we do this from two files as we need to preserve 
    document.imagesData = mergeImagesData(document.imagesData, document.imagesDescriptions);
	document.imagesDescriptions = {};
    
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
		
// 		appendCopyIcon(link,`${imageData.title} `);  // TODO FUTURE add description if defined
		
		galleryItem.appendChild(link);
		document.querySelector('.gallery').appendChild(galleryItem);
	});
}


// Load gallery on page load
document.addEventListener('DOMContentLoaded', initializeGallery);
