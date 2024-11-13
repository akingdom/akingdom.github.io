
# Things to do before Playground shuts off the community feed:

## 1. Join the exiles ❤️
- [Friendly Chat Community for Playgrounders](https://discord.gg/3QK2B3zhGb)


## 2. Back up your images and prompts

The quickest way I know to download ALL your images is this:
- [Go to your 'My Creations' page](https://playground.com/me)
- Scroll (carefully) through ALL your images to make sure they are ALL loaded and there are no black gaps (except the natural gaps where images don't quite fit). This can be quite tedious if you have a lot of images.
- Press `Control-S` (on Windows) or `command-S` (on Mac) to save them (same as `File > Save As Complete Web Page`). *For the purpose of saving images, ideally don't save as type 'Single file web page' (.mht) as it's harder to get your images out.*

This gives you a folder with all your loaded/cached images, usually with a _files ending in the name. If you are missing the images, you chose the wrong 'save as' type, just try again. 🙂

This also gives you a HTML file which does contain all your prompts.

To get the prompts there are two main ways I use: *My decoder* or the below *Javascript*. 

### A. Prompt Extractor (less technical)
See your prompts by uploading your saved .html file as mentioned above) to my [Prompt extractor](https://akingdom.github.io/ai_tools/prompt-extraction.html).

Caveat: I've not tested if Playground truncates (cuts short) prompts in this manner versus when you're viewing the individual images.

-or-

### B. Javascript (More Technically Advanced)
(This assembles your prompt data as JSON text)

While your *My Creations* page is open and all images loaded as mentioned above, bring up your Web Browser Javascript Console and paste in the following code:

    // This is what I use regularly to back up my prompts, if you're comfortable using your browser's console. Copy the result and save it to file.
    const elements = document.querySelectorAll('.grid.gap-1');
    
    const extractedData = [];
    
    elements.forEach(element => {
      const imageLink = element.querySelector('a')?.getAttribute('href') || ''; 
      const imageUrl = element.querySelector('img')?.getAttribute('src') || '';
      const imageAlt = element.querySelector('img')?.getAttribute('alt') || ''; 
      const likesCount = element.querySelector('.LikeButton_like_button__vXTZb span:nth-child(1)')?.textContent.trim() || '-1'; // Get text content and trim spaces
    
      const data = {
        href: imageLink,
        src: imageUrl,
        alt: imageAlt,
        likes: likesCount
      };
    
      extractedData.push(data);
    });
    
    console.log(extractedData);
	// end of javascript.



## 3. Back up your followers and followings.
This assumes you are comfortable with your web browser's Javascript Console.


    // ❤️ Here's your followers and followings, as lists of http links:
    
    // Step 1. Go to https://playground.com/profile/ (your profile)
    
    // Step 2. Paste the following into your browser console and copy BOTH text results
    let v=JSON.parse(document.getElementById('__NEXT_DATA__').innerHTML);
    console.log('FOLLOWING\n\n'+v.props.pageProps.followingIds.map(followingId => `https://playground.com/profile/${followingId}`).join('\n')+'\n\n')
    console.log('FOLLOWERS\n\n'+v.props.pageProps.followerIds.map(followerId => `https://playground.com/profile/${followerId}`).join('\n')+'\n\n')
    
    // My purpose in this is to grab a list of profiles I can go to if they remain on the 17th.
    // I'd be delighted if any coder can add names... possibly they are buried in 'v'.


## 4. Find alternate services (as necessary).
- AI text-to-image (you could stay with Playground.com for this using the newer system).
- Artwork publishing and community site.

For these I suggest a [read through the recommendations on this discussion](https://discord.com/channels/1108515559164883107/1138316277211996181/1306088534008008736)

If you have your own website as I do, you can have your own gallery.
[For example](https://akingdom.github.io/art2/) I put a few of my Playground images on my website (above) using a combination of saving the images in bulk and the javascript prompt backup script.

If you'd like help with a website (or other IT needs) I provide this as a fee-based service.

I'm a software engineer so I tend to write tools as I need them - eventually I'm aiming to put all my tools together into an AI-prompt toolkit for non-programmers.

Best wishes,
AK

