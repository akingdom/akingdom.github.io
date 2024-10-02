const menuDataTextArea = document.getElementById('menuDataTextArea');
const copyMenuDataButton = document.getElementById('copyMenuData');
let warningDiv = document.getElementById('warningDiv');
let lastValidMenuData = { ...menuData }; // Store the last valid menuData
const dataprefix = 'const menuData = ';
const datasuffix = ";";

const octiconX = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.749.749 0 0 1 1.275.326.749.749 0 0 1-.215.734L9.06 8l3.22 3.22a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L8 9.06l-3.22 3.22a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z"></path></svg>';

function setEditCloseIcon() {
	document.getElementById('editModeToggle').innerHTML = octiconX;
}

function populateArticleList(rebuilt) {
	menuData = rebuilt;  // scary stuff
	displayMenuData();
	populateMenuGroups();  // index.js
	populateGroupSelector();
	lastValidMenuData = rebuilt;  // for reversion
}


function rebuildList(gists, repos) {
    let live = [];  // from live repo/gist lists
	
    // Populate Gists
    gists.forEach(gist => {
        let item = {
			title : gist.description,
			url : gist.html_url
        };
        live.push(item);
    });

    // Populate Repositories
    repos.forEach(repo => {
        let item = {
			title : repo.name,
			url : repo.html_url
        };
        live.push(item);
    });
    
	// rebuild menuData and the live lists into a new list
	let rebuilt = rebuildMenuGroups(live,menuData);
	
	populateArticleList(rebuilt);
}


// Fetch Gists and Repositories
async function fetchArticles(populateArticleList) {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/gists`);
    const gists = await response.json();
    const repoResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos`);
    const repos = await repoResponse.json();
    rebuildList(gists, repos);
}







/**
 * Handles item selection in the editor.
 * @param {string} url - The URL of the selected item.
 */
function editorItemSelect(url) {
	let item = findItemForLink(url);
	if(!item) return;  // FUTURE WARNING
	let groupName = groupSelector.value;
	if(!groupName) return;  // FUTURE WARNING
    assignItemToGroup(item.url, item.title, groupName);
}

/**
 * Assigns a menu item to a specific group, and removes it from any other group it may belong to.
 * @param {string} url - The URL of the item to assign.
 * @param {string} title - The title of the item to assign.
 * @param {string} groupTitle - The title of the group to assign the item to.
 */
function assignItemToGroup(url, title, groupTitle) {
    // Remove the item from any other group first
    menuData.menuGroups.forEach(group => {
        group.links = group.links.filter(link => link.url !== url);
    });

    // Find the group to assign the item to
    const group = menuData.menuGroups.find(g => g.groupTitle === groupTitle);
    if (group) {
        group.links.push({ title, url }); // Add the item to the new group
        displayMenuData(); // Update the UI
        updateMenuDataTextArea(); // Update the textarea
        
		populateMenuGroups();  // index.js
		populateGroupSelector();

    }
}

// Add button click calls this...
function handleAddNewGroup() {
    const groupName = document.getElementById('newGroupName').value.trim();
    if (groupName) {
        addNewGroup(groupName);
    } else {
        alert('Please enter a valid group name');
    }
}


/**
 * Populates the group selector dropdown with the groups from menuData.
 */
function populateGroupSelector() {
    const groupSelector = document.getElementById('groupSelector');
    groupSelector.innerHTML = ''; // Clear existing options

    menuData.menuGroups.forEach(group => {
        const option = document.createElement('option');
        option.value = group.groupTitle;
        option.textContent = group.groupTitle;
        groupSelector.appendChild(option);
    });
}


/**
 * Adds a new group to the menuData.
 * @param {string} groupName - The name of the new group to add.
 */
function addNewGroup(groupName) {
    if (!groupName) return; // Return early if no group name is provided

    // Check if group already exists
    if (menuData.menuGroups.some(group => group.groupTitle === groupName)) {
        alert('Group already exists!');
        return;
    }

    // Add the new group to menuData
    menuData.menuGroups.push({
        groupTitle: groupName,
        links: []
    });

    // Update UI and textarea
    displayMenuData();
    populateMenuGroups();
    populateGroupSelector();
}

/**
 * Updates the content of the text area with the current state of menuData.
 */
function updateMenuDataTextArea() {
    const textArea = document.getElementById('menuDataTextArea');
    const json = JSON.stringify(menuData, null, 2); // Update the text area with the latest menuData
    textArea.value = dataprefix + json + datasuffix;
}

/**
 * Debounces the input to ensure the function is not called too frequently.
 * @param {function} func - The function to debounce.
 * @param {number} timeout - The debounce timeout in milliseconds.
 */
function debounce(func, timeout = 500) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

/**
 * Initializes the warning message area.
 */
