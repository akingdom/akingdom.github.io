<!--PYKELET

DESCRIPTION: Together, let’s turn ideas into reality. Reach out to start your journey!

TITLE:       Andrew Kingdom
SITE: 	     akingdom.github.io
HOST:	     github.io
FILENAME:    README.md
AUTHOR:      Andrew Kingdom

-->
<link rel="stylesheet" href="styles/common.css">
<!-- QR Code -->
<style>
/* 1. Target the GitHub markdown wrapper */
.markdown-body {
  position: relative;
}
/* 2. Override the inline absolute and float the QR code */
#qrcode {
  position: static !important;
  float: right;
  margin: 1em;       /* space around the QR */
  width: 8em;        /* your desired size */
  height: 8em;
}
/* 3. Ensure the first heading clears the QR float */
.markdown-body > h1:first-child,
.markdown-body > h2:first-child {
  clear: left;
  margin-top: 0;     /* remove any unwanted gap */
}
</style><div id="qrcode">
</div>
<script src="../js/qrcode.js"></script>
<script>// Updated QR code display for github websites.
(function(){
  function init(){
    const container = document.getElementById('qrcode');
    if (!container) return;

    // 1. Figure out the CSS size in px
    const cssW = container.clientWidth;
    const cssH = container.clientHeight;
    const dpr  = window.devicePixelRatio || 1;

    // 2. Generate a DPR-aware QR
    new QRCode(container, {
      text: location.href,
      width:  cssW * dpr,
      height: cssH * dpr,
      correctLevel: QRCode.CorrectLevel.H
    });

    // 3. Grab the visible element (img first, then canvas)
    const el = container.querySelector('img') || container.querySelector('canvas');
    if (!el) return;

    // 4. Force it back to CSS pixel size
    el.style.width  = cssW + 'px';
    el.style.height = cssH + 'px';
    el.style.display = 'block';
  }

  // Run at DOM ready, even if script is injected after the event
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
</script>

## <img alt="Illustration of Andrew" src="https://akingdom.github.io/images/AK%20cartoon-IMG_7620-avatar-rounded.png" width="94px" height="94px" style="border-radius: 25px;"> [Andrew Kingdom](https://akingdom.github.io) · [Contact Me]

**[Areas of Expertise](#work-i-do)** - [Language](#interests) · [Software](https://github.com/akingdom/akingdom/#current-programming-and-markup-languages) · [Technology](https://github.com/akingdom/akingdom/#platforms) · [Everything Else](#interests) · [Quotes](#quotes)

<div id="DESCRIPTION"></div>

### Work I do
I’m a freelance consultant specializing in technology solutions. Whether you’re facing a complex IT issue or need guidance on software development, I’m here to help.

- <span class="xicon-mobile"></span><label>App Maintenance</label>: Keeping your mobile apps running smoothly.
- <span class="xicon-web"></span><label>Minimalist Websites</label>: Streamlined one page websites.
- <span class="xicon-person"></span><label>English Language</label>: Help with English for non-native speakers.
- <span class="xicon-thing1"></span><label>Freelancer & Tutor for hire</label>: I provide support with any IT challenge, big or small. I offer tutoring in programming, electronics, genealogy.
- <span class="xicon-thing2"></span><label>Code Language Translation</label>: Translating programs between computer languages.
- <span class="xicon-game"></span><label>English Language</label>: Building data transformation pipelines.
- And much more!

**"Together, let’s turn ideas into reality. Reach out to start your journey!"**

<div id="aitools" dir="auto" class="feature">
	<div>
		<div class="markdown-heading" dir="auto"><h2 tabindex="-1" class="heading-element" dir="auto">AI Tools</h2></div>
		<a target="_blank" rel="noopener noreferrer nofollow" href="https://akingdom.github.io/images/www-whimsical-cartoonish-illustration-young-boy-dark-opt-.svg">
			<img alt="Whimsical www" src="https://akingdom.github.io/images/www-whimsical-cartoonish-illustration-young-boy-dark-opt-.svg" width="180px" height="180px" style="max-width: 100%;">
		</a>
	</div>
	<div>
		<p>Transform your creative process. Shorten and sharpen your AI prompt text with my <a href="https://akingdom.github.io/duplicate_word_highlighter/duplicate_word_highlighter.html">Duplicate Word Finder</a>. Capture AI prompts from your saved web pages seamlessly with the <a href="https://akingdom.github.io/ai_tools/prompt-extraction.html">Prompts Extraction</a> tool. Elevate your productivity and creativity with tools designed to make your workflow smoother and more efficient.</p>
	</div>
</div>



<div id="quote-container"></div>

### Technology Expertise
- **AI:** Ethics, tutoring, prompts, tasking and much more.
	- **Read More**: [Universal Ethical Framework for Future AI](https://akingdom.github.io/articles/Ethical_Framework_for_Future_AI)
	- **Read More**: [Efficient AI communications change management](https://akingdom.github.io/articles/optimizing_communication_with_ai) (for developers).
	- **Read more**: [Artificial Intelligence nomenclature](https://akingdom.github.io/articles/ai_nomenclature)
	- **Read More**: [Samples of my AI Art](https://akingdom.github.io/art2/)
- **Programming Languages:** Objective-C, Java, C#, Swift, HTML, JavaScript, CSS, and more.
	- **Read more**: [Advice for Student Programmers](https://gist.github.com/akingdom/09f1bef20fd0f601cbb2b8d504ef6f9c)
	- **Read more**: [Source Code](https://github.com/akingdom?tab=repositories) Repositories
	- **Read more**: [Source Code Extracts](https://gist.github.com/akingdom) Gist
	- **Read more**: [Guides](https://github.com/akingdom/) - Excel, Xcode, Blender
	- **Read more**: [Standards](https://github.com/akingdom/) - mostly formats for data storage and transport
- **Platforms:** Cloud (AWS, Azure, Google), servers (Windows, Linux), desktop (MacOS, Windows), mobile (iOS, Android), and embedded systems (MicroChip, Raspberry Pi).
	- **Read more**: [Promoting and Selling External Digital Content in Apple Apps](https://akingdom.github.io/articles/apple-developer-external-content) 
- **Development Tools**: Streamlining development of software. 
	- **Read more**: [RTF viewer](https://akingdom.github.io/markdown_tools/rtfreader.html) (simple)
	- **Read more**: [Markdown viewer](https://akingdom.github.io/markdown_tools/markdown_viewer.html) (simple)
	- **Read more**: [Generate markdown Table-of-contents](https://akingdom.github.io/markdown_tools/markdown_toc.html)
	- **Read more**: [Markdown links to all your Github projects](https://akingdom.github.io/git-me/) - list all your repositories and gists in markdown format.
	- **Read more**: [Markdown to YouTube comment](https://akingdom.github.io/markdown_tools/markdown_to_youtube_comment_formatter.html) (simple)
	- **Read more**: [Duplicate Word Highlighter](https://akingdom.github.io/duplicate_word_highlighter/duplicate_word_highlighter.html) - quickly locating duplicate
	- **Read more**: [Generate a QR Code](https://akingdom.github.io/design_tools/generate-qrcode.html) - Generate a barcode for phones, etc.
	- **Read more**: [Colour Blender](https://akingdom.github.io/design_tools/color-blender.html) - Allows you to mix colours on screen.
	- **Read more**: [Image Focal Length](https://akingdom.github.io/design_tools/image_lens_distortion_tool.html) - Allows you to change focal length of image.
- **System Tools**: Operational utilities.
	- **Read more**: [Password Generator](https://akingdom.github.io/system_tools/password_generator.html)

### Interests
I have a wide range of interests that inform my work and approach:

- **Nature and Science:** Enthusiast of biology, geology, cosmology, and physics.
	- **Read more**: [The Moon](https://akingdom.github.io/articles/moon)
- **Practical Thinking:** Exploring philosophy, religion, psychology, mathematics, and epistemology.
	- **Read more**: [Aspiring Leadership](https://akingdom.github.io/articles/aspirational_leadership)
	- **Read more**: [Mathematical finds](https://akingdom.github.io/articles/maths)
	- **Read more**: [Discipline and Trauma](https://akingdom.github.io/articles/Trauma_and_Discipline_v2)
	- **Read more**: [Belief and Trauma](https://akingdom.github.io/articles/Trauma_and_Belief)
- **Technology**: From simple embedded computers to complex networks and systems, I’ve helped design and build solutions across the spectrum.
	- **Read more**: [Programmable system design principles](https://gist.github.com/akingdom/bf3f498810a33e17f2d6d12425ef51ff)
	- **Read more**: *See 'AI' above*
- **History and Language:** Delving into archaeology, etymology, genealogy, and more. I'm currently learning modern Greek and enjoy foreign films and shows.
	- **Read more**: [Words and their meanings](https://akingdom.github.io/articles/etymology) (Etymology)
	- **Read more**: [Shapes and their meanings](https://akingdom.github.io/articles/ShapeTheory) (Shape Theory)
- **Food and Cooking:** Learning the art of cooking (and how to avoid burning water!).
	- **Read more**: [Recipes and how not to burn water](https://github.com/akingdom/food-recipes)
- **Creative Endeavors:** Passionate about reading, writing, and exploring visuals like user interfaces and artwork.
	- **Read more**: [Music](https://www.youtube.com/channel/UCJAeF7xHIxwT8UwCKFxfwPQ)
	- **Read more**: [Art](art2/)
		- **Read more**: [Stereograph correction tool](https://akingdom.github.io/design_tools/stereograph-swapLR+flipL.html)
	- **Read more**: [Story Writing](https://akingdom.github.io/articles/AK_on_writing)
		- **Read more**: [Writing Tips & Jane Austen](https://akingdom.github.io/articles/AK_on_Jane_Austen)
	- **Read more**: [Software](https://gist.github.com/akingdom/09f1bef20fd0f601cbb2b8d504ef6f9c)
		- **Read more**: [Match Blocks](https://akingdom.github.io/matchblox)

### Quotes

> A movie is never really finished, just released. - Bonnie Arnold, a producer of the 'How to Train Your Dragon' movies.

> If you're not embarassed by your early work, you spent too long on it. - Attributed to Neil Gaiman

> The opposite of addiction is not sobriety but connection (friendships). - Johann Hari

> Where possible, focus on things that are worthwhile. - Andrew Kingdom

> Writer's Block? Think about things differently by: Adding a new communication; add in random text from any source at hand; take time to relax, help a stranger, rewrite in a different format (e.g. story as a screenplay), don't get bogged down, put down the basics and move on. -- Andrew Kingdom

> Even experts know less than 1% of everything that can be known about life, the universe and everything. To think otherwise is to not even be aware of your own ignorance.  — Andrew Kingdom

> Being an expert in one field does not guarantee expertise in another field. For example, understanding the science of combustion doesn't automatically make me good at cooking food on a fire. — Andrew Kingdom

> No work is ever worth a divorce  — Andrew Kingdom

> You can't truly love others if you're not caring for yourself. It's like how airlines say, 'Put on your own mask first, then help others.'  — Andrew Kingdom

> Intelligence has little to do with a person's value as a human. — Andrew Kingdom

> True life transformation isn’t the fruit of human effort—it’s not something owed or earnt—but a reliable divine gift, granted freely through grace. — Andrew Kingdom

> A.I. is a tool made by humans to assist humans; don't confuse it with actual intelligence, the two are not the same and will never be so. — Andrew Kingdom

> Un-deception is the successful resolution of misapprehension, that is, the changing of your mind concerning a misbelief. This is not the same as trying to change someone else's mind. — A. Kingdom on C.S. Lewis on J. Austen

> I.Q. tests are intended as a measure of a person's mental ability to solve certain problems within a very narrow mindset and domain knowledge, which generally excludes: a person's full intellect, emotional quotient, physical intellect, spatial intellect, spiritual intellect, love, kindness, ethics, mental alertness and many other factors. In my experience the tests often assume a single correct answer, whereas in reality there are often many ways to answer the question, depending how you consider it. — Andrew Kingdom

> The Role of Emotional Context in Effective Decision-Making and Communication:
> - **Understanding context** when making informed decisions enhances relationships and communication (acknowledging emotions is part of the context).
> - **Managing emotions in the bigger picture** improves decision-making and reduces excessive conflict, leading to clearer perspectives and rational choices.
> - **Communicating decisions clearly** positively impacts circumstances and strengthens emotional well-being.
— Andrew Kingdom

> Use your connections (contacts) to find the back door into an organisation rather than worrying about getting stuck in the front door. - Temple Grandin

> Add new things (especially technology) only if they clearly reduce workload—each addition must simplify or "short-circuit" processes to offset the complexity and management it brings. - Andrew Kingdom

> Thoughts and ideas are like food - we need them to live but there are junk thoughts and heathy thoughts. - Andrew Kingdom

### Footnotes
- <sub><img src="https://avatars.githubusercontent.com/u/1809762?v=4" width="20" height="20">My GitHub user icon: Quantum Computing with an artistic twist.</sub>
- <sub>(C) Copyright 2024 Andrew Kingdom. All rights reserved.</sub>



<!-- ALL SCRIPTING -->
<script src="js/pykelet.js"></script>
<script src="js/hide_github_title.js"></script>
<script src="js/random_quote.js"></script>
<script src="js/tawk_to.js"></script>
