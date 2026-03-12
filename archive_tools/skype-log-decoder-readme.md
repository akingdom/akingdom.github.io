Here’s a clean, developer‑friendly **README.md** for your Skype/Teams Log Viewer — written to match the architecture we built together, without exposing anything internal or proprietary. It explains the tool, its features, and how to use it, while staying concise and readable.

---

# **Skype / Teams Log Viewer**
A standalone, browser‑based viewer for exploring and exporting Skype/Teams chat history from a `messages.json` export.  
No backend. No dependencies. Just open the HTML file and load your data.

---

## **✨ Features**

### **📂 Load & Explore Conversations**
- Load a `messages.json` export directly in the browser.
- Conversations automatically grouped into:
  - **People**
  - **Groups**
  - **Bots & Services**
  - **System & Special**
- Long conversation IDs wrapped cleanly.
- System threads (e.g., `19:…@cast.skype`) auto‑collapsed.

---

## **🗂 Export Mode**
Toggle **Export Mode** to enable selective export of conversations, participants, and messages.

### **Conversations**
- Sidebar checkboxes appear for each conversation.
- **Select All** / **Select None** buttons.
- Unselected conversations show an “Excluded” notice when opened.

### **Participants**
- Sticky participant bar at the top of the chat.
- **Select All** / **Select None** buttons.
- Per‑participant checkboxes.
- Hides messages from unchecked participants immediately.
- Selection state remembered per conversation.

### **Messages**
- Sticky message bar under the participant bar.
- **Select All** / **Select None** buttons.
- Each message gets a checkbox (for export only; visibility unaffected).
- Selection state remembered per conversation.

### **Export**
Two export buttons:
- **Export Selected (this chat)**  
- **Export Selected (all chats)**  

Exports a filtered `messages.json` containing only:
- selected conversations  
- selected participants  
- selected messages  

Selections are stored as a compact “diff from default” for efficiency.

---

## **📅 Vertical Adaptive Timeline**
A non‑scrolling, clickable timeline beside the chat:
- Automatically adjusts resolution:
  - **Day → Week → Month → Year**
- Each box represents a time bucket with color‑coded density.
- Clicking a box scrolls the chat to that date.
- Always visible, never modal.

---

## **💬 Rich Message Rendering**
The viewer understands and renders Skype/Teams message types:

### **System Events**
- Topic changes  
- Member additions  
- Thread activity  

Rendered as clean system cards.

### **Media & Files**
- `<MediaAlbum>` → album card  
- `<URIObject>` → file card with size + link  

### **Bing / Copilot Responses**
- `<bing-response>` rendered as assistant cards.

### **Metadata Stripping**
- `<context><location encrypted="…">` blocks removed automatically.

---

## **🧭 Navigation**
- Sticky participant/message bars gain a subtle shadow when scrolling.
- Date separators inserted automatically.
- Messages from your own account highlighted.

---

## **🛠 How to Use**
1. Open `skype-log-viewer.html` in any modern browser.
2. Click **Load Export** and select your `messages.json`.
3. Browse conversations normally.
4. Toggle **Export Mode** to filter and export.

---

## **📁 File Structure**
This tool is a single self‑contained HTML file:
- No external libraries  
- No build step  
- No server required  

Just open and use.

---

## **🔒 Privacy**
All processing happens **locally in your browser**.  
No data is uploaded or transmitted anywhere.

---

Licensing: CC-BY-NC. ©2026 Andrew Kingdom, all rights reserved.