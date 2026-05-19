# Biblos Scripture Viewer

<img alt="Biblos logo" src="biblos.svg" width="180" height="180" style="float:left; margin-right:1rem;">

A fast, entirely client‑side Bible reader built from USFM source files.  
Choose from several freely distributable translations, search the entire text, and listen to the Word with smooth, sentence‑aware text‑to‑speech — all in a clean, mobile‑friendly interface that works offline.

## ✨ Highlights

* **Multiple translations** – Switch between collections with a single tap; the app remembers your last‑read position.
* **Smart search** – Type a reference (“John 3:16”), a plain‑text keyword, or just a chapter number to jump instantly.
* **Text‑to‑speech** – Listen to whole chapters with per‑word highlighting and a soft verse glow. Pause, resume, or restart reading anytime.
* **Strong’s numbers & footnotes** – Toggle Strong’s references on/off; tap any footnote chip to read it in the bottom bar.
* **Random verse** – A dice button for moments of serendipity.
* **QR code sharing** – The current passage is always available as a floating QR code.
* **Zero‑server design** – Once built, everything runs in your browser. No internet required after the first load.

## 🧱 Project Structure

* `biblos.html` – The complete viewer (UI, logic, TTS engine).
* `preprocess_bible.py` – Python build script that converts USFM directories into compact JavaScript data files.
* `bookdata/` – Auto‑generated during build; holds the processed JS collections and an index.
* `[Translation_Folders]/` – Place your raw USFM/SFM directories here before building.

## 🛠️ How to Build

1. Place your USFM folders in the project root (e.g., `BSB/`, `WEB/`).
2. (Optional) Include a `copyright.html` inside a folder to set the formal version name.
3. Run the builder:
   ```bash
   python3 preprocess_bible.py
    ```
5.  Open [`index.html`](index.html) in your browser.

## 📜 License

This project is licensed under the **MIT License** and is Copyright (C) 2026 Andew Kingdom.

---

### Data Note
The USFM files and Bible translations themselves remain the property of their respective copyright holders. This project is a tool for processing and viewing, not a provider of the text itself.