function initWarningDiv() {
    warningDiv.id = 'warningDiv';
    warningDiv.style.color = 'red'; // Styling for warning message
    warningDiv.style.display = 'none'; // Hide by default
    warningDiv.innerHTML = `
        <p id="warningMessage" style="display: none;">
            Invalid JSON data. Please correct the errors.
        </p>
        <button id="revertButton" style="display: none;">Revert to Last Valid Data</button>
    `;
    if(!warningDiv.parentElement)
	    document.body.appendChild(warningDiv);

    // Attach revert button click event
    document.getElementById('revertButton').addEventListener('click', () => {
        const textArea = document.getElementById('menuDataTextArea');
        let json = JSON.stringify(lastValidMenuData, null, 2);
        textArea.value = dataprefix + json + datasuffix; // Revert to the last valid state
        hideWarning(); // Hide the warning after reverting
    });
}

/**
 * Displays the warning message when JSON is invalid.
 */
function showWarning() {
    const warningMessage = document.getElementById('warningMessage');
    const revertButton = document.getElementById('revertButton');
    warningMessage.style.display = 'block';
    revertButton.style.display = 'inline'; // Show the revert button
    warningDiv.style.display = 'block'; // Show the warning div
}

/**
 * Hides the warning message.
 */
function hideWarning() {
    const warningMessage = document.getElementById('warningMessage');
    const revertButton = document.getElementById('revertButton');
    warningMessage.style.display = 'none';
    revertButton.style.display = 'none'; // Hide the revert button
    warningDiv.style.display = 'none'; // Hide the warning div
}

/**
 * Parses the text area content back into menuData.
 * Handles invalid JSON and provides a warning message.
 */
function parseMenuData() {
    const textArea = document.getElementById('menuDataTextArea');
    const inputText = textArea.value;

    // Check if the input starts with 'const menuData = '
    if (!inputText.startsWith(dataprefix)) {
        showWarning(); // Show warning if the prefix is missing
        return;
    }
    if (!inputText.endsWith(datasuffix)) {
        showWarning(); // Show warning if the prefix is missing
        return;
    }

    // Extract the JSON part by removing the prefix
	const jsonPart = inputText.slice(dataprefix.length, inputText.length - datasuffix.length).trim();
    try {
        const parsedData = JSON.parse(jsonPart);
        menuData = parsedData;
		displayMenuData();
		populateMenuGroups();  // index.js
		populateGroupSelector();
        lastValidMenuData = { ...parsedData }; // Store the new valid state
        hideWarning(); // Hide warning if parsing succeeds
        console.log('Menu data updated successfully');
    } catch (e) {
        showWarning(); // Show warning if JSON is invalid
    }
}

// Event listener for text area (debounced)
const textArea = document.getElementById('menuDataTextArea');
textArea.addEventListener('input', debounce(parseMenuData));

// Revert Button
const revertButton = document.createElement('button');
revertButton.textContent = 'Revert to Last Valid Data';
revertButton.addEventListener('click', () => {
    textArea.value = JSON.stringify(lastValidMenuData, null, 2); // Revert the text area
    menuData = { ...lastValidMenuData }; // Revert the menuData object
});
document.body.appendChild(revertButton);


function handleAssignItem() {
    const groupSelector = document.getElementById('groupSelector');
    const selectedGroup = groupSelector.value;

    // Replace this with the actual selected menu item URL and title (can be passed into this function)
    const menuItemUrl = 'https://github.com/sample-repo-url'; // Example URL
    const menuItemTitle = 'Sample Repo'; // Example title

    if (selectedGroup) {
        assignItemToGroup(menuItemUrl, menuItemTitle, selectedGroup);
    } else {
        alert('Please select a group.');
    }
}




//        <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" class="github-icon" alt="GitHub">




// Handle Edit Mode Toggle -- override
document.handleEditModeToggle = () => {
    window.location.href = 'index.html'; // Switch to editor page
};


// Convert current menuData to a string and display it in the textarea
function displayMenuData() {
    const menuDataString = JSON.stringify(menuData, null, 2); // Pretty-print JSON
    menuDataTextArea.value = `const menuData = ${menuDataString};`;
}

// Copy the contents of the textarea to the clipboard
copyMenuDataButton.addEventListener('click', () => {
    menuDataTextArea.select();
    document.execCommand('copy');
    notifyAlert('Menu data copied to clipboard!', copyMenuDataButton);
});

function initializeEditorView() {
	showAllMenuItems = true;
	document.handleMenuItemClick = (url) => {editorItemSelect(url)};
	displayMenuData();
	// Initialize warning div on page load
	initWarningDiv();
	//toggleSidebarControlsVisibility(false);  // hide controls
	setEditCloseIcon();
}

// Initialize editor view on page load
document.addEventListener('DOMContentLoaded', initializeEditorView);


fetchArticles(populateArticleList);

