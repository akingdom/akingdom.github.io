// domProxy.js
/* Example Usage: 

	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>DOM Proxy Example</title>
		<script src="domProxy.js" defer></script>
	</head>
	<body>
		<h1>DOM Proxy Example</h1>
		<form>
			<label for="input1">Input 1:</label>
			<input type="text" id="input1" name="myFormElement" value="Sample Input">
	
			<label for="input2">Input 2:</label>
			<input type="text" id="input2" name="myFormElement" value="Another Input">
	
			<div class="buttonGroup">Button 1</div>
			<div class="buttonGroup">Button 2</div>
		</form>
	
		<script>
			// Example usage of the proxies after the DOM is fully loaded
			window.onload = () => {
				// Access elements directly
				let input1 = $id.input1;  // Access element by ID
				let nameElements = $name.myFormElement;  // Access elements by name
				let classElements = $class.buttonGroup;  // Access elements by class
	
				// Log elements to the console
				console.log(input1);           // Logs the input element with ID 'input1'
				console.log(nameElements);      // Logs the array of elements with name 'myFormElement'
				console.log(classElements);     // Logs the array of elements with class 'buttonGroup'
	
				// Demonstrating dynamic access using $id('...')
				let dynamicId = 'input1';  // Example of a variable holding the ID
				let dynamicInputElement = $id(dynamicId);  // Access element by ID using a variable
				console.log(dynamicInputElement);  // Logs the element with ID 'input1'
	
				// Show an example of updating the input value using the dynamic access
				dynamicInputElement.value = 'Updated via $id!';
				console.log(dynamicInputElement.value); // Logs the updated value
			};
		</script>
	</body>
	</html>
*/


// Generic caching proxy handler creator
function createElementProxy(getElementsFunc) {
    const cache = {};
    const CACHE_INTERVAL = 1000; // milliseconds for caching

    return new Proxy({}, {
        get: (target, key) => {
            const now = Date.now();
            const cacheEntry = cache[key];

            // Check cache expiration or if it's not cached
            if (cacheEntry && (now - cacheEntry.timestamp) < CACHE_INTERVAL) {
                return Array.isArray(cacheEntry.elements) ? cacheEntry.elements : cacheEntry.elements[0];
            }

            // If not cached, retrieve the elements
            const elements = getElementsFunc(key);
            cache[key] = { elements, timestamp: now };

            return Array.isArray(cache[key].elements) ? cache[key].elements : cache[key].elements[0];
        }
    });
}
// Assign proxies to the global namespace for easy access
window.$id = createElementProxy((id) => [document.getElementById(id)]);  // array always
window.$name = createElementProxy((name) => Array.from(document.getElementsByName(name))); // array always
window.$class = createElementProxy((className) => Array.from(document.getElementsByClassName(className))); // array always

/* Example Usage: 
   This demonstrates how to access elements using the proxies created above.
*/

// Access by ID: first access caches the element
// let input1 = $id.input1;  // Caches the element with ID 'input1'

// Subsequent access uses the cached element, skipping DOM recheck if within the interval
// let input1Again = $id.input1; 

// Access elements by name: caches elements associated with the name
// let nameElement = $name.myFormElement;  

// Access elements by class: caches elements with the specified class name
// let classElements = $class.buttonGroup;  

// Example variable names for dynamic access
// let variableId = 'input1';
// let variableName = 'myFormElement';
// let variableClass = 'buttonGroup';

// Using the proxies with variable-supplied names
// let inputElement = $id[variableId];  // Access element by ID
// let formElements = $name[variableName][0];  // Access elements by name
// let buttonElements = $class[variableClass][0];  // Access elements by class

// Log the results to see the elements
// console.log(inputElement);  // Logs the element with ID 'input1'
// console.log(formElements);   // Logs an array of elements with name 'myFormElement'
// console.log(buttonElements); // Logs an array of elements with class 'buttonGroup'
