# Biblos Scripture Viewer

<img alt="Biblos logo" src="biblos.svg" width="180" height="180" style="float:left; margin-right:1rem;">

A fast, self‑contained Bible reader for the browser.  
Pick a translation, search the text, or sit back and listen—all from a single, offline‑capable page.

## Read, Search, Listen

* **Switch translations instantly** – Several freely distributable collections are just a tap away. The app remembers where you left off.
* **Jump anywhere** – Type a reference (“John 3:16”), a keyword, or simply a chapter number to go straight there.
* **Listen along** – Tap play to hear the chapter read aloud. Each word highlights as it’s spoken, and the current verse glows softly. Pause, resume, or restart whenever you like.
* **Explore the details** – Toggle Strong’s numbers to see original‑language references, and tap footnote chips to read annotations in the bottom bar.
* **Surprise yourself** – The dice button opens a random verse.
* **Share a passage** – A QR code floats in the corner, encoding the exact passage you’re viewing.
* **Works offline** – After the first visit, everything runs on your device. No internet required.

## From Source to Screen

If you’d like to build the app with your own USFM translations:

1. Place your USFM directories (e.g. `BSB/`, `WEB/`) in the project root.
2. (Optional) Add a `copyright.html` file inside a translation folder to set its formal name.
3. Run the preprocessor:
   ```bash
   python3 preprocess_bible.py
   ```
4. Open `index.html` in any modern browser.

The entire viewer is a single HTML file—no server, no extra build steps.

## Inside the Box

Developers will find all the logic in `index.html`, organised as a set of **independent classes**. Each class owns one job, making the code easy to read, debug, and modify—even with AI assistance.

| Class | Responsibility |
|-------|----------------|
| `AppState` | Central state (book, chapter, UI toggles, search results); syncs user preferences to `localStorage`. |
| `USFMParser` | Pure functions: USFM → structured data, Strong’s pills, footnote chips, word wrapping for TTS. |
| `QRManager` | Updates the floating QR code for the current passage. |
| `NoteManager` | Shows/hides footnote text in the bottom bar with pin support. |
| `VoiceSidebar` | Voice‑selection overlay. |
| `BibleDataLoader` | Dynamic script loading, IndexedDB caching, and collection population. |
| `Renderer` | Builds the chapter HTML—handles structural headers, poetry indentation, and blank lines. |
| `DropdownManager` | All dropdown menus (translation, book, chapter) and navigation methods. |
| `SearchManager` | Search input, reference jumps, full‑text results, and result navigation. |
| `SpeechController` | Complete TTS engine: play/pause/restart, word‑level highlighting, voice selection, error recovery. |
| `App` | Orchestrator: instantiates and wires all classes, binds global events, starts the app. |

A service‑worker registration (included at the bottom of `index.html`) enables offline caching. Supply a `/sw.js` file to activate it.

See also [Design_Notes.md](DESIGN_NOTES).

## Rights & Permissions

This project is licensed under the **MIT License** and is copyright © 2026 Andew Kingdom.

The USFM files and the Bible translations they contain remain the property of their respective copyright holders. This tool processes and displays those texts.
