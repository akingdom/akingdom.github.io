#! /usr/bin/env python3
"""
# DESCRIPTION: 
# This script is a build-tool for web-based Scripture viewers. It scans 
# subfolders for raw USFM (.SFM) files to generate a collection-based
# JavaScript library, bypassing CORS/Fetch restrictions for local browsing.
#
# OUTPUT FORMAT:
# - bookdata/library_index.js: Defines 'window.BIBLE_INDEX'.
# - bookdata/[collection].js: Defines 'window.COLLECTION_[NAME]'.
"""

import json
import re
import os
from collections import Counter

def get_title_from_copyright(folder_path):
    """Checks for copyright files and extracts the <title> tag value."""
    filenames = ['copr.htm', 'copr.html', 'copyright.htm', 'copyright.html']
    for name in filenames:
        path = os.path.join(folder_path, name)
        if os.path.exists(path):
            try:
                with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                    # Find <title> content, ignoring case and handling newlines
                    match = re.search(r'<title>(.*?)</title>', content, re.IGNORECASE | re.DOTALL)
                    if match:
                        title = match.group(1).strip()
                        if title:
                            return title
            except Exception as e:
                print(f"   ! Error reading {name}: {e}")
    return None

def get_best_collection_title(id_lines):
    """Finds the longest common substring phrase common to > 50% of lines."""
    if not id_lines: return ""
    clean_lines = [l.strip() for l in id_lines if len(l.strip()) > 3]
    if not clean_lines: return ""

    template = clean_lines[len(clean_lines)//2]
    words = template.split()
    best_phrase = ""
    
    for start in range(len(words)):
        for end in range(start + 1, len(words) + 1):
            phrase = " ".join(words[start:end])
            count = sum(1 for line in clean_lines if phrase in line)
            if count > (len(clean_lines) / 2):
                if len(phrase) > len(best_phrase):
                    best_phrase = phrase
                    
    return re.sub(r'^[^A-Za-z0-9\(]+', '', best_phrase).strip()

def build_collections():
    index = {"metadata": {"name": "Bible Library"}, "collections": []}
    if not os.path.exists('bookdata'): os.makedirs('bookdata')

    for entry in os.scandir('.'):
        if entry.is_dir() and entry.name != 'bookdata' and not entry.name.startswith('.'):
            collection_id = entry.name
            collection_books = {}
            id_lines = [] 
            
            # 1. Attempt Primary Detection: Copyright File
            display_name = get_title_from_copyright(entry.path)
            
            # 2. Scan USFM files
            files = [f for f in os.listdir(entry.path) if f.lower().endswith(('.sfm', '.usfm'))]
            files.sort()
            if not files: continue

            print(f"Processing: {collection_id}...")
            
            for filename in files:
                with open(os.path.join(entry.path, filename), 'r', encoding='utf-8') as f:
                    content = f.read()
                    id_match = re.search(r'^\\id\s+(.*)', content, re.MULTILINE)
                    h_match = re.search(r'^\\h\s+(.*)', content, re.MULTILINE)
                    
                    if id_match:
                        raw_id_text = id_match.group(1).strip()
                        parts = raw_id_text.split()
                        if parts:
                            code = parts[0]
                            id_lines.append(" ".join(parts[1:]).strip())
                            book_name = h_match.group(1).strip() if h_match else code
                            collection_books[code] = {"name": book_name, "usfm": content}

            # 3. Fallback to Secondary Detection: Phrase Frequency
            if not display_name:
                display_name = get_best_collection_title(id_lines)
            
            # 4. Final Fallback: Folder Name
            if not display_name or len(display_name) < 3:
                display_name = collection_id.replace('_', ' ').replace('-', ' ').upper()

            var_suffix = re.sub(r'[^A-Z0-9]', '_', collection_id.upper())
            js_filename = f"bookdata/{collection_id}.js"
            
            with open(js_filename, 'w', encoding='utf-8') as f:
                f.write(f"window['COLLECTION_{var_suffix}'] = ")
                json.dump(collection_books, f)
                f.write(";")
            
            index["collections"].append({
                "id": collection_id,
                "name": display_name,
                "file": js_filename,
                "books": {code: b["name"] for code, b in collection_books.items()}
            })
            print(f"   > Assigned Title: '{display_name}'")

    with open('bookdata/library_index.js', 'w', encoding='utf-8') as f:
        f.write("window.BIBLE_INDEX = ")
        json.dump(index, f)
        f.write(";")

if __name__ == "__main__":
    build_collections()