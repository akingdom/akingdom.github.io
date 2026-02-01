# Scripture Viewer Build Tool

A lightweight, high-performance USFM-to-JSON pipeline and web-based viewer. This project is designed to handle multiple Bible versions, automatically detect translation titles from USFM headers or copyright files, and provide a clean, responsive reading experience with Strong’s numbers and footnote support.

## 🚀 Key Features

* **Smart Title Detection:** Automatically pulls the collection name from `copyright.html` or uses a majority-substring algorithm to find the version name within `\id` tags.
* **Granular Randomizer:** Picks a random Book → Chapter → Verse and scrolls directly to it with a visual highlight.
* **Strong’s Number Support:** Integrated toggle (S#) for viewing Greek/Hebrew references.
* **Zero-Server Architecture:** Once built, the entire library runs locally in any modern web browser.

## 📂 Project Structure

* `biblos.html` - The main application (UI & Logic).
* `preprocess_bible.py` - The Python build tool that converts USFM folders into JS data.
* `bookdata/` - Created during build; contains the processed JS versions and index.
* `[Translation_Folders]/` - Put your raw USFM/SFM folders here.

## 🛠️ How to Build

1.  Place your USFM folders in the project root.
2.  Ensure each folder has its `.usfm` or `.sfm` files.
3.  (Optional) Include a `copyright.html` in the folder to set the formal version name.
4.  Run the build script:
    ```bash
    python3 preprocess_bible.py
    ```
5.  Open `biblos.html` in your browser.

## 📜 License

This project is licensed under the **MIT License** and is Copyright (C) 2026 Andew Kingdom.

---

### Data Note
The USFM files and Bible translations themselves remain the property of their respective copyright holders. This project is a tool for processing and viewing, not a provider of the text itself.
