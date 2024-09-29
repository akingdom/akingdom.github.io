let isPlaying = false; // Track the play state
let isMultiView = true; // Track the view state
let isControlView = true; // on by default
let currentIndex = 0;
const crossfadeDuration = 1000; // Duration for crossfade in milliseconds
const displayDuration = 3000;  // Duration for showing images in milliseconds
const controlsDuration = 2200;  // Duration for showing controls during play.
let autoPlayInterval;
let controlsInterval;

// Load image data from the JSON file and initialize the correct view
function loadImageData() {
    if (!document.imagesData) {
        console.error('Image data not loaded');
        return;
    }
    // Set the initial view
    if (isMultiView) {
        setupMultiView(currentIndex); // Start with multi-view
    } else {
        setupSingleView(currentIndex); // Start with single-view
    }
    updateButtonVisibility(); // Ensure correct buttons are displayed
}

// Initialize the content based on rows, columns, and starting index
function initializeContent(rows, columns, startIndex) {
    const contentView = document.querySelector('#grid-view');
    contentView.innerHTML = ''; // Clear content

	// set contentView style class
	tryRemoveClass(contentView, isMultiView ? 'single-view' : 'multi-view');
	tryAddClass(contentView, isMultiView ? 'multi-view' : 'single-view');

    const imagesPerPage = rows * columns;

    for (let i = 0; i < imagesPerPage; i++) {
        const imgIndex = (startIndex + i) % document.imagesData.length; // Wrap around if exceeding imagesData length
        const imageData = document.imagesData[imgIndex];

        const imgElement = document.createElement('img');

        // Use thumbnail for multi-view
        if (isMultiView) {
            imgElement.src = `${imageData.thumbnail}`; // Use thumbnail
        } else {
            imgElement.src = `${imageData.path}`; // Full image for single view
        }
        imgElement.alt = imageData.title;

        // Immediately make the image visible
        imgElement.style.opacity = 1;

        // Image click event for single view
        imgElement.addEventListener('click', () => {
            if(isMultiView) {
				currentIndex = imgIndex; // Update currentIndex
				handleEnteringSingleView();
            } else {
            	handleTogglePlay();
            }
        });

        contentView.appendChild(imgElement);
        
		// Resize images after they are added to the DOM
		if (!isMultiView) {
			resizeImagesInSingleView();
		}

    }
}


// BUG -- doesn't resize in time -- remove or fix
// Function to resize images in single view
function resizeImagesInSingleView() {
    const img = document.querySelector('.single-view img');
    const container = document.querySelector('.single-view');

    function resizeImage() {
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        const imgAspectRatio = img.naturalWidth / img.naturalHeight;

        if (containerWidth / containerHeight > imgAspectRatio) {
            // Container is wider than the image aspect ratio, set height
            img.style.height = '100%';
            img.style.width = 'auto';
        } else {
            // Container is taller than the image aspect ratio, set width
            img.style.width = '100%';
            img.style.height = 'auto';
        }
    }

    resizeImage(); // Initial call to set the size
    window.addEventListener('resize', resizeImage); // Update on window resize
}

function tryAddClass(element, className) {
	if (!element.classList.contains(className)) {
		element.classList.add(className);
	}
}

function tryRemoveClass(element, className) {
	if (element.classList.contains(className)) {
		element.classList.remove(className);   
	}
}
// Set up single view with crossfade effect
function setupSingleView(index) {
    document.body.classList.add('single-view');
    document.body.classList.remove('multi-view');

    // Initialize with 1 row and 1 column for single view
    initializeContent(1, 1, index);  // Load the single view image

    // Show/Hide relevant buttons
    document.getElementById('single').classList.remove('hidden');
    document.getElementById('multi').classList.add('hidden');
	// Ensure the grid is visible
    const gridView = document.getElementById('grid-view');
    gridView.classList.add('hidden');

	// Start controls fader
	controlsInterval = controlsFadeInterval();
    updateButtonVisibility();
}

