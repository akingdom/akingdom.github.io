// Function to create and append the copy icon SVG
function appendCopyIcon(parentSelector, text = undefined) {
    // Create an SVG element
    const svg = `
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="copy-icon"
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
                    console.log('Text copied to clipboard!');
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
