console.log('commons-notify 1.0.0');

function notifyAlert(message) {
	// Create a message element
	const copiedMessage = document.createElement('span');
	copiedMessage.textContent = message;
	copiedMessage.style.position = 'absolute'; // Position it near the icon
	copiedMessage.style.backgroundColor = '#e0ffe0'; // Light green background
	copiedMessage.style.padding = '5px';
	copiedMessage.style.borderRadius = '4px';
	copiedMessage.style.zIndex = '1000';
	copiedMessage.style.transition = 'opacity 0.5s';
	copiedMessage.style.opacity = '1';
	
	// Position it near the copy icon
	const iconRect = icon.getBoundingClientRect();
	copiedMessage.style.left = `${iconRect.right + 5}px`;
	copiedMessage.style.top = `${iconRect.top}px`;

	// Append the copied message to the body or parent
	document.body.appendChild(copiedMessage);

	// Fade out the message after 2 seconds
	setTimeout(() => {
		copiedMessage.style.opacity = '0';
		setTimeout(() => {
			copiedMessage.remove(); // Remove after fade out
		}, 500); // Wait for fade out to finish
	}, 2000);
}