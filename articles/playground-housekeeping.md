
# Backing up your data before Playground shuts off the community feed:

## 1. Join the exiles ❤️
- [Friendly Chat Community for Playgrounders](https://discord.gg/3QK2B3zhGb)

## 2. Back up your images and prompts

The quickest way I know to download ALL your images is this:
- [Go to your 'My Creations' page](https://playground.com/me)
- Scroll (carefully) through ALL your images to make sure they are ALL loaded and there are no black gaps (except the natural gaps where images don't quite fit). This can be quite tedious if you have a lot of images. 
You can cut this down by using the Time option to select each month one at a time (*Thanks JohnFromOz* for this last part).
- Press `Control-S` (on Windows) or `command-S` (on Mac) to save them (same as `File > Save As Complete Web Page`). *For the purpose of saving images, ideally don't save as type 'Single file web page' (.mht) as it's harder to get your images out.*

This gives you a folder with all your loaded/cached images, usually with a _files ending in the name. If you are missing the images, you chose the wrong 'save as' type, just try again. 🙂

This also gives you a HTML file which does contain all your prompts.

To get the prompts there are two main ways I use: *My decoder* or the below *Javascript*. 

### A. Simple Prompt tool
See your prompts by uploading your saved .html file (as mentioned above) via my [Prompt extractor](https://akingdom.github.io/ai_tools/prompt-extraction.html). This works for several AI art tools, not only Playground.

### B. Data format Prompt tool (recommended)
Grab your prompts along with their likes by uploading your saved .html file (as mentioned above) via my [prompt HTML to JSON tool](https://github.com/akingdom/akingdom.github.io/ai_tools/prompt-html-to-json.html). This lets you save your prompts, likes and image links for use with my gallery viewer on your computer (see below).

Caveat: I've not tested if Playground truncates (cuts short) prompts in this manner versus when you're viewing the individual images.

## 3. Gallery Viewer
If we lose access to our Playground graphics, this is a gallery web file which you can open in on your computer with no internet needed after setting it up. Essentially on your computer you need in the same folder:

- Your prompts and images *saved from PlayGround* as .html with your images (typically in a ..._files folder) as described in step 2 above.
- Your prompts converted to JSON data file (step B above).
- Saved gallery viewer [viewer - raw web page](../ai_tools/prompt-backup-viewer.html) or download and uncompress [viewer - compressed zip file](../ai_tools/prompt-backup-viewer.html.zip). 

1. Open the gallery viewer html file from the above folder.
2. Open the html file.
3. Use the html file to load your file containing the above JSON data (or you can paste it straight in).
4. Type in the name of your images folder.
5. Click the Display button.

If all goes well you'll see a grid with all your images, likes and the option to copy any of the prompts. 

If all didn't go well, try these steps again, or check that the image names match the src or href values in the JSON data (the web page does try very hard to match them up), or some systems with extra security might not allow the page to access the images.

For advanced users, you can paste a 'file:///' path into the folder name and it should work, even from the online web gallery page.

## 4. Back up your followers and followings.
This assumes you are comfortable with your web browser's Javascript Console.


    // ❤️ Here's your followers and followings, as lists of http links:
    
    // Step 1. Go to https://playground.com/profile/ (your profile)
    
    // Step 2. Paste the following into your browser console and copy BOTH text results
    let v=JSON.parse(document.getElementById('__NEXT_DATA__').innerHTML);
    console.log('FOLLOWING\n\n'+v.props.pageProps.followingIds.map(followingId => `https://playground.com/profile/${followingId}`).join('\n')+'\n\n')
    console.log('FOLLOWERS\n\n'+v.props.pageProps.followerIds.map(followerId => `https://playground.com/profile/${followerId}`).join('\n')+'\n\n')
    
    // My purpose in this is to grab a list of profiles I can go to if they remain on the 17th.
    // I'd be delighted if any coder can add names... possibly they are buried in 'v'.


## 5. Find alternate services (as necessary).
- AI text-to-image (you could stay with Playground.com for this - [have a look at the newer system](https://playground.com/design/c/art)).
- Artwork publishing and community site.

For these I suggest a [read through the recommendations on this discussion](https://discord.com/channels/1108515559164883107/1138316277211996181/1306088534008008736)

If you have your own website as I do, you can have your own gallery.
[For example](https://akingdom.github.io/art2/) I put a few of my Playground images on my website (above) using a combination of saving the images in bulk and the javascript prompt backup script.

If you'd like help with a website (or other IT needs) I provide this as a fee-based service.

I'm a software engineer so I tend to write tools as I need them - eventually I'm aiming to put all my tools together into an AI-prompt toolkit for non-programmers.

Best wishes,
AK

