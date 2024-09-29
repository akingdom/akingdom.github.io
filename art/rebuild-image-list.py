#!/usr/bin/env python
# File: rebuild-image-list.py
# Purpose: Rebuild the JSON image list

import os
import json
import subprocess
import sys

try:
    from PIL import Image, ImageFilter
except ImportError:
    print("Pillow is not installed. Installing now...")
    subprocess.check_call([sys.executable, '-m', 'pip', 'install', 'Pillow'])
    print("Please re-run the script after installing the required packages.")
    sys.exit()

ART_IMAGES_PATH = './images/'
THUMBNAILS_PATH = './thumbnails/'
IMAGE_LIST_PATH = './data/imagelist.js'

def create_thumbnail(image_path, thumbnail_path):
    """Create a thumbnail for the image."""
    img = Image.open(image_path)
    img.thumbnail((256, 256), Image.Resampling.LANCZOS)  # Use LANCZOS for high-quality downsampling
    img.save(thumbnail_path, "JPEG")

def load_existing_image_list():
    """Load the existing image list from the JSON file."""
    try:
        with open(IMAGE_LIST_PATH, 'r') as f:
            # Read the JavaScript variable and parse it as JSON
            content = f.read()
            # Extract the JSON part from the variable declaration
            json_data = content.split('= ', 1)[1].rstrip(';')
            image_list = json.loads(json_data)
            return {img['path']: {'modified': img['modified'], 'title': img.get('title', os.path.basename(img['path']))} for img in image_list}
    except (FileNotFoundError, json.JSONDecodeError):
        return {}

def generate_image_list():
    """Generate the image list, manage thumbnails, and delete orphaned thumbnails."""
    existing_images = load_existing_image_list()
    image_list = []
    generated_thumbnails = set()

    # Ensure thumbnails directory exists
    os.makedirs(THUMBNAILS_PATH, exist_ok=True)

    # Scan the images directory
    for filename in os.listdir(ART_IMAGES_PATH):
        if filename.lower().endswith(('.jpg', '.jpeg', '.png', '.gif')):
            file_path = os.path.join(ART_IMAGES_PATH, filename)
            thumbnail_path = os.path.join(THUMBNAILS_PATH, filename)
            modified_time = os.path.getmtime(file_path)
            generated_thumbnails.add(thumbnail_path)  # Track this thumbnail as being used

            # Regenerate thumbnail if missing or image is modified
            if (file_path not in existing_images or 
                existing_images[file_path]['modified'] < modified_time or 
                not os.path.exists(thumbnail_path)):
                print(f"Creating thumbnail for: {file_path}")
                create_thumbnail(file_path, thumbnail_path)

                # Append image details to the list
                image_list.append({
                    'title': filename,  # You can customize the title here if needed
                    'path': file_path.replace('\\', '/'),  # Ensure correct path format
                    'thumbnail': thumbnail_path.replace('\\', '/'),
                    'modified': modified_time
                })
            else:
                # If the image hasn't been modified, retain the title and other info from existing data
                image_list.append({
                    'title': existing_images[file_path]['title'],
                    'path': file_path.replace('\\', '/'),
                    'thumbnail': thumbnail_path.replace('\\', '/'),
                    'modified': existing_images[file_path]['modified']
                })

    # Delete any orphaned thumbnails that no longer correspond to images
    for thumbnail in os.listdir(THUMBNAILS_PATH):
        thumbnail_full_path = os.path.join(THUMBNAILS_PATH, thumbnail)
        if thumbnail_full_path not in generated_thumbnails:
            print(f"Deleting orphaned thumbnail: {thumbnail_full_path}")
            os.remove(thumbnail_full_path)

    # Save updated image list to imagelist.js
    with open(IMAGE_LIST_PATH, 'w') as f:
        f.write(f'document.imagesData = {json.dumps(image_list, indent=2)};')


if __name__ == '__main__':
    generate_image_list()
