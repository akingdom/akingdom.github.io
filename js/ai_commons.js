//ai_commons.js



// EXAMPLE setupFileUpload

        /* Styling for file upload button as a symbol */
/* CSS EXAMPLE
        .file-upload {
			display: inline-block;
			background-color: white;
			color: #007BFF;
			padding: 0.6em 1.2em;
			border-radius: 0.6em;
			cursor: pointer;
			font-size: 1.2em;
			line-height: .6em;
			width: auto;
			font-weight: 600;
			margin: 0.0em 0.6em;
			margin-bottom: .3em;
			border-style: solid;
			border-width: thin;
        }
        .file-upload:hover {
            background-color: #0056b3;
        }

* USAGE EXAMPLE
		// Initialize file upload with parameters (button ID, output ID, accepted file type, file input ID)
        setupFileUpload('document_uploadButton', 'docuphrases', 'text/plain');
	-or-
        <label for="biginput>">Prompts: <label for="document_fileInput" class="file-upload" id="document_uploadButton">&hellip;</label>
		<script src="js/ai_commons.js"></script>
		<script>setupFileUpload('document_uploadButton', 'biginput', 'text/plain', 'document_fileInput');</script>
		
 Note: acceptType is comma-delimited within the string.
*/
function setupFileUpload(buttonId, outputId, acceptedType, fileInputId = undefined) {
	const button = document.getElementById(buttonId);
	const buttonTag = button.tagName.toLowerCase();
	const outputElement = document.getElementById(outputId);

	const fileInput = document.createElement('input');
	fileInput.type = 'file';
	fileInput.id = fileInputId || generateUUID(); // Generate a UUID for the ID
	fileInput.accept = acceptedType || '.txt';
	fileInput.style.display = 'none';
	button.parentElement.appendChild(fileInput);

	// Check if the button is a label with a matching 'for' attribute
	if (fileInputId !== undefined && buttonTag === 'label' && button.getAttribute('for') === fileInputId) {
		console.log(`Button is a label with 'for' matching file input. No click listener added.`);
	} else {
		// If it's not a matching label, add click listener to trigger file input click
		button.addEventListener('click', function() {
			fileInput.click();
		});
	}

	// Handle the file selection and display content in the output element
	fileInput.addEventListener('change', function(event) {
		const file = event.target.files[0];
// 		if (file && file.type === acceptedType) {
			const reader = new FileReader();
			reader.onload = function(e) {
				outputElement.value = e.target.result;
				// Clear the file input so the same file can be uploaded again
				fileInput.value = '';
			};
			reader.readAsText(file);
// 		} else {
// 			alert(`Please upload a valid file of type: ${acceptedType}`);
// 		}
	});
}


// General function to copy content to clipboard
function copyToClipboard(elementId) {
	const element = document.getElementById(elementId);
	const textToCopy = element.value;

	navigator.clipboard.writeText(textToCopy).then(() => {
		showTemporaryMessage(element, 'Copied to clipboard!');
	}).catch(err => {
		showTemporaryMessage(element, 'Failed to copy text.');
		console.error('Failed to copy: ', err);
	});
}
//
// Example:
// 	<button type="button" onclick="copyToClipboard('textOutput', 'messageArea')">Copy</button>


// Function to show a temporary message overlay on the target element
function showTemporaryMessage(targetElement, message) {
	// Create a new div element for the message
	const messageElement = document.createElement('div');
	messageElement.textContent = message;

	// Inject styles to position the message absolutely over the target element
	Object.assign(messageElement.style, {
		position: 'absolute',
		backgroundColor: 'rgba(0, 0, 0, 0.7)',  // Semi-transparent background
		color: 'white',
		padding: '5px 10px',
		borderRadius: '5px',
		fontSize: '0.9em',
		zIndex: '9999',  // Ensure it's on top
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',  // Center the message
		pointerEvents: 'none'  // Ensure it doesn't interfere with clicking
	});

	// Get the parent element's relative position for absolute positioning
	targetElement.style.position = 'relative';

	// Append the message element to the target element's parent (or container)
	targetElement.parentNode.appendChild(messageElement);

	// Remove the message after 3 seconds
	setTimeout(() => {
		messageElement.remove();
	}, 3000);  // 3 seconds
}



// Random number between positive a and b (but never b, assuming b is the larger)
function randomRange(a = 0, b) {
	let min, max;
	if (a != 0 && b == undefined) { min = 0; max = a; }
	else { min = a < b ? a : b;	const max = a >= b ? a : b; }
	const array = new Uint32Array(1);
	self.crypto.getRandomValues(array);
	const scope = max-min;
	return (array[0] % scope) + min;
}


function generateUUID() { // Public Domain/MIT
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const array = new Uint32Array(1);
        self.crypto.getRandomValues(array);
        var r = array[0] % 16;//random number between 0 and 16
		var d = new Date().getTime();//Timestamp
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
			var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || Math.floor(crypto.random() * 1000000);//Time in microseconds since page-load or random no. if unsupported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}