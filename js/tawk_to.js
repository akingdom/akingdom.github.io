// Start of Tawk.to Script

// Custom AK script.
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

// Initialize
function tawk_init() {
	replaceTextCode(
		'[Contact Me]',
		'<button id="contact-me" class="btn-primary">Contact me</button>'
	);
	document.getElementById("contact-me").onclick = function() {
		Tawk_API.maximize();
		setTimeout(function() {
		    document.getElementsByClassName('tawk-chatinput-editor')[1].focus()
		}, 500); // Adjust the timeout as necessary
	};
}
window.addEventListener('load', tawk_init); // Initialise once the window loads

var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/602a13f6918aa261273edfe7/1eui5rv0l';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();

// End of Tawk.to Script
