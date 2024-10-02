
const menuGroupsList = document.getElementById('menuGroups');
const mainView = document.getElementById('mainView');
let showAllMenuItems = false;
let hiddenGroups = [
	"missing-items",
    "unassigned-items"
];
let octiconFile = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688l-.011-.013-2.914-2.914-.013-.011Z"></path></svg>';

// Populate Menu Groups
function populateMenuGroups() {
    menuGroupsList.innerHTML = '';
    
    menuData.menuGroups.forEach(group => {
    	if( showAllMenuItems ||
    	(!hiddenGroups.includes(group.groupTitle) && group.links.length > 0)) {
			
			const groupDiv = document.createElement('li');
			groupDiv.classList.add('group');
			groupDiv.innerHTML = `<h4>${group.groupTitle}</h4>`;
			
			const linksUl = document.createElement('ul');
			group.links.forEach(link => {
				const linkLi = document.createElement('li');
				linkLi.classList.add('link');
				linkLi.innerHTML = `<a href="${link.url}" target="_blank">${octiconFile}${link.title}</a>`;
				linkLi.addEventListener('click', (event) =>  {
					event.preventDefault(); // Prevent the default action (e.g., following the link)
					document.handleMenuItemClick(link.url);
				});
				linksUl.appendChild(linkLi);
			});
			
			groupDiv.appendChild(linksUl);
			menuGroupsList.appendChild(groupDiv);
		}
    });
}

// Open content in the main view area
function openInMainView(url) {
    mainView.innerHTML = `<iframe src="${url}" style="width: 100%; height: 600px; border: none;"></iframe>`;
}

// toggle controls visibility
const toggleSidebarControlsVisibility = (state) => {
	toggleElementVisibility('#editModeToggle',state);
	toggleElementVisibility('#toggleSidebar', status);
};
// createHiddenClass();

// Handle Edit Mode Toggle
if(!document.handleEditModeToggle)
	document.handleEditModeToggle = () => {
    window.location.href = 'index-editor.html'; // Switch to editor page
};

// Toggle Sidebar Collapse
document.getElementById('toggleSidebar').addEventListener('click', function () {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('collapsed');
});
document.getElementById('editModeToggle').addEventListener('click', document.handleEditModeToggle);



// Initialize Menu
document.handleMenuItemClick = (url) => {openInMainView(url)};  // overridable
populateMenuGroups();
