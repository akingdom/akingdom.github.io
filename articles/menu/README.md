
To review: 

## Menu
- there is a menu.js which has documents.menuGroups = [{groupTitle:'untitled', links/keys}] which ties the live repository/gist feed to groups. Items in this file are displayed, others are not (unless in edit mode).
- sidebar topmost icons are collapse/restore (top-left) and edit (top-right)
- collapsible sidebar ( only icon is visible when collapsed, not the menu itself )
- clicked menu items open in the main viewing area: the viewed item will be the gist's file, else repository's ReadMe.md, else its single markdown file, else its single .html, else about:blank and opens the repository in new tab/window.
- clicked menu item's github icon always opens the respository/gist.

## Edit
- edit mode
    - allows groups to be added (updates data structure).
    - switches group titles to editable text box (updates data structure).
    - allows groups to be deleted (with confirmation).
    - items with no group are listed last (under a temporary 'unassigned' group)
    - clicking a list item in edit mode displays a box allowing assigning the item to any existing group or unassigning entirely (it won't be shown outside of edit mode)
    - in edit mode, we have a 'copy menu data' button at the top, which copies the updated data for pasting by the user into menu.js



/project-directory
│
├── index.html              -- Main app, loads menu and displays content
├── index-editor.html       -- Edit mode view, outputs updated menudata.js
└── /menu/
    ├── menudata.js         -- Stores the menu groups/links
    ├── article-settings.js -- Stores constants/settings
    ├── index.css           -- Styles for both the menu and editor
    ├── index.js            -- Main menu javascript
    ├── index-editor.js     -- Editor-specific javascript
    ├── menu-commons.js     -- Shared javascript
    └── README.md           -- Project documentation
