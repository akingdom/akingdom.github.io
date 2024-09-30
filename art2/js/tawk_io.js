// Custom AK scripts regarding tawk.io.

// Function to replace text/code with some new code
// TODO FUTURE -- add a call to feed JSON through this, with {"old": "[My Template]", "new": "my new text/html"}
function replaceTextCode(targetText, replacementHTML) {
  // Escape special characters in the target text for RegExp
  const escapedTargetText = targetText.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

  // Select all elements that have children and can contain text
  const textElements = document.body.querySelectorAll('*:not(script):not(style)');

  textElements.forEach(element => {
    // Check if the element contains the target text
    if (element.innerHTML.includes(targetText)) {
      // Replace the text using a safe regular expression
      element.innerHTML = element.innerHTML.replace(new RegExp(escapedTargetText, 'g'), replacementHTML);
    }
  });
}

// Function to pass a prompt to the Tawk.to widget input
function passPromptToTawk(prompt) {
    if (!document.tawk_loaded) {
        console.warn('Tawk not ready');
        return;
    }

    // Use a delay to ensure the widget is ready before inserting the text
    setTimeout(function() {
        // Get the Tawk widget iframe
        var iframe = document.querySelector('iframe[id^="tawk-"]');

        if (iframe) {
            try {
                // Access the iframe's document
                var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

                // Find the input field (assuming there's only one input for messages)
                var inputField = iframeDocument.querySelector('textarea');

                if (inputField) {
                    // Set the value to the prompt (but don't send it)
                    inputField.value = prompt;

                    // Open the chat widget
                    Tawk_API.maximize();

                    // Optionally focus on the input field
                    inputField.focus();

                    console.log('Prompt passed to Tawk input field.');
                } else {
                    console.error('Could not find the input field in Tawk widget.');
                }
            } catch (e) {
                console.error('Error accessing Tawk iframe: ', e);
            }
        } else {
            console.error('Could not find the Tawk iframe.');
        }
    }, 100); // Adjust the timeout duration if needed
}

function tawk_loaded() {
    document.tawk_loaded = true;
}

// WIDGET ======================================
var Tawk_API = Tawk_API || {},
    Tawk_LoadStart = new Date();
(function() {
    var s1 = document.createElement("script"),
        s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/602a13f6918aa261273edfe7/1eui5rv0l';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(s1, s0);
    Tawk_API.onLoad = tawk_loaded;
})();
// WIDGET END ==================================

// Initialize
function tawk_init() {
	replaceTextCode(
		'[Contact Me]',
		'<button id="contact-me" class="btn-primary">Contact me</button>'
	);
	const contactMe = document.getElementById("contact-me");
	if (contactMe) contactMe.onclick = function() {
		Tawk_API.maximize();
		setTimeout(function() {
		    document.getElementsByClassName('tawk-chatinput-editor')[1].focus()
		}, 500); // Adjust the timeout as necessary
	};
}
window.addEventListener('load', tawk_init); // Initialise once the window loads