// Set up multi view
function setupMultiView(currentIndex) {
    document.body.classList.add('multi-view');
    document.body.classList.remove('single-view');

    const gridView = document.getElementById('grid-view');
    gridView.innerHTML = ''; // Clear the grid

    const gridContainerWidth = gridView.clientWidth || window.innerWidth; // Use window width if clientWidth is 0
    const gridContainerHeight = gridView.clientHeight || window.innerHeight; // Use window height if clientHeight is 0

    const rows = Math.floor(gridContainerHeight / 180); // Max height of 180px
    const columns = Math.floor(gridContainerWidth / 180); // Max width of 180px

    initializeContent(rows, columns, currentIndex); // Call with calculated rows, columns

    // Show/Hide relevant buttons
    document.getElementById('multi').classList.remove('hidden');
    document.getElementById('single').classList.add('hidden');

    // Ensure the grid is visible
    gridView.classList.remove('hidden');
    updateButtonVisibility();
}

// returns a reference to the slideshow timer.

function slideInterval() {
	return setInterval(() => {
        const imgElements = document.querySelectorAll('.content-grid img');
		imgElements.forEach(img => {
// 			img.style.opacity = 0; // Fade out before loading new image -- BUG ON SLOW IMAGES
			setTimeout(() => {
				currentIndex = (currentIndex + 1) % document.imagesData.length; // Wrap around
				img.src = isMultiView ? document.imagesData[currentIndex].thumbnail : document.imagesData[currentIndex].path;
				img.alt = document.imagesData[currentIndex].title;
// 				img.style.opacity = 1; // Fade in new image
			}, crossfadeDuration); // Wait for fade out before loading new image -- BUG ON SLOW IMAGES
		});
    }, displayDuration); // Change image every 3 seconds
}

// TODO Future - nice gradual fade
function controlsFadeInterval() {
	// Clear any existing interval before starting a new one
    if (controlsInterval) {
        clearInterval(controlsInterval);
    }
	return setInterval(() => {
        if(isControlView) {
        	fadeInControls();
		}
        setTimeout(() => {
        	fadeOutControls();
        }, crossfadeDuration); // Wait for fade out before loading new image
    }, controlsDuration); // Change image every 3 seconds

}

function fadeInControls() {
    document.topControls.style.opacity = 1; // Fade in when interacting
    document.bottomControls.style.opacity = 1; // Fade in when interacting
    if (controlsInterval) {
        clearInterval(controlsInterval);
    }
	isControlView = true;
}
function fadeOutControls() {
	document.topControls.style.opacity = 0; // Fade out controls
	document.bottomControls.style.opacity = 0; // Fade out controls
	isControlView = false;
}

// Ensure controls are shown when interacting
document.addEventListener('mousemove', () => {
	fadeInControls();
    controlsInterval = controlsFadeInterval(); // Restart fade-out timer
});

// click + gesture + keyboard handling

function handleNextImage() {
	if(isPlaying) {  // BUG -- this should page on the multi view too. more code needed.
		currentIndex = (currentIndex + 1) % document.imagesData.length; // Wrap around
		setupSingleView(currentIndex);
    }
}

function handlePreviousImage() {
	if(isPlaying) {  // BUG -- this should page on the multi view too. more code needed.
		currentIndex = (currentIndex - 1 + document.imagesData.length) % document.imagesData.length; // Wrap around
		setupSingleView(currentIndex);
	}
}

function handlePlay() {
    if (!isPlaying) {
        isPlaying = true; // Set the play state to true
        handleEnteringSingleView();
		autoPlayInterval = slideInterval(); // Start autoplay
		updateButtonVisibility(); // Update play/pause buttons
    }
}

function handlePause() {
	if(isPlaying) {
		isPlaying = false; // Set the play state to false
		clearInterval(autoPlayInterval); // Stop autoplay
		updateButtonVisibility(); // Update play/pause buttons
		fadeInControls();
	}
}

function handleTogglePlay() {
    if (isPlaying) {
        handlePause();
    } else {
        handlePlay();
    }
}

function handleEnteringSingleView() {
    isMultiView = false;
    setupSingleView(currentIndex); // Enter single view from multi view
}

function handleExitingSingleView() {
    isMultiView = true;
    setupMultiView(currentIndex); // Enter multi view from single view
	handlePause();  // Stop
    clearTimeout(controlsInterval); // Clear controls fade timeout when exiting single view
}


