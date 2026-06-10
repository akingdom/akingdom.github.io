<!--PYKELET

DESCRIPTION: Together, let's turn ideas into reality. Reach out to start your journey!

TITLE:       Andrew Kingdom
SITE:        akingdom.github.io
HOST:        github.io
FILENAME:    README.md
AUTHOR:      Andrew Kingdom

-->
<link rel="stylesheet" href="styles/common.css">
<!-- QR Code -->
<style>
.markdown-body { position: relative; }
#qrcode {
  position: static !important;
  float: right;
  margin: 1em;
  width: 8em;
  height: 8em;
}
.markdown-body > h1:first-child,
.markdown-body > h2:first-child {
  clear: left;
  margin-top: 0;
}
</style><div id="qrcode"></div>
<script src="../js/qrcode.js"></script>
<script>// Updated QR code display for github websites.
(function(){
  function init(){
    const container = document.getElementById('qrcode');
    if (!container) return;
    const cssW = container.clientWidth;
    const cssH = container.clientHeight;
    const dpr  = window.devicePixelRatio || 1;
    new QRCode(container, {
      text: location.href,
      width: cssW * dpr,
      height: cssH * dpr,
      correctLevel: QRCode.CorrectLevel.H,
      render: "path"
    });
    const el = container.querySelector('img') || container.querySelector('canvas');
    if (!el) return;
    el.style.width  = cssW + 'px';
    el.style.height = cssH + 'px';
    el.style.display = 'block';
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
</script>
<!-- QR Code end -->

## <img alt="Illustration of Andrew" src="https://akingdom.github.io/images/ak_2024_747_sm_rounded.png" width="94px" height="94px" style="border-radius: 25px;"> [Andrew Kingdom](https://akingdom.github.io) · [Contact Me]

<!-- Search Box -->
<style>
#search-container { margin-top: 1em; margin-bottom: 2em; }
#search-input-container { position:relative; width: min(38rem,75%); }
#search-input {
    width: 100%; height: 100%; padding: 0.5em 1.0em;
    border: 1px solid #ccc; border-radius: 16px; box-sizing: border-box;
}
#search-results {
    border-color: #1e3a5f; border-style: solid; border-width: thin;
    border-radius: 6px; margin-top: 0.35rem; margin-left: 0.1rem;
    background-color: ghostwhite; flex-direction: column; gap: 0px;
    align-items: flex-start; border-left: 4px solid #1e3a5f;
    display: flex; padding: 0 1rem;
}
.search-result {
    border-radius: 6px; margin-bottom: 1em; padding-bottom: 1em;
    border-bottom: 1px dashed #eee;
}
.search-result:last-child { border-bottom: none; }
.search-result h4 { margin: 0; }
.search-result p { margin: 0.5em 0; color: #555; }
.search-icon, .clear-button {
    --tw-text-opacity: 1; --tw-translate-y: -50%; --tw-translate-x: 0;
    --tw-rotate: 0; --tw-skew-x: 0; --tw-skew-y: 0;
    --tw-scale-x: 1; --tw-scale-y: 1;
    color: rgb(156 163 175 / var(--tw-text-opacity, 1));
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
    width: 1.5rem; height: 1.5rem; top: 50%; right: 0.75rem;
    position: absolute; background-color: inherit; border: inherit;
}
.search-icon.hidden, .clear-button.hidden, #search-results.hidden {
  opacity: 0; visibility: hidden;
}
</style>
<div id="search-container">
    <div style="position:relative;width: min(38rem,75%);">
        <input type="text" id="search-input" placeholder="Search my content..." oninput="handleSearchInput(this)" onkeydown="handleSearchKeydown(event)">
        <button class="clear-button hidden" onclick="clearSearchInput()">X</button>
        <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" class="search-icon">
            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
        </svg>
    </div>
    <div id="search-results" class="hidden"></div>
</div>
<!-- Search Box end -->


**[Areas of Expertise](#work-i-do)** — [Business & Strategy](#business--strategy) · [Technology](#technology-expertise) · [Projects](#featured-projects) · [Articles & Tools](#interests) · [Quotes](#quotes)

<div id="DESCRIPTION"></div>

> **What this site is:** A portfolio of my work and a place where I publish ideas, tools, and research. The articles, guidelines, and tools you'll find here are things I've built or written – not just links to "about me" pages. They're the actual value I offer.

## How I Can Help Your Business

Technology should make your business run smoother, not create more headaches. I bring 35+ years of IT experience – from coding in over 300 languages to managing 5,000‑user environments – and I work directly with owners to solve real problems.

Here's what that means for you:

- **Practical advice, not jargon** – I translate technical complexity into clear choices.
- **Experience across the board** – Mobile, desktop, cloud, IoT, servers, and everything in between.
- **A track record of results** – I've helped owners decipher what NASA wanted from their business, plan international tech rollouts, and build custom tools that save hours every week.

**My promise:** Every conversation leaves you clearer than before. No pressure, no upsells – just honest help.

## Services I Offer

I focus on small to medium businesses and individual professionals. These are the concrete ways I deliver value:

- **IT Consulting & Strategy** – Need to plan a new website, app, or system? I'll help you scope it, budget it, and avoid common pitfalls.
- **Custom Software & Tools** – A small script or a full web app – if it saves you time, I can build it.
- **Technical Support for Teams** – From one‑off fixes to ongoing help for your staff.
- **Educational Consulting** – Training your team, or advising on tech for schools and creative industries.
- **Online Research & Data** – Finding the right information, cleaning messy data, or setting up automated research workflows.

*Everything I do is tailored to what actually works for you – not what looks good on a portfolio.*

## Business & Strategy

I've spent years working alongside business owners to turn technology into a competitive advantage. Here's what that looks like in practice:

- **Deciphering client requirements** – For example, helping a business understand exactly what NASA wanted from their proposal, so they could bid with confidence.
- **Planning international expansion** – Mapping out the tech, compliance, and logistics for cross‑border growth.
- **New app and website scoping** – Moving from a vague idea to a clear, actionable plan.
- **IT cost optimisation** – Cutting unnecessary spend without sacrificing reliability.

**Recent article that speaks to this:**
- [**Universal Ethical Framework for Future AI**](https://akingdom.github.io/articles/Ethical_Framework_for_Future_AI) – A principles‑based guide for integrating AI into business without losing accountability.

> *Notes from my work:* I regularly consult with business owners on practical success – whether that's deciphering a complex tender, planning a new software rollout, or simply helping someone understand what their IT person is saying. I've worked at the small/SME level and have deep insight into how large corporations operate (from a human, not a bureaucratic, angle).

## Featured Projects

<table><tr>
<!-- AI Tools -->
<td width="33%" valign="top">
  <a href="https://akingdom.github.io/duplicate_word_highlighter/duplicate_word_highlighter.html">
    <img src="https://akingdom.github.io/images/www-whimsical-cartoonish-illustration-young-boy-dark-opt-.svg"
         width="90" alt="AI Tools illustration" />
  </a>
  <br><strong>AI Tools</strong>
  <br><small>Duplicate Word Finder & Prompt Extraction – sharpen your AI workflow instantly.</small>
</td>
articles/Metrics-Beyond_the_Engagement.md
<!-- Scripture Viewer -->
<td width="33%" valign="top">
  <a href="biblos/">
    <img src="biblos/biblos.svg" width="90" alt="Biblos logo – open Bible with bookmark" />
  </a>
  <br><strong>Scripture Viewer</strong>
  <br><small>Offline‑first Bible reader with multiple translations, full‑text search, and calming text‑to‑speech.</small>
</td>

<!-- Talking Clock -->
<td width="33%" valign="top">
  <a href="https://akingdom.github.io/talking_clock/">
    <img src="https://akingdom.github.io/talking_clock/talkingclock.png"
         width="90" alt="Talking Clock screenshot" />
  </a>
  <br><strong>Talking Clock</strong>
  <br><small>Analog clock with real‑time voice synthesis, inspired by Telstra's classic 1194.</small>
</td>
</tr></table>

<div id="quote-container" data-quote-action="move"></div>

## Technology Expertise

- **AI** – Ethics, tutoring, prompts, tasking.
  - [AI Governance Policy](https://akingdom.github.io/articles/AI_Governance_Policy_Accountability_First) · [Universal Ethical Framework](https://akingdom.github.io/articles/Ethical_Framework_for_Future_AI) · [AI Communication](https://akingdom.github.io/articles/optimizing_communication_with_ai) · [AI Nomenclature](https://akingdom.github.io/articles/ai_nomenclature) · [AI & Art](https://akingdom.github.io/articles/AI-is-Arts-Next-Tool-Not-Grave) · [AI Protocol](https://akingdom.github.io/articles/ai_verifiable_reality) · [Simplified AI Architecture](https://akingdom.github.io/articles/limits_of_simplified_AI_architecture)

- **Programming Languages** – Objective‑C, Java, C#, Swift, HTML, JavaScript, CSS, and more.
  - [Advice for Students](https://akingdom.github.io/articles/Programming-Advice-AK) · [Source Code](https://github.com/akingdom?tab=repositories) · [Code Extracts](https://gist.github.com/akingdom) · [Guides](https://github.com/akingdom/) · [Standards](https://github.com/akingdom/)

- **Platforms** – Cloud (AWS, Azure, Google), servers (Windows, Linux), desktop (macOS, Windows), mobile (iOS, Android), embedded (MicroChip, Raspberry Pi).
  - [External Content in Apple Apps](https://akingdom.github.io/articles/apple-developer-external-content)

- **Development Tools**
  - [RTF viewer](https://akingdom.github.io/markdown_tools/rtfreader.html) · [Markdown viewer](https://akingdom.github.io/markdown_tools/markdown_viewer.html) · [Markdown TOC](https://akingdom.github.io/markdown_tools/markdown_toc.html) · [HTML → Markdown](https://akingdom.github.io/markdown_tools/markdown_gfm_from_richtext.html) · [GitHub project list](https://akingdom.github.io/git-me/) · [YouTube comment formatter](https://akingdom.github.io/markdown_tools/markdown_to_youtube_comment_formatter.html) · [Duplicate Word Highlighter](https://akingdom.github.io/duplicate_word_highlighter/duplicate_word_highlighter.html) · [QR Code Generator](https://akingdom.github.io/design_tools/generate-qrcode.html) · [Colour Blender](https://akingdom.github.io/design_tools/color-blender.html) · [Image Focal Length](https://akingdom.github.io/design_tools/image_lens_distortion_tool.html)

- **System Tools**
  - [Password Generator](https://akingdom.github.io/system_tools/password_generator.html)


## Interests

- **Nature & Science** — Biology, geology, cosmology, physics.
  - [Venomous Bites & Stings](https://akingdom.github.io/articles/first_aid_venomous_bites_stings) · [Apollo 13](https://akingdom.github.io/articles/apollo13-review_apollo14-17) · [The Moon](https://akingdom.github.io/articles/moon)

- **Practical Thinking** — Philosophy, religion, psychology, mathematics, epistemology.
  - [Creative Thinking](https://akingdom.github.io/articles/creative_thinking_cycle) · [Aspiring Leadership](https://akingdom.github.io/articles/aspirational_leadership) · [Change Imperative](https://akingdom.github.io/articles/change_imperitive) · [Mathematics](https://akingdom.github.io/articles/maths) · [Discipline & Trauma](https://akingdom.github.io/articles/Trauma_and_Discipline_v2) · [Belief & Trauma](https://akingdom.github.io/articles/Trauma_and_Belief) · [Awareness & Healing](https://akingdom.github.io/articles/trauma_healing_and_awareness) · [Gifted People & GTD](https://akingdom.github.io/articles/Executive_Congestion) · [Power to Peace](https://akingdom.github.io/articles/Power_vs_Peace-Beyond_Jurisdiction) · [Peace, Integrity & Evidence](https://akingdom.github.io/articles/Peace_Integrity_and_Evidence) · [Architecture of Authority](https://akingdom.github.io/articles/Architecture_of_Authority-First‑Principles_Analysis_of_Governance)

- **Technology** — Embedded systems to complex networks.
  - [System Design Principles](https://gist.github.com/akingdom/bf3f498810a33e17f2d6d12425ef51ff) · [Local Web App Orchestration](https://akingdom.github.io/articles/Unified_Local_Orchestration_Architecture) · [Maintainable Web App Structure](https://akingdom.github.io/articles/structuring-class-based-single-file-apps) · *See AI section above*

- **History & Language** — Archaeology, etymology, genealogy, modern Greek, foreign films.
  - [Etymology](https://akingdom.github.io/articles/etymology) · [Shape Theory](https://akingdom.github.io/articles/ShapeTheory) · [Indigenous Peoples](https://akingdom.github.io/articles/indiginous-peoples) · [Japanese](https://akingdom.github.io/articles/Japanese) · [1820s Newspaper](https://akingdom.github.io/articles/the_times_1820_feb_09)

- **Food & Cooking** — Learning the art (and how not to burn water).
  - [Recipes](https://github.com/akingdom/food-recipes) · [Weight & Health](https://akingdom.github.io/articles/weight-health)

- **Creative Endeavors** — Reading, writing, UI, artwork, music.
  - [Music](https://www.youtube.com/channel/UCJAeF7xHIxwT8UwCKFxfwPQ) · [Art](art2/) · [Stereograph Tool](https://akingdom.github.io/design_tools/stereograph-swapLR+flipL.html) · [Cleopatra Visualisation](https://akingdom.github.io/articles/reconstructing_cleopatra_vii) · [AI Art](https://akingdom.github.io/art2/)
  - **Writing** — [On Writing](https://akingdom.github.io/articles/AK_on_writing) · [Jane Austen](https://akingdom.github.io/articles/AK_on_Jane_Austen) · [Micro Stories](https://akingdom.github.io/articles/microstorywriting) · [The Unsafe Saddle](https://akingdom.github.io/articles/microstory-The_unsafe_saddle) · [The Goose Bride](https://akingdom.github.io/articles/The_Goose_Bride)
  - **Software** — [Talking Clock](https://akingdom.github.io/talking_clock) · [Match Blocks](https://akingdom.github.io/matchblox) · [Code](https://gist.github.com/akingdom/09f1bef20fd0f601cbb2b8d504ef6f9c)


## My Philosophy

Technology should work for people, not the other way around. I approach every problem as a chance to listen, solve, and teach — patiently and without jargon.

> “Where possible, focus on things that are worthwhile.” — *Andrew Kingdom*

> “The fallback rule of systems success: always use the best tool for the job. Build tools to survive tougher jobs than anticipated and to fail safely when they break.” — *Andrew Kingdom*

> “If a lack of effort isn't the problem, more effort is not the solution. If we want to achieve more, we often need to do less.” — *Jessica McCabe*


<details>
<summary><strong>More quotes I live by</strong> (click to expand)</summary>

> A movie is never really finished, just released. — *Bonnie Arnold*

> If you're not embarrassed by your early work, you spent too long on it. — *Attributed to Neil Gaiman*

> The opposite of addiction is not sobriety but connection. — *Johann Hari*

> Even experts know less than 1% of everything that can be known about life, the universe and everything. — *Andrew Kingdom*

> Being an expert in one field does not guarantee expertise in another. — *Andrew Kingdom*

> No work is ever worth a divorce. — *Andrew Kingdom*

> You can't truly love others if you're not caring for yourself. It's like how airlines say, 'Put on your own mask first, then help others.' — *Andrew Kingdom*

> Intelligence has little to do with a person's value as a human. — *Andrew Kingdom*

> True life transformation isn't the fruit of human effort — it's not something owed or earnt — but a reliable divine gift, granted freely through grace. — *Andrew Kingdom*

> A.I. is a tool made by humans to assist humans; don't confuse it with actual intelligence. — *Andrew Kingdom*

> Un-deception is the successful resolution of misapprehension — changing your own mind concerning a misbelief. — *A. Kingdom on C.S. Lewis on J. Austen*

> I.Q. tests measure a narrow band of mental ability and generally exclude a person's full intellect, emotional quotient, physical intellect, spatial intellect, spiritual intellect, love, kindness, ethics, and mental alertness. — *Andrew Kingdom*

> Understanding emotional context improves decision-making and strengthens relationships. — *Andrew Kingdom*

> Use your connections to find the back door into an organisation rather than worrying about getting stuck in the front door. — *Temple Grandin*

> Add new technology only if it clearly reduces workload — each addition must simplify processes to offset the complexity it brings. — *Andrew Kingdom*

> Thoughts and ideas are like food — we need them to live, but there are junk thoughts and healthy thoughts. — *Andrew Kingdom*

> Computers (and thus AI) are mainly an aid to extend human thinking and memory. — *Andrew Kingdom*

> A person who struggles and moves forwards will generally go much further in life than a person who never had to struggle at all. — *Andrew Kingdom*

> Creating on a computer is like cooking in a kitchen: fairly pointless if no one eats the food. — *Andrew Kingdom*

</details>


## Let's Work Together

I'm open to freelance, consulting, and collaboration opportunities – remote or on‑site (Victoria, Australia). Here's how we create value together:

1. **You send a clear description** of your challenge (via [GitHub Issues](https://github.com/akingdom/akingdom.github.io/issues) – public, or we can take it private from there).
2. **I reply** and we have a no‑pressure chat.
3. **We agree on scope** – a small paid call, a project, or just a one‑off answer.

**What you can expect:** Straight talk, no hidden fees, and a focus on what actually moves the needle for your business. I don't do large‑scale corporate contracts or full‑stack web design – but I'm excellent at solving specific problems, building lightweight tools, and helping you think through complex technical decisions.

**Let's start with a conversation.** [Open an issue](https://github.com/akingdom/akingdom.github.io/issues) – tell me what's on your mind. No charge for the first discussion.

## Footnotes

- <sub>*Feedback*: Issues, discussion and initial contact requests can be raised via [*GitHub Issues*](https://github.com/akingdom/akingdom.github.io/issues).</sub>
- <sub>*Licensing*: This website repository contains content under different licenses. See [`LICENSE.txt`](./LICENSE.txt) for details.</sub>
- <sub><img src="https://avatars.githubusercontent.com/u/1809762?v=4" width="20" height="20"> My GitHub user icon: Quantum Computing with an artistic twist.</sub>
- <sub>(C) Copyright 2024 Andrew Kingdom. All rights reserved.</sub>

<!-- ALL SCRIPTING -->
<script src="js/pykelet.js"></script>
<script src="js/hide_github_title.js"></script>
<script src="js/random_quote.js"></script>
<script src="js/3rd_party/lunr.js"></script>
<script src="js/search.js"></script>
<script src="js/tawk_to.js"></script>
