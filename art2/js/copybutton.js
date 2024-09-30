// Function to create and append the copy icon SVG
function appendCopyIcon(parentSelector, text = undefined) {
    // Create an SVG element
    const svg = `
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="copy-icon"
            style="cursor: pointer;"
        >
            <path d="M17 3h-2a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm0 18H7V5h2v2h8V5h2v16z" />
        </svg>
    `;

    // Append the SVG to the specified parent element
    const parentElement = document.querySelector(parentSelector);
    if (parentElement) {
        parentElement.insertAdjacentHTML('beforeend', svg);

        // Add click listener to the SVG
        const icon = parentElement.querySelector('.copy-icon');
        icon.addEventListener('click', function() {
            // Copy parent text content to the clipboard
            const textToCopy = text || parentElement.textContent.trim();

            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    // Create a "copied" message element
                    const copiedMessage = document.createElement('span');
                    copiedMessage.textContent = 'Copied!';
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
                })
                .catch(err => {
                    console.error('Failed to copy text: ', err);
                });
        });
    } else {
        console.error('Parent element not found.');
    }
}

// Call the function with your desired parent element selector
// appendCopyIcon('#your-parent-element'); // Replace with your parent element's selector
