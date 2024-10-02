/**
 * Finds the first group that contains a given link in a given group in menuData.
 * @param {string} groupName - The name of the group to search within.
 * @param {string} linkUrl - The URL of the link to search for.
 * @returns {object|null} - The item object that contains the link, or null if not found.
 */
function findItemForLinkInGroup(groupName, linkUrl) {  // needs a better name?
    let group = menuData.menuGroups[groupName];
	if(group) {
		for (let link of group.links) {
			if (link.url === linkUrl) {
				return group; // Return the group if the link is found
			}
		}
	}
    return null; // Return null if group does not contains the link
}

/**
 * Finds the first item that contains a given link in a given group in menuData.
 * @param {string} linkUrl - The URL of the link to search for.
 * @returns {object|null} - The item object that contains the link, or null if not found.
 */
function findItemForLink(linkUrl) {  // needs a better name?
    for (let group of menuData.menuGroups) {
        if(group) {
			for (let link of group.links) {
				if (link.url === linkUrl) {
					return link; // Return the group if the link is found
				}
			}
        }
    }
    return null; // Return null if group does not contains the link
}

/**
 * Finds the first group that contains a given link in menuData.
 * @param {string} linkUrl - The URL of the link to search for.
 * @returns {object|null} - The group object that contains the link, or null if not found.
 */
function findGroupForLink(linkUrl) {
    for (let group of menuData.menuGroups) {
        for (let link of group.links) {
            if (link.url === linkUrl) {
                return group.groupTitle; // Return the group title if the link is found
            }
        }
    }
    return null; // Return null if no group contains the link
}

function removeDuplicateMenuItems(menuData) {
    // Create a new array to store the filtered menu groups
    let filteredMenuData = {
        menuGroups: []
    };

    // Iterate through each menu group
    for (let group of menuData.menuGroups) {
        // Use a Map to track unique URLs and titles within the group
        let uniqueLinksMap = new Map();

        // Iterate through each link in the group
        let uniqueLinks = group.links.filter(link => {
            let key = link.url + link.title; // Create a key combining url and title
            if (!uniqueLinksMap.has(key)) {
                uniqueLinksMap.set(key, true); // Mark the combination as found
                return true; // Include this link in the filtered array
            }
            return false; // Duplicate found, exclude it
        });

        // Add the group with its filtered links if there are any unique items
        if (uniqueLinks.length > 0) {
            filteredMenuData.menuGroups.push({
                groupTitle: group.groupTitle,
                links: uniqueLinks
            });
        }
    }

    return filteredMenuData;
}

/**
 * Rebuilds the menu groups based on live and existing menu data.
 * Adds missing items to 'missing-items' and ungrouped items to 'unassigned-items'.
 */
function rebuildMenuGroups(live, menuData) {
    // Initialize rebuilt with two default groups
    let rebuilt = {
        "menuGroups": [
            { "groupTitle": "missing-items", "links": [] },
            { "groupTitle": "unassigned-items", "links": [] }
        ]
    };

    // Reference to the default groups for easier access
    let missingItemsGroup = rebuilt.menuGroups.find(group => group.groupTitle === 'missing-items');
    let unassignedItemsGroup = rebuilt.menuGroups.find(group => group.groupTitle === 'unassigned-items');

    // 1. Loop through menuData.menuGroups and check if the item's url is in live list
    for (let group of menuData.menuGroups) {
        // Create a corresponding group in rebuilt, if it's not a default group
        if (group.groupTitle !== 'missing-items' && group.groupTitle !== 'unassigned-items') {
            let rebuiltGroup = { "groupTitle": group.groupTitle, "links": [] };

            for (let item of group.links) {
                // Check if this item is in the live list
                let isInLive = live.some(liveItem => liveItem.url === item.url);

                if (!isInLive) {
                    // If it's not found in live, add to 'missing-items'
                    missingItemsGroup.links.push(item);
                } else {
                    // Otherwise, add it to the corresponding rebuilt group
                    rebuiltGroup.links.push(item);
                }
            }

            // Only add the group to rebuilt if it contains items
            if (rebuiltGroup.links.length > 0) {
                rebuilt.menuGroups.push(rebuiltGroup);
            }
        }
    }

    // 2. Loop through the live list to check if the item belongs to any group
    for (let liveItem of live) {
        let groupTitle = findGroupForLink(liveItem.url);

        if (groupTitle) {
            // Find the group in rebuilt and add the liveItem to it
            let rebuiltGroup = rebuilt.menuGroups.find(group => group.groupTitle === groupTitle);
            if (rebuiltGroup) {
                rebuiltGroup.links.push(liveItem);
            }
        } else {
            // If no group is found, add it to 'unassigned-items'
            unassignedItemsGroup.links.push(liveItem);
        }
    }

	rebuilt = removeDuplicateMenuItems(rebuilt);
    return rebuilt;
}

// 
// Example usage:
// let live = [ 
//     { title: "Article 1", url: "https://gist.github.com/somegist1" }, 
//     { title: "Article 2", url: "https://github.com/somerepo1" } 
// ];
// 
// Assuming menuData is fetched from 'menudata.js'
// let rebuiltMenu = rebuildMenuGroups(live, menuData);
// 
// console.log(rebuiltMenu);
// 

function createHiddenClass() {
  const styleSheet = document.head.appendChild(document.createElement("style"));
  styleSheet.textContent = ".hidden { display: none; }";
}

/**
 * Toggles the visibility of an HTML element based on the provided state.
 * Requires 
 *
 * @param {string} selector - The Selector of the HTML element to toggle.
 * @param {boolean|undefined} state - The desired visibility state:
 *   - `false`: Hides the element.
 *   - `true`: Shows the element.
 *   - `undefined`: Toggles the element's visibility based on its current state.
 */
function toggleElementVisibility(selector, state) {
  const element = document.querySelector(selector);

  if (state === false) {
    element.classList.add("hidden");
  } else if (state === true) {
    element.classList.remove("hidden");
  } else {
    // Toggle visibility based on current state
    if (element.classList.contains("hidden")) {
      element.classList.remove("hidden");
    } else {
      element.classList.add("hidden");
    }
  }
}

