console.log('AK+Copybutton 1.0.6');

// Function to create and append the copy icon SVG
function appendCopyIcon(parentSelector, text = undefined) {
    // Create an SVG element
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M20 2H10a2 2 0 0 0-2 2v2h8a2 2 0 0 1 2 2v8h2a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"></path><path d="M4 22h10c1.103 0 2-.897 2-2V10c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2zm2-10h6v2H6v-2zm0 4h6v2H6v-2z"></path></svg>
    `;

    // Determine if parentSelector is a string or a DOM element
    const parentElement = typeof parentSelector === 'string' 
        ? document.querySelector(parentSelector) 
        : parentSelector;

    if (parentElement) {
        parentElement.insertAdjacentHTML('beforeend', svg);

        // Add click listener to the SVG
        const icon = parentElement.querySelector('.copy-icon');
        icon.addEventListener('click', function() {
            // Copy parent text content to the clipboard
            const textToCopy = text || parentElement.textContent.trim();

            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                	createAlert("Copied!");
                })
                .catch(err => {
                    console.error('Failed to copy text: ', err);
                });
        });
    } else {
        console.error('Parent element not found.');
    }
}

// Call the function with your desired parent element selector or element
// appendCopyIcon('#your-parent-element'); // Replace with your parent element's selector
// OR
// appendCopyIcon(document.getElementById('your-parent-element')); // Replace with your parent element directly