function handleExitPage() {
	if(isMultiView) {
		// Exit the slideshow entirely
		window.location.href = '../'; // Adjust path as necessary
	} else {
		handleExitingSingleView();
	}
}

// Toggle full-screen mode
function toggleFullScreen() {
    const elem = document.documentElement;
    if (!document.fullscreenElement) {
        elem.requestFullscreen().catch(err => {
            console.error(`Error attempting to enable full-screen mode: ${err.message}`);
        });
    } else {
        if (document.exitFullscreen) {  // not all browsers support this.
            document.exitFullscreen().then(updateButtonVisibility);  // Ensure update after exiting
        }
    }
}
document.addEventListener('fullscreenchange', () => {
    updateButtonVisibility();
});

function updateFullScreenButton() {
    if (document.fullscreenElement) {
        document.getElementById('fullscreen').classList.add('hidden');  // Hide fullscreen button
        document.getElementById('exit-fullscreen').classList.remove('hidden');  // Show exit fullscreen button
    } else {
        document.getElementById('fullscreen').classList.remove('hidden');  // Show fullscreen button
        document.getElementById('exit-fullscreen').classList.add('hidden');  // Hide exit fullscreen button
    }
}

// Update the visibility of the play and pause buttons based on the current state
function updatePlayPauseButtons() {
    if (isPlaying) {
        document.getElementById('play').classList.add('hidden');
        document.getElementById('pause').classList.remove('hidden');
    } else {
        document.getElementById('play').classList.remove('hidden');
        document.getElementById('pause').classList.add('hidden');
    }
}

function updateMultiSingleButtons() {
	if (isMultiView) {
		// in multi, show single
		document.getElementById('single').classList.remove('hidden');
        document.getElementById('multi').classList.add('hidden');
	} else {
		// in single, show multi
        document.getElementById('single').classList.add('hidden');
        document.getElementById('multi').classList.remove('hidden');
	}
}

// Ensure correct buttons are displayed when switching between views
function updateButtonVisibility() {
        updateMultiSingleButtons();
        updatePlayPauseButtons();
        updateFullScreenButton();
}

// Keyboard navigation
function handleKeyboardNavigation(event) {
    switch (event.key) {
        case 'ArrowRight':
            handleNextImage(); // Move to the next image
            break;
        case 'ArrowLeft':
            handlePreviousImage(); // Move to the previous image
            break;
        case 'Enter':
            if (document.body.classList.contains('multi-view')) {
                handleEnteringSingleView(); // Enter single view from multi view
            }
            break;
        case 'Escape':
            if (document.body.classList.contains('single-view')) {
            	handlePause();
                handleExitingSingleView(); // Exit single view
            }
            break;
        case 'f':
            toggleFullScreen(); // Toggle full screen
            break;
        case ' ':
        	handleTogglePlay();  // Toggle autoplay
            break;
        case 'p':
            handlePause(); // Pause autoplay
            break;
        case 's':
            handlePlay(); // Start autoplay
            break;
    }
}


// Initialize
function init() {
	// Event listeners for controls
	document.getElementById('single').addEventListener('click', handleEnteringSingleView);
	document.getElementById('multi').addEventListener('click', handleExitingSingleView);
	document.getElementById('previous').addEventListener('click', handlePreviousImage);
	document.getElementById('next').addEventListener('click', handleNextImage);
	document.getElementById('play').addEventListener('click', handlePlay);
	document.getElementById('pause').addEventListener('click', handlePause);
	document.getElementById('fullscreen').addEventListener('click', toggleFullScreen);
	document.getElementById('exit-fullscreen').addEventListener('click', toggleFullScreen);
	document.getElementById('exit').addEventListener('click', handleExitPage);
	
	// Add keyboard event listener
	document.addEventListener('keydown', handleKeyboardNavigation);

	// Add control references
	document.topControls = document.querySelector('.controls-top');
	document.bottomControls = document.querySelector('.controls-bottom');
	
	// Initial load
	loadImageData();
}

window.addEventListener('load', init); // Initialise once the window loads
