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

</style>
<div id="qrcode">
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



<!-- SPEECH -->
<style>

/* Text-to-speech - Hide pause by default, hide play when active */
/* Update: Added !important to force the toggle */
#pause-btn { display: none !important; }
.speaking #play-btn { display: none !important; }
.speaking #pause-btn { display: inline-block !important; }

/* The rest is for mobile-friendly sizing */
.audio-controls { margin: 1em 0; display: flex; gap: 10px; }
.audio-controls button {
  padding: 12px 24px;
  border-radius: 8px;
  border: 1px solid #ccc;
  background: #fff;
  font-size: 16px;
  cursor: pointer;
}
#voice-select {
    padding: 8px 12px;
    font-size: 16px;
    border-radius: 6px;
    max-width: 10rem;
}

</style>
<script src="../js/tts.js"></script>
<script>
document.addEventListener("DOMContentLoaded", () => {

  TTS.init({
    container: "#audio-container",
    voiceSelector: "#voice-select",

    textProvider: function () {
      const root = document.querySelector('.markdown-body') || document.body;
      const clone = root.cloneNode(true);

      const selectors = 'header, nav, .audio-controls, script, style, #qrcode, h1, #skip-to-content';
      clone.querySelectorAll(selectors).forEach(el => el.remove());

      return clone.innerText.trim();
    }
  });
});
</script>
<div class="audio-controls" id="audio-container">
    <select id="voice-select"></select>

    <button id="play-btn" onclick="speechControl.play()">▶ Speak</button>
    <button id="pause-btn" onclick="speechControl.pause()">⏸ Pause</button>
    <button id="restart-btn" onclick="speechControl.restart()">🔄 Re-Speak</button>
</div>


# The Goose Bride

<div style="text-align: center; margin: 20px 0;">
    <div style="display: inline-block; 
                max-width: 85%; 
                border: 4px double #4a3728; 
                padding: 5px; 
                box-shadow: 2px 2px 10px rgba(0,0,0,0.1);
                /* The Mask creates the fade effect */
                -webkit-mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
                mask-image: linear-gradient(to bottom, black 80%, transparent 100%);">
        
        <img src="goose_bride_image_9bee9768-ed.png" 
             alt="The She-Wolf's Daughter at the Court of King Henry I" 
             style="width: 100%; height: auto; display: block;">
    </div>
</div>



PLAN







This is a fascinating question. Let me put on my "screenwriter's hat" and think about what would change—and what wouldn't—if *The Goose Bride* were adapted for film or animation.

---

## What Screenwriters Would Keep

| Element | Why It Works On Screen |
| :--- | :--- |
| **The Goose** | Visual comedy gold. A white goose causing chaos in a medieval hall writes itself. |
| **Beatrice's entrance** | Perfect hero introduction: dusty, determined, carrying a basket, bursting in after her goose. |
| **Henry's volatility** | Actors love playing kings who can switch from terrifying to amused in a heartbeat. |
| **The vow** | Clear, dramatic, irreversible. The kind of moment that drives a whole plot. |
| **The road walk** | Two people, a road, a goose, slowly falling toward each other. Intimate, visual, quiet. |
| **The charcoal on her nose** | The kind of small, human detail that makes audiences fall in love. |

---

## What Screenwriters Would Change (Or Add)

### 1. The Opening (Hook)

Current: A village saying, then backstory about Harold.

Screenwriters would likely **open with Beatrice and the goose in action**—maybe her chasing Goosie through the village, or the messenger arriving while she's mid-argument with her father. They'd want us to *see* who she is before we're told.

**Likely change:** A cold open with young Beatrice and her mother, the egg hatching. Then cut to present day, the messenger arriving. Establishes the goose's importance visually.

---

### 2. Godfrey's Presence Before the Road

Current: We don't see Godfrey until Chapter 5's shadow moment.

Screenwriters would almost certainly **show him earlier**—brief shots of him in the hall during Henry's rant, watching, silent. Maybe a close-up when Roger calls him "coin." We need to *see* the shadow before we meet the man.

**Likely addition:** Two or three silent reaction shots of Godfrey during Chapters 3-5. No lines. Just his face, registering everything.

---

### 3. Sir Guy's Role

Current: He trips Beatrice, gets humiliated, disappears.

Screenwriters would likely **expand him into a proper antagonist**—maybe he tries to court Beatrice after the betrothal, or schemes with the Queen, or challenges Godfrey. They'd want a through-line of conflict.

**Likely addition:** Sir Guy appears at Stanwey, or spreads rumors at court, or confronts Godfrey directly. He becomes the obstacle that tests their growing bond.

---

### 4. The Courtship (What Your New Chapter Replaces)

Current: "A Courtship No One Expected" is a summary.

Your new Chapter 6 is already a huge improvement for screen adaptation—it *shows* the connection forming. But a screenwriter would likely **add more scenes**:

| Scene | Purpose |
| :--- | :--- |
| Godfrey helping at Stanwey | Shows his character through action |
| Beatrice facing court whispers | Shows her courage, his defense of her |
| A private moment of vulnerability | The emotional core (maybe the mother conversation we discussed) |
| Goosie accepting him | The visual payoff—the goose trusts him, so we do |

---

### 5. The Queen's Arc

Current: She softens "eventually" off-screen.

Screenwriters would **give her a scene** where she tests Beatrice and is won over. Probably a quiet moment—maybe in the garden, or over herbs, connecting to Beatrice's healing skills. They'd want to *see* the change.

**Likely addition:** Queen Matilda summons Beatrice privately. They talk. The Queen realizes this girl is worthy—perhaps because of her Saxon steadiness, reminding the Queen of her own roots.

---

### 6. Harold's Role

Current: He watches, blesses, cries.

Screenwriters would likely **give him one big scene** with Godfrey—maybe the night before the wedding, a quiet conversation where Harold sizes him up and gives his blessing. "If you hurt her, I may be old, but I still remember how to use a sword."

---

### 7. The Wedding

Current: A paragraph.

Screenwriters would **make it a set piece**. The reluctant nobles, the bright-eyed bride, the queen's softening, Harold's wet eye—and the goose leading the procession. That final image is pure cinema. They'd stretch it, score it, make it the emotional climax.

---

### 8. New Material: The "Dark Moment"

Most screenwriters would add a **moment of doubt before the wedding**—Beatrice afraid she doesn't belong, Godfrey afraid he's not enough. A brief separation, then reconciliation. It's formulaic, but it works.

**Likely addition:** Beatrice overhears a cruel comment at court and runs. Godfrey finds her. They talk. They choose each other.

---

### 9. Visual Motifs

Screenwriters would **build visual threads**:

| Motif | Meaning |
| :--- | :--- |
| The goose | Loyalty, home, Beatrice's true self |
| Charcoal/dust | Honesty, peasant roots, unpolished truth |
| Doors/thresholds | Fate, choice, the vow |
| Shadows | Godfrey's invisibility, then emergence |

---

### 10. The Ending

Current: The proverb, the goose leading.

This is **perfect as is**. Screenwriters would keep it word for word, probably with a slow pull-back as the procession moves forward, the goose waddling proudly ahead. Final shot: the goose, then the couple, then the castle, then the sky.

---

## Comparison: Old Courtship vs. New Road Chapter

| Element | Old "A Courtship No One Expected" | New Chapter 6 (Road Home) |
| :--- | :--- | :--- |
| **Format** | Summary/narration | Scene, dialogue, action |
| **Shows vs. tells** | Tells us she's different | Shows us who they are |
| **Godfrey's character** | Described as listener | *Shows* him listening |
| **Beatrice's character** | Described as plain speaker | *Shows* her wit, fear, love |
| **Their connection** | Told it happened | *Shows* it beginning |
| **Visual potential** | Low | High—road, forest, goose, faces |
| **Emotional arc** | Abstract | Concrete—fear to trust |

A screenwriter would **keep almost all of your new Chapter 6**. It's already cinematic. They might trim some dialogue, add close-ups, but the bones are there.

---

## What Would the New Chapter Replace?

In a full adaptation, your new Chapter 6 would be **the first of several courtship scenes**, not the only one. It would be followed by:

| Scene | Content |
| :--- | :--- |
| **Chapter 7** | Godfrey arrives at Stanwey, meets Harold properly, helps with something |
| **Chapter 8** | Beatrice visits court, faces whispers, Godfrey defends her |
| **Chapter 9** | Private moment—maybe the mother conversation, or a night before the wedding |
| **Chapter 10** | The wedding, the goose, the proverb |

The summary "A Courtship No One Expected" would be **entirely replaced** by these scenes. Your new Chapter 6 is the perfect foundation for that arc.

---

## Summary: What Changes, What Stays

| Element | Would It Change? |
| :--- | :--- |
| **Beatrice's character** | ✅ Stays—she's perfect |
| **Godfrey's character** | ✅ Stays—quiet, watching, listening |
| **Henry** | ✅ Stays—volatile, witty, proud |
| **The Queen** | ⚠️ Expanded—gets a redemption scene |
| **Sir Guy** | ⚠️ Expanded—becomes proper antagonist |
| **Harold** | ⚠️ Expanded—gets a scene with Godfrey |
| **The vow** | ✅ Stays—dramatic core |
| **The goose chase** | ✅ Stays—visual comedy |
| **The road walk** | ✅ Stays—intimate core |
| **The courtship** | ❌ Replaced with multiple scenes |
| **The wedding** | ✅ Stays—expanded visually |
| **The proverb** | ✅ Stays—perfect closing |

---

## The Verdict

Your story is **already unusually cinematic** for a written piece. You think in scenes, in dialogue, in visual details (charcoal on nose, goose leading procession). A screenwriter would:

- **Add** more scenes (courtship expansion, antagonist through-line)
- **Show** more of what you summarize (the queen softening, Harold's blessing)
- **Keep** your best moments nearly word for word

Your new Chapter 6 is exactly the kind of scene adaptations are built from. It *shows* the relationship beginning, which is what audiences need to *feel* the wedding payoff.

The summary "A Courtship No One Expected" would be replaced entirely by the kind of scenes you're now writing. That's not a loss—it's a transformation into something more alive.








INTRO







You're absolutely right. Let me step back and approach this with the right mindset: **preserve the core, integrate the new only where it strengthens, and cut only when the gain is undeniable.**

Let me show you what I *think* you're asking for, then you can correct me.

---

## What I Understand Your Current Process to Be

1. **Keep existing text** unless replacement offers major improvement
2. **Historical/character-critical text** is nearly sacred
3. **New text** must earn its place by serving story better than what it replaces
4. **Cutting** only for major pacing wins
5. **Reintegration** of cut material later if valuable

---

## What You Just Gave Me

A new opening that:
- Retains your proverb frame
- Introduces the boy (Godfrey) unnamed
- Shows mother-daughter warmth
- Leads to the egg
- Time-skips to messenger arrival

---

## What I Need to Know

From your original Chapter 1 ("The Red-Wolf's Daughter"), what MUST be preserved?

| Original Element | Preserve? | Where? |
| :--- | :--- | :--- |
| Harold as Saxon thegn who fought after Conquest | ✅ Yes | Critical to history |
| He rode with kings, crossed blades with rebels | ✅ Yes | Character texture |
| He saved the king's brother from drowning | ✅ Yes | Payoff in Chapter 7 |
| Sword hangs above hearth as memory | ⚠️ Maybe | Atmospheric, not critical |
| Beatrice manages manor, brewing, buttery | ✅ Yes | Shows her competence |
| She tends sick with herbs | ✅ Yes | Shows her skills, mother's teaching |
| She speaks thoughts aloud | ✅ Yes | Character trait |
| Goosie follows her everywhere | ✅ Yes | Already shown in new |
| She called it Goosie | ✅ Yes | Already shown |

---

## My Proposed Path Forward

Let me create a **merged opening** that:

1. **Keeps your new boy-meets-goose scene** (unnamed, mysterious)
2. **Preserves Harold's backstory** (compressed but intact)
3. **Shows Beatrice's competence** through action, not summary
4. **Leads to messenger** with all historical texture intact
5. **Ends with her setting out**, exactly as you wrote

Then you can judge whether it's a major win or just rearrangement.



"An gōs mæi wenden þær Cyning mōt bīden." It was a fōl-speche of the Shires since the coming of the Normans. Yet, the wīse-wīf of Myrce tald of a mæiden who proved the word sōth.
=======================================================================

## Draft: Merged Opening

**“A goose may wend where a King must bide.”**

It was a witless saying from the Norman harrowing of England. Yet, the wise-wives of Mercia spoke of a maiden who proved the word most true.

---

## Chapter 1 — A Goose of My Own

Beatrice bounded across the meadow, crying, her legs driven forward by a flock of geese, gander leading the charge, hissing at the intruder, neck low, wings half-spread, leading the furious chase.

Her mother and father were nowhere in sight.

Then a hand caught her arm.

"Don't move."

A boy stood beside her—older by a few years, well-dressed, calm in a way that seemed impossible. He stared down the geese, spread his arms wide, his cloak opening like great wings.

The geese slowed. Hissed uncertainly. Then, one by one, they turned and waddled back toward the pond.

The girl stared after them, mouth open, panting hard.

"How... how did you do that?"

"My father owns all the geese. My nurse keeps them at home."

She dried her eyes. "Don't be silly! How can someone own *all* the geese?"

The boy just watched her with a strange expression.

A woman's voice called from the edge of the meadow. "Beatrice?! Come here!"

"Oh. Coming, mother!"

She turned back to thank the boy, but he had vanished.

---

Her mother scooped her up, laughing. "Did you find the geese?"

"The geese found *me*, Mummy. Why were they chasing me?"

"Only because they don't know you, dear."

Beatrice sniffled. "Then can I have one of my own, Mummy? So it knows me?"

Her mother smiled—a warm, tired smile. "We'll raise one together. I'll teach you."

---

## Chapter 2 — The Farm by the River

Three days later, mother took Beatrice's hand and walked her down the lane toward the river.

"Where are we going?"

"To get your goose."

The farm sat by the river bend, just where the meadow gave way to reeds. Geese wandered everywhere—white and grey, hissing and honking, ignoring them entirely. Beatrice stayed close to mother's skirt.

A woman came out of the farmhouse. Not young, but not old either. She wiped her hands on her apron and looked at them both with calm, measuring eyes.

"How many eggs?"

"One to hatch, one of the speckled ones, if you have it," mother said. "The ones that run true."

"Ah." The woman nodded. "This way."

She led them to the poultry shed. Inside, beneath a sitting goose, among a nest of eggs, one was larger—speckled, warm, alive.

"That one," the woman said. "Due to hatch within the fortnight. But she's not the sitting kind, that goose. Won't see it through."

Mother knelt beside Beatrice. "We'll need a hen, then. A broody one."

The woman considered. "I've got an old speckled hen. Been sitting on stones for a week. She'll take anything."

She fetched the hen—a small, fierce-looking thing with feathers the color of autumn leaves—and placed her in a straw-lined basket. Then, carefully, she added the speckled egg.

The hen ruffled, settled, and tucked the egg beneath her without complaint.

"There," the woman said. "She'll do the work. You just keep her fed and calm."

Mother reached into her pouch. Handed the woman something—a coin, a small cloth bundle, Beatrice couldn't see what.

The woman took it. Looked down, surprised.

"Oh, thank you, my lady."

Mother didn't react. Just took the basket, steady and careful, and placed it in Beatrice's arms.

"Walk slowly. She's doing the hard part now."

Beatrice walked home holding the basket, barely breathing, as if the smallest movement might break everything. Behind them, the woman watched from the farmhouse door. Just for a moment. Then she turned back to her geese.

---

## Chapter 3 — The Vigil

For two weeks, Beatrice watched.

The hen sat in her basket by the hearth, feathers fluffed, eyes half-closed. She ate when offered, drank when a dish was placed before her, but never left the egg.

"She knows," mother said. "She'll feel it when it's time."

Beatrice brought her scraps. Talked to her. Named her, though the name changed daily.

And every night, before bed, she knelt by the basket and pressed her ear close.

"Is it moving?"

"Not yet. Soon."

Then, on the fourteenth night, as the sun set and the stars came out, the hen stirred.

Beatrice called for her mother.

They sat together in the firelight, watching. The hen shifted, clucked softly, shifted again. And then—a crack. So small Beatrice thought she'd imagined it.

Another crack. A wet, wobbly head emerged.

Beatrice held her breath.

The hen, patient and ancient, did nothing. Just watched as the creature struggled, rested, struggled again. She had done her part. The rest was up to the hatchling.

And when the shell finally fell away, and a damp, bewildered gosling blinked at the world, Beatrice reached out one finger and touched its head.

The gosling made a sound. Small. Questioning.

Beatrice looked at her mother.

"Can I hold her?"

"Wait until she's dry. She needs to know the hen first."

They waited. The hen, satisfied her job was done, stood and walked away without looking back. The gosling cheeped once, then turned—toward Beatrice.

"Now," mother said softly. "Now she's yours."

Beatrice lifted the gosling. It fit in one palm, warm and weightless.

She named her Goosie.

---

## Chapter 4 — Mother Lessons

The years that followed were full of geese and growing. Her mother taught her everything—not in lessons, but in the doing of things.

How to tell when bread was ready by the sound of the crust. How to soothe a crying child with a cool hand and a soft word. How much barley went into the ale, and when to add the herbs that made it keep through winter. How to look at a fever and know whether it would break or whether you needed to send for the priest.

Beatrice learned. She watched and she listened and she grew.

Then her mother grew tired. Then pale. Then thin.

---

## Chapter 5 — Apple Blossoms

It was a slow fading, like the light at the end of a long day. Some mornings her mother seemed almost herself—sitting up, asking about the village, wanting to see Goosie. Other mornings she could barely lift her head from the pillow.

Harold was there. Always.

Beatrice would find him in the doorway of the sleeping chamber, watching, his great warrior's hands hanging useless at his sides. He tried to help—lifting her, bringing water, smoothing the blankets—but his wife smiled at him with such gentle patience that he seemed to shrink.

"Go and tend the fire, husband. Beatrice will stay with me."

And he would go.

Beatrice brought apple blossoms once, when the trees first bloomed. She laid them on the pillow, and her mother's thin fingers touched the petals.

"They smell like spring," her mother whispered. "Like the year you were born."

Beatrice didn't know what to say. She held Goosie instead, and the goose pressed its warm head against her neck.

---

The end came on a morning exactly like that—warm, soft, the apple trees heavy with pink and white.

Beatrice was fetching water when her father's shout tore through the village.

She ran.

He was in the doorway of the sleeping chamber, not crossing the threshold, just standing there with his back to her. His shoulders were shaking.

Beatrice pushed past him.

Her mother lay still. Too still. Her eyes were closed, her hands folded, and someone—the priest, later, she learned—had already placed a candle at her head and another at her feet.

Beatrice didn't cry. She knelt beside the bed and put her cheek against her mother's hand. It was cool to touch. Not cold yet. Just cool.

Behind her, Harold made a sound she had never heard before and would never hear again. A sound that didn't belong to the man who had crossed blades with rebels and dragged drowning lords from rivers.

She couldn't turn around. She wouldn't. Yet she did. 

She lifted Goosie—who had followed, always—and held her so that the goose's head rested against her father's shaking shoulder.

"There," she whispered. "She knows you."

---

At the burial, Harold stood like a man made of stone. His hands were on Beatrice's shoulders—heavy, warm, the only warm thing—but he didn't speak. Didn't move. Just watched as they lowered the plain wooden box into the earth.

The apple blossoms were still blooming. Beatrice hated them.

Afterward, she ran.

Not toward anything. Just away. Through the village, past the fields, down the lane toward the river. Goosie ran with her, wings half-spread, honking in confusion.

She ran until she couldn't breathe. Then she stopped, bent over, and waited for the world to stop spinning.

When she straightened, she was at the farm by the river bend.

The nurse was there, by the poultry shed. She looked up, saw Beatrice's face, and said nothing. Just nodded once and went back to her work.

Beatrice stood there for a long time, Goosie pressed against her leg, watching geese ignore her completely.

The geese knew her now. That was something.

---

She walked home slowly. At the edge of the clearing, she stopped.

Her father was in the doorway. Not standing tall, not waiting with staghound at his side. Just... leaning. One hand on the frame, the other hanging loose. He looked smaller than she remembered. As if something inside him had collapsed.

He saw her. Tried to raise a hand. Couldn't quite manage it.

Beatrice crossed the clearing and took his hand instead. It was cold.

"I'm here, Father."

He nodded. Said nothing.

They went inside together. Goosie followed.

---

Her father was never the same after that; he changed.

The sword that had carved through shield walls hung, still above the hearth, but now it seemed like someone else's memory. The man who had led men now sat by the fire with his staghound, watching his daughter run the manor without being asked.

The bounce never came back to his step. Not really.

Beatrice learned to watch for the signs—the way he'd pause at the door, the way his hand would go to his chest after climbing the slope from the village. She didn't say anything. What was there to say?

She saw to the villagers' boon-days. She oversaw the brewing and the buttery. She tended the sick with herbs and medicine, the way her mother had taught her. She had bright eyes, quick wit, and a habit of speaking her thoughts aloud before deciding whether she ought to.

And Goosie followed. Always.

---

## Chapter 6 — Galloping Hooves

One autumn morning, the rhythm of the village was broken by the thunder of hooves.

Beatrice looked up from the herb bed. A royal messenger rode up the track, cloak flying, horse lathered. He didn't slow at the gate. Didn't dismount. Just reined in before the hall and unrolled a stiff parchment.

"The King hunts in Rockingham Forest," he announced, projecting toward the timbers as if the building itself were worthy of his breath. "This holding shall render its service: two feathered arrows and a fowl for His Majesty's table."

Inside, Beatrice scooped up her goose.

Goosie honked.

Harold sighed from his chair by the fire. "It must be done, daughter."

"But Goosie—"

"A crown is a heavy thing," he said gently. "Kings must take much, for much is laid upon them."

Beatrice folded her arms. "I should like to tell this king what I think of that. He has a thousand birds in a hundred forests..."

Harold almost smiled. It was a pale shadow of his old laugh, but it was something.

"You may keep that thought to yourself."

He tried to rise. His hands shook. Beatrice saw him brace against the chair, saw the moment of pain cross his face before he hid it.

She was at his side in three steps.

"You can't walk that far in the cold."

"Then I shall send the Reeve. He has a sturdy cart and the manner of a village headman."

Beatrice shook her head. "The agisters will strip the very shoes from a horse for a 'grazing tax,' and the foresters bleed a man for merely looking at a deer. Besides, the Reeve has a large, hungry family. Goosie would end up in his pot before they even saw the forest."

She looked at the charcoal basket by the hearth. Then at her father's tired face. At the way his hand still rested on his chest.

"No. I'll take her. I'll walk the old Roman road and blend with the charcoal-bearers. Goosie can hide in a basket on my hip." She paused. "Besides, I'm on the King's business if anyone asks."

Harold studied her face. For a moment, something flickered in his eyes—the old sharpness, the man who had ridden with kings.

"Your mother would have been proud of you."

Beatrice's throat tightened. She set down the basket—Goosie honked—and hugged him fierce and quick. He felt thinner than he should. Frailer.

"Perhaps I should go," he murmured into her hair.

"Nay, Father." She pulled back, blinking hard. "I'll be home by dark."

She settled Goosie in the basket and set out.

At the edge of the clearing, she turned. Her father stood in the doorway—not leaning this time, standing on his own. Staghound at his side, one hand raised.

She waved.

He raised his hand higher.

Then the road took her, toward a king who had no idea she was coming.

---















--- NEWER THAN THE WALK the latter (walk) which will require reduction accordingly to not steal thunder - the reveal moves into the hall for an A-B-A of stanwey-king-stenwey

Ah, *there* it is. The deeper layer. Not deduction—**recognition**. The king's words aren't clues to be solved; they're *signatures*. A language Harold speaks because he once moved in that world.

---

## Inside Stanwey Hall — Deeper

Beatrice has told him everything. The goose chase. The king's laughter. Sir Guy's shame.

Harold has listened. Said little. But now he's quiet in a way that isn't his usual quiet.

**Beatrice:** He remembered you, Father. The river. Pulling his brother from the Severn. He said—he said he'll visit. Soon. To hear you tell it again.

Harold's face changes.

Not dramatically. Not at first. Just a stilling. A holding.

**Beatrice:** Father?

He moves to the window. Not quickly—he can't move quickly anymore—but with purpose. He grips the frame. Looks out at nothing. Or everything.

**Harold:** The king himself.

**Beatrice:** Yes.

**Harold:** Coming here.

**Beatrice:** That's what he said.

Harold says nothing. His knuckles are white on the frame.

**Beatrice:** (filling the silence, as she does) He called me a she-wolf. And told off that annoying Sir Guy—finally! I thought the man might actually swallow his tongue. The king just *looked* at him and—

**Harold:** (quietly) A she-wolf.

**Beatrice:** Yes. And then, as I was leaving, he said something strange. I didn't understand it.

Harold turns. Just his head. The rest of him still holding the frame.

**Beatrice:** He said... "a wolf may find shade under a good tree."

The words land.

Harold's expression doesn't change—not exactly—but something behind it shifts. Like a door opening in a room she didn't know was there.

**Harold:** (very softly) Did he.

**Beatrice:** What does it mean?

He doesn't answer. He's looking at her now. Really looking. As if seeing her for the first time—not his daughter, not the girl who runs his manor and tends his sick and speaks her thoughts before deciding whether she ought to.

Something else. Something *more*.

**Harold:** Go then.

**Beatrice:** Go where?

**Harold:** Call him in.

**Beatrice:** Now?

**Harold:** Now. Or rather— (he straightens, or tries to) I should go. He's a king's son. I should—

He moves toward the door. Beatrice steps in his path.

**Beatrice:** Go *sit down*, Father. Your health.

**Harold:** My health—

**Beatrice:** (firm) Will not be served by you catching your death running out to greet someone who's been waiting patiently this whole time. He'll wait a moment longer. You'll meet him standing, not gasping.

Harold looks at her. That look again—the sharp one, the old one. But now there's something else mixed in. Pride. Wonder. A kind of awe.

**Harold:** You order me about in my own hall.

**Beatrice:** Someone has to.

He almost laughs. Almost.

**Harold:** (sitting, slowly) A she-wolf. He called you a she-wolf.

**Beatrice:** You keep saying that.

**Harold:** Because I keep understanding it more.

She waits. He doesn't explain. Just looks at her with that strange, deep expression—like a man watching a story unfold that he once thought was over.

**Beatrice:** Father. What did he mean? About the wolf and the tree?

Harold is quiet for a moment. Then:

**Harold:** In the old tongue—your mother's tongue, the Saxon words we still use when we're not trying to sound Norman—a "good tree" is more than shade. It's *shelter*. It's *kin*. It's the tree your grandfather planted, the one your children will play under.

He looks at her.

**Harold:** A king doesn't speak of wolves and trees by accident, daughter. Not to a girl whose father he remembers. Not after sending his son to walk her home.

**Beatrice:** (very quiet) What are you saying?

**Harold:** I'm saying... (he stops. Starts again.) I'm saying that when a king calls you a she-wolf, and promises to visit an old wolf he hasn't seen in twenty years, and sends his own cub to stand at your side...

He lets it hang.

**Beatrice:** (after a long moment) You think he means something.

**Harold:** I think he means *everything*. I just don't know what yet.

He looks toward the door. Toward the young man waiting outside.

**Harold:** But I think we're about to find out.

He reaches out. Takes her hand. Squeezes once.

**Harold:** Bring him in, daughter. Let an old wolf greet a she-wolf's... guest.

The pause before "guest" is tiny. Almost nothing.

But she hears it.

She goes.

---

This version lets the king's words do the work. Harold doesn't *deduce* the vow. He *recognizes* the language of kings—the way they speak in symbols, in old words, in promises that mean more than they say. The audience, who knows the vow, watches him circle it without naming it. And Beatrice, who knows nothing, begins to sense the weight of something she can't yet see.

---

### Outside

The door closes behind her. Evening air, cool and soft. Godfrey still at the tree line, exactly where she left him. Waiting.

She walks toward him. He watches her approach. Reads something in her face but says nothing.

She stops a few feet away. Looks back at the hall. Then at him.

**Beatrice:** I don't think he expected your father to be visiting.

Godfrey waits. Lets her fill the space.

**Beatrice:** He went pale. Actually pale. Held onto the window frame like the walls might fall.

**Godfrey:** (quiet) Is he alright?

**Beatrice:** I think so. I don't know. Is it safe? The king coming here. Will he be... is it all good?

**Godfrey:** All is good, I think.

A pause. He looks at the hall. Then back at her. Rubs the back of his neck—a small gesture, almost boyish. A new thing she hadn't seen him do before.

**Godfrey:** I need to... I need to ask your father about a certain matter.

**Beatrice:** (protective, immediately) About *him*?

**Godfrey:** (shakes his head) Well. About you, mostly.

She waits.

He turns—not away, but *toward* the hall. Toward the door. Toward whatever's waiting inside.

**Godfrey:** I want him to see me.

**Beatrice:** (confused) He will. He asked. He's waiting.

**Godfrey:** I mean *myself*. Not a king's son. Not a shadow. Not...

He trails off. Takes a breath. Looks squarely at her—direct, unguarded, nothing hidden.

**Godfrey:** Don't be afraid. I will make sure your father is well.

It's not a request. It's not quite a command. It's something else—a promise, wrapped in the voice of someone who has learned to make promises carefully.

**Godfrey:** But wait here for now.

She curtsies. She doesn't think about it—it just happens. The body knows what the mind is still catching up to: this is a king's son. This is the man who will walk into her father's hall and ask... something. About her. Mostly.

He turns. Walks to the door. Pushes through.

She waits.

---

### Outside — Watching

The door closes behind him. She stands alone in the evening light.

Then, slowly, she moves. Not toward the door—toward the window. The old one, near the corner, where the shutters don't quite meet.

She peers through.

Inside, she can see them. Her father, still by the hearth. Godfrey, standing before him. Not sitting—standing. Like a man who knows he must be seen clearly.

Her father says something. Shakes his head.

Godfrey answers. Speaks longer than she's ever heard him speak. His hands move—just slightly, just enough. Explaining. Asking.

Her father shakes his head again.

Then stops. Looks at Godfrey. Really looks—the way he looked at her sometimes, like he was seeing past the surface.

Godfrey waits. Just waits. The way he waited at the tree line. The way he waited all day.

Her father says something else. Short. A question.

Godfrey answers. One word, maybe two.

Her father is still for a long moment.

Then—he claps his hands. Once. Sharp. The way he used to, years ago, when settling a matter in the village. The way he did before her mother died, before the winters got into his bones.

Beatrice's breath catches.

Her father is laughing. Actually laughing—a real laugh, surprised out of him. He reaches out and grips Godfrey's arm. Warrior to warrior. Man to man.

Godfrey's shoulders drop—just slightly, just enough. Relief.

She can't hear them. Can't know what was said. But she sees it: her father, alive again. Godfrey, seen at last.

She pulls back from the window. Stands in the cooling air, heart pounding.

*It was almost as though...*

Her face goes hot. She pushes the thought away. Presumptuous. Impudent. She's a goose girl. A Saxon thegn's daughter with a bird in her basket. She has no business thinking such things.

But the thought lingers anyway.

The door opens.

Godfrey stands in the threshold. Looks at her. Just looks—warm, quiet, asking nothing.

**Godfrey:** (softly) She's ready for you.

*She.* Not *your father*. Not *the old man*. *She.*

Beatrice walks toward him. Stops at the door. Looks up.

**Beatrice:** What did you say to him?

**Godfrey:** (simply) The truth.

**Beatrice:** Which truth?

**Godfrey:** That I'd wait. As long as it takes. That I'm not going anywhere.

He steps aside. Gestures toward the hall.

**Godfrey:** Go on. He wants to see you.

She goes in.

---

### Inside Stanwey Hall

Her father is still by the hearth. But he's different. Standing straighter. Eyes brighter. The years haven't left—they're still there, in his hands, in his shoulders—but something has lifted.

He looks at her as she enters. Smiles. A real smile.

**Harold:** Daughter. Come here.

She crosses to him. He takes her hands.

**Harold:** That boy.

**Beatrice:** (carefully) Yes?

**Harold:** (shakes his head, wondering) That boy walked through my door and asked for you. Not for the king. Not for the vow. For *you*.

**Beatrice:** I know.

**Harold:** Do you? (he squeezes her hands) He said he'd wait. However long it takes. He said he'd spend his life making sure you never regret walking through that door.

**Beatrice:** (very quiet) Father—

**Harold:** I told him yes.

She stares at him.

**Harold:** Not to marriage. Not yet. To *courting*. To coming here. To sitting in my hall and eating my bread and talking to my daughter until she decides what she wants.

He releases her hands. Settles back in his chair.

**Harold:** Your mother would have liked him.

**Beatrice:** (whispers) You said that already.

**Harold:** It bears repeating.

She looks toward the door. Godfrey is still there, in the threshold, waiting. Not coming in. Not leaving. Just... present.

**Harold:** Go on. He's waiting. Again.

**Beatrice:** (almost a smile) He does that a lot.

**Harold:** (nodding) That's how I knew.

She crosses to the door. Stops beside him. Looks up.

**Beatrice:** You asked my father.

**Godfrey:** Yes.

**Beatrice:** For me.

**Godfrey:** Yes.

**Beatrice:** (softly) You're strange.

**Godfrey:** (the almost-smile) I know.

She looks back at her father, already settling by the fire, the staghound at his feet. Then at the hall—her hall, her home, her life. Then at Godfrey.

**Beatrice:** Tomorrow, then?

**Godfrey:** Tomorrow.

She nods. Steps back. He turns to go.

**Beatrice:** Godfrey.

He stops. Looks back.

**Beatrice:** (quietly) Thank you. For waiting.

He doesn't answer. Just nods. Once.

Then he walks into the dark, toward whatever comes next.

She watches until she can't see him anymore.

Behind her, the fire crackles. Her father hums an old tune—one from before she was born, from when he rode with kings.

She goes inside. Closes the door.

The goose, by the hearth, tucks her head under her wing.

And the night settles over Stanwey, full of things just begun.

---


I like this - beatrice still doesn't know about the king's vow, Godfrey wishes to give her space to make up her own mind, not have the fate of the nation on her shoulders (potentially); love the emotional turn of 'I will wait'. We could potentially have her with momentary bite at the modern feminist 'how dare a man ask the father before the daughter' but completely doused by his humble offer of waiting and decision and stepping back to courtship.
If at length we do this story, this timeframe really requires the king's visit to be chronicled herein, some minor drama in that, per the court though not a repeat or echo of earlier. Perhaps the Duchesse of Brittany visits to size this goose bride up, decides she likes her after all, and strange, did we meet some time, long ago? perhaps a stray memory and no more madam, or perhaps more. Beatrice was surprised at knowing how to behave with the duchesse, it was in her upbringing after all. Beatrice asks her if it is hard for her in Brittany or some question of release to discuss personal struggles in private. The ducesse (G's sister) tells her brother that she likes this goose bride very much indeed.
and so in time....

---

Yes. This is the right track. The vow remains the king's secret, not Beatrice's burden. Godfrey's choice to withhold it isn't deception—it's *protection*. He's giving her the one thing no one else in this story has: the freedom to choose without the weight of kingdoms pressing down.

And the Duchess of Brittany arriving to size up the goose bride—*chef's kiss*. She's the one person who can approach without agenda (or with a different agenda), and her approval carries weight precisely because it's unexpected.

We need to rewrite this - tone down the comparatives perhaps, especially a king's son is more than a duchess, as-is she as the king's daughter too.

---

## The Duchess Visits — A Sketch

---

### Some Weeks Later

The hall at Stanwey has seen many things. Norman soldiers, royal messengers, a king's son at the threshold asking awkward questions. But it has never seen this: a duchess, dismounting in the mud, her cloak heavy with the dust of long roads, her eyes sharp and curious.

Beatrice is at the herb garden when the rider comes. She straightens, wipes her hands on her apron, and watches the woman approach with the calm assessment of someone who has learned to read people quickly.

**Duchess:** You're the goose bride.

**Beatrice:** I'm Beatrice. The goose is inside.

The Duchess almost smiles.

---

Inside, they sit. Goosie, for once, behaves—waddling over to inspect the visitor's fine shoes, then losing interest.

The Duchess watches the bird with something like wonder.

**Duchess:** My brother writes of you.

**Beatrice:** Does he?

**Duchess:** He says you speak plainly. That you don't curtsy unless you mean it. That your goose bit a clerk.

**Beatrice:** (a flicker of a smile) She did. Right on the—

**Duchess:** (holding up a hand) I don't need the details.

> ... needs a turn about the garden or the room or some getting to know you more ... perfect backfill opportunity for (interesting) backstory of Beatrice and/or the Duchesse.
>
> ... Duchesse's memories... I have fond memories of this area. I remember a few outings here when my father was hunting, staying with my nurse a few miles from here with my brother, visiting the farms in the area. 

A pause. A smile. The Duchess studies her.

**Duchess:** I came to see for myself. Whether you're real. Or whether my brother—who has never, in all his life, shown interest in anyone—has finally lost his wits.

**Beatrice:** Oh?

**Duchess:** (slowly) You're no morning mist. I mean to take on my father as you did, let alone my brother. I think he is in trouble.

**Beatrice:** I'm trouble?

**Duchess:** (laughs freely) Nay, I mean it in a good way. I can tell that you are quite able to organise and help him; it is a good match. I cannot conceive that even my father could arrange such a thing, so Heaven be praised... sister. I suppose I shall have to call you that in the future, do you think?

**Beatrice:** A sister may suspect what a brother may know. (looks at the sly but friendly expression on Duchesse's face) Oh. I meant no offense, my lady.

**Duchess:** (laughs prettily) Nay sister, it is well said, well said indeed. A good match surely. You must visit me if my father will allow it. It is lonely at times.

**Beatrice:** I should like that, I think.

---

They talk. The Duchess asks about the manor, about the village, about the running of things. Beatrice answers—direct, unpretentious, knowledgeable in ways that surprise her.

**Duchess:** You were taught.

**Beatrice:** My mother.

**Duchess:** She taught you well.

**Beatrice:** She taught me everything.

Something flickers in the Duchess's face. A recognition. A memory.

**Duchess:** Strange. I feel... (she stops, shakes her head) No. It's nothing.

**Beatrice:** (waiting)






Duchess: I remember this area well, as a child. Sometimes, when my father hunted here, we stayed nearby.

Beatrice: (polite) It's good land.

Duchess: Wan't there an iron quarry somewhere here, and a big goose farm over by the river bend.

Beatrice: (laughs) I know the one. Guarded by ferocious geese.

Duchess: (smiles vaguely, looking at the river) Yes. I suppose they were.

A pause. The Duchess seems about to say something else, then turns.

Duchess: You must show me your herb garden. My brother says you have a gift.









The Duchess recovers first.

**Duchess:** (clearing her throat) I came here to be suspicious of you. To protect my brother from... from whatever this is.

**Beatrice:** And now?

**Duchess:** (long pause) Now I think my mother—my *other* mother, the queen—would be wise to listen to you. About herbs. About people. About geese.

She rises.

**Duchess:** I'll tell my brother his goose bride is real. More real than half the court.

At the door, she pauses.

**Duchess:** Your mother. Did she... was she happy? At the end?

**Beatrice:** (quietly) She was at home. With us. With her goose. Yes.

The Duchess nods. Once. Then she's gone.

---

Beatrice stands in the hall, alone except for Goosie.

**Beatrice:** (to the goose) What just happened?

Goosie honks.

**Beatrice:** That's what I thought.

---

### Later — Godfrey

He comes the next day. Finds her in the herb garden, as if she never leaves it.

**Godfrey:** My sister visited.

**Beatrice:** Yes. We talked.

**Godfrey:** (eventually) My sister also said I should marry you quickly, before you come to your senses.

Beatrice almost laughs.

**Beatrice:** Did she.

**Godfrey:** She said you're too good for me. That I don't deserve you. That she'll tell everyone in Brittany and make sure they all know it.

**Beatrice:** (smiling now) I like your sister.

**Godfrey:** (matching her smile) Everyone does. It's exhausting.

---

They sit in the garden. Goosie waddles between them.

**Beatrice:** Godfrey.

**Godfrey:** Yes?

**Beatrice:** I still don't know what happened that day. At the hall. Why your father made that vow. Why you were sent to walk me home. Why any of this is happening.

He waits.

**Beatrice:** But I know you. I know you waited. I know you asked my father. I know you're still here.

She looks at him directly.

**Beatrice:** That's enough. For now.

**Godfrey:** (quietly) For now.

**Beatrice:** What happens next?

**Godfrey:** (simply) Whatever you want.

---

And so, in time, the king visits. The queen softens. The Duchess becomes an unexpected ally. Sir Guy, somewhere, broods pointlessly. The goose leads.

And Beatrice, who walked through a door not knowing what waited on the other side, finds herself walking toward something she never expected: a future she gets to choose.













REMAINDER

==========================================================
In Mercia (in the English midlands), the old women sometimes used the saying:

**“A goose may wend where a King must wait.”**

To some, this sounded like foolish village talk. Yet in the reign of King Henry the first of England, not long after the Norman conquest, there lived a young woman who proved the saying strangely true.

![Chapter](Goose_Bride-goosemark-cut_small.png) 

## The Red-Wolf’s Daughter

Beatrice lived with her father in a timber-framed longhall at **Stanwey** (the *'Stone Way'*), among the wooded hills of the Midlands. 

In earlier days Harold had been known as **Red-Wolf**, a Saxon thegn who fought in the wars that followed the Conquest. He had ridden with kings, crossed blades with rebels, and once dragged a drowning Norman lord, the king's own brother, from a river crossing.

But battles fade, and wounds grow stiff as winter turns to winter.

Harold had become an old man with iron-grey hair and aching bones. His sword hung idly above the hearth, more as memory than weapon, and he spent less time roaming the lands and more time by the fire with his staghound.

In his stead, Beatrice shouldered the daily ordering of the manor without murmur. She saw to the villagers' labour of boon-days in the fields, oversaw the brewing and the buttery, and tended the sick with herbs and medicine.

She had bright eyes, quick wit, and a habit of speaking her thoughts aloud before deciding whether she ought to.

Her closest companion was a large white goose she had raised from a gosling.

The bird followed her everywhere.

She called it **Goosie**.

![Chapter](Goose_Bride-goosemark-cut_small.png) 

## The King’s Demand

One autumn morning, the Stanwey village smithy was startled by the heavy thud of a horse passing by. A servant peered from the main doorway of Harold’s timber manor as a royal rider pulled up, his cloak stained with the road.

Without dismounting, the rider unrolled a stiff parchment. He ignored the servant entirely, projecting his voice toward the high timber gables as if the hall itself were the only thing worthy of his breath. With the sharp, clipped accent of the Norman court, he proclaimed:

“The King hunts in Rockingham Forest.”

He held the *writ* high, its wax seal catching the morning light. Rockingham was the King's forest, and the King’s forest had its own laws. A man might lose a hand for taking the King’s deer, yet a king might take from a man without apology. Under the right of *purveyance*, landholders such as Harold were expected to provide food and supplies whenever the royal court moved through the shire.)

“This holding shall render its service: two feathered arrows and a fowl for His Majesty’s table.”

Indoors, Beatrice immediately scooped up her goose, pulling the bird against her chest as if to shield it from the very sound of the man's voice.

The goose gave a sharp, indignant honk at her.

The King's servant quickly turned his impatient horse, brushing imagined dust from his cloak as he departed.

Harold sighed.

“And there it is, daughter. It must be done.”

Beatrice’s eyes filled with tears.

“But Goosie—”

“A crown is a heavy thing,” Harold said gently. “Kings must take much, for much is laid upon them.”

Beatrice folded her arms, a sudden prickle of defiance rising in her chest.

“I should like to tell this king what I think of that. He has a thousand birds in a hundred forests..."

Harold laughed softly.

“You may keep that thought to yourself.”

He adjusted his cloak, frail hands shaking.

“I shall take the tribute tomorrow.”

Beatrice shook her head.

“You should not walk that far in the cold, father.”

Harold poked at the glowing charcoal.

“Then I shall send the *Reeve*. He has a sturdy cart and the manner of a village headman."

Beatrice sighed.

“The *agisters* will strip the very shoes from a horse as a 'grazing tax,' and the *foresters*? They would bleed a man for merely looking at the King's deer; petty tyrants! Besides, the Reeve has a large, hungry family, and Goosie would just as like end up in his pot, before they even saw the forest!"

She looked at the charcoal basket by the hearth and then up at her father’s tired face.

“No, father, I should take her. I can walk the old Roman road and blend with the dusty charcoal-bearers from the iron mines; Goosie can hide in a basket on my hip. Besides, I am on the King’s business if anyone asks.”

Harold studied her face, then nodded.

“Very well. But remember whose hall you enter.”

![Chapter](Goose_Bride-goosemark-cut_small.png) 

## Chapter 3 — The King's Frustration

The great oak doors of Rockingham's hunting lodge crashed inward. Every head in the hall snapped toward the sound. Conversation died. Meal preparation paused. Even the hounds by the hearth flattened their ears.

Henry, King of the English, Duke of the Normans, stood in the threshold.

He was not a tall man, though built like a war-horse: thick-necked, barrel-chested, his broad shoulders crowding the doorway. His hunting tunic was stained with the black loam of the forest floor and his dark hair was plastered to his temples with sweat.

He gazed sharply about the hall and found little that pleased him, until his eyes, grey as honed steel, settled on his queen's face.

The morning's hunt had been a disaster. Two thin hares, three wiry fowl, and a fox too mangy to skin. Henry had returned with empty hands and a foul temper.

His silence was a physical weight. Knights and clerks busied themselves with sudden, urgent interest in the food being laid out on the long tables. They knew the signs. When the King's hunt was lean, his wrath was often fat.

He strode to his seat beside Queen Matilda at the high table. She watched him approach, her face carefully smooth, accepting a wine goblet from a servant.

Henry lowered himself onto his chair—not a collapse, but a deliberate settling of immense power. The servant darted forward to fill his goblet, but the King ignored him.

For a long moment, no one breathed. Woodsmoke hung lazily in the air, like a reminder of the idle hunt.

Then the Queen spoke.

"Such a frosty morning, my lord," she said softly. "It is no surprise that the game is shy in this cold fog..."

Henry's steely gaze shifted to the door where his men lingered. Inwardly, he knew that a knight with a full belly was less likely to plot against him than a hungry one, but outwardly...

"The game is shy," he repeated, his voice a low rumble. "Or perhaps my knights have grown fat and lazy on my peace."

“Peace is a rare gift, my lord,” Matilda said softly, stepping closer. “It is the very thing you won in the County of Anjou back in February. Remember the betrothal promise for our young William? It cost you no blood, only a signature.”

Henry grunted, his fingers drumming on the oak. “If it holds. A promise is only as strong as the sword behind it.”

“And yet, you pressed the French King at Gisors such that he yielded the west lands to you,” she countered. “Brittany—our rugged sentinel—it is yours in all but name now, and your daughter sits there as Duchess. It is a solid shield for our borders overseas.”

She watched his jaw relax. He liked the map she was drawing.

“In fact,” she added, her voice dropping, “I have recently had news from that very place.”

Only then did his expression soften a little. "What news?"

![Chapter](Goose_Bride-goosemark-cut_small.png) 

## Chapter 4 — The Breton Offer

Matilda leaned closer to the King, so that he alone could hear her. "A message from Brittany, my lord."

"Is our daughter in good health? What news?"

The Queen smiled slightly and drew a parchment from inside her sleeve. 

"Nay, sire, this concerns Duke Conan's daughter, Agnes; she is fair and of marriageable age. They propose a match... with your son Godfrey."

Henry's eyes narrowed, but he said nothing. The Queen turned to face him fully, seeking reassurance.

"Is it not a clever move, my lord? Why, even old Alain (the Duke's father) gives us his blessing."

Slowly, very slowly, a smile spread across Henry's face; but not a warm smile, rather like that of a man who had just spotted a fox climbing into his henhouse.

"Alain and Conan *both* want my son?"

He reread the letter, his thumb tracing the wax seal of the House of Cornouaille. 

The Queen pressed forward, uncertainly. “It would reinforce our borders. Alain is to retire to a monastery and so wishes to strengthen ties to our house with a second knot.”

Henry set the parchment down. "That is the point. Old Alain is fading and so he must look at his son Conan and wonder: is he strong enough to stand alone? So he reaches for Godfrey as a second to his son, in case the first should fail. It is an ill wind blowing from the south."

The Queen frowned. "What treachery is found in a knot that only binds us closer as family?"

Henry laughed his short, sharp bark. "Fie, I say! Family feeling? Nay Madam; my own brother sits in a dungeon for trying to steal my crown."

He leaned forward.

"Once Godfrey is there, with Breton lords whispering in his ear—a king's son, a warrior's blood—how long before some start thinking *he* would make a fine duke? How long before Conan sees the threat and turns on him? Then I must choose: lose my son, or march on Brittany."

He crumpled the letter.

"No. If Godfrey is to be a lion, let him grow his claws in my sight. Or would you have me send him back to Salisbury Cathedral? Here is where he belongs."

The Queen's voice rose sharply, in a rare display of annoyance with the King. "Our son William has Anjou. Your daughter Matilda FitzRoy has Brittany. Your nephews have lands over the sea. Yet what lands has Godfrey, and what name?"

Her voice dropped to a loud whisper.

"You know what they call him. A weak whelp. A sad shadow."

Henry raised the queen's cup to his lips before lowering it carefully onto the oak. The moment of silence was more terrifying than a shout.

"A weak whelp," he repeated, his voice a low rasp. "A shadow."

The Queen recoiled. "Henry, I meant no slight—"

"You mean to send him across the sea," Henry cut her off, "where he cannot trouble our William."

The Queen said nothing.

Henry stared at her. "William is barely ten, and already you fear shadows."

He leaned back and shook his head in disbelief.

"You speak of Brittany as a sanctuary," he rasped. "I see it as a whetstone where an enemy may sharpen their axe. Would you place a blade in my rival's hand? Pray they do not set it against our William. By all means find Godfrey a wife, but keep him nearby."

The Queen kept quiet and the hall held its breath, until at long last the king broke the silence.

"My lifeblood is in all my children and they each bring us much joy. If my blood is weak, no crown can help the boy. If it is royal, no rags can hide it."

![Chapter](Goose_Bride-goosemark-cut_small.png) 

## Chapter 5 — The Ledger and the Lion

Henry stood with his back to the room, a silhouette carved against the roaring central hearth. Still stinging from the Queen's comments about his son, the King did not move for a long moment; he seemed to be reading the flames, perhaps seeing the ghosts of his own landless youth in the shifting embers.

He turned suddenly, his voice not a shout, but a low, resonant vibration that commanded the sudden silence of the hall.

"My father was mocked as the 'Tanner's Grandson' by every noble in Paris. Did he wait for their blessing? No. He carved his kingdom with a sword. We are kings because God willed it, not because nobles permitted it."

Henry's eyes scanned the far wall, unseeing. "I had no lands. My father gave me silver and told me to wait. I waited while my brothers bled the land dry, and when the moment came, I took what was mine. I did not ask for a marriage to buy my way to the throne."

The rhetoric was cut short by a dry, rhythmic rustle of parchment being squared up.

Roger of Salisbury stepped into the light. He was a quiet, scholarly figure, his fingers stained with the permanent gray of ink—the second most powerful man in England and the keeper of the realm's cold reality.

Henry remained turned toward the fire, his shoulders rigid; thus, it fell to the Queen to anchor the moment.

"Welcome, Lord Roger," she said, her voice cool and steady. "We were just speaking of the weight of legacy. I trust you bring the weight of the present to balance it?"

Roger bowed—a shallow, efficient nod. "The present is manageable, Majesty. But the parchment from Brittany requires a decision. Duke Conan offers his daughter Agnes for Prince Godfrey."

Henry finally turned, his eyes regaining a wary, cordially sharp edge. He glanced at the Sheriff of the shire, who stood trembling by the sideboards.

"Roger. What say you of the local Sheriff's tallies for the forest-fines? He tells me the oaks yielded nothing this season, yet my coffers are bruised and the silver they should have bought is nowhere to be seen. Perhaps you might find the truth where he has found only... 'confusion'."

The Sheriff went pale, sinking into a bow that was more of a collapse.

Roger didn't even look at the man. "The Sheriff's confusion is a matter for the morning audit, Sire. But the parchment from Brittany is a matter of state. Conan offers a second tie—a redundant circle that adds nothing to our security. We already hold the western flank of Normandy; we do not need to buy Brittany twice."

He paused, his eyes flicking to the King with a look of devastating common sense.

"However, the dowry is ten thousand marks of silver. It is easy silver, Sire. A precise bargain for a son who sits outside the direct line of succession. To refuse it is... inefficient. Whether it be the six hundred marks missing from a Sheriff's bag or ten thousand from a Duke's treasury, it is a coin left on the table."

Roger finished speaking and returned to his ledger, the scratch of his quill the only sound in the sudden quiet. The Queen folded her hands and waited.

For a long moment, Henry said nothing. The anger had drained from his face, leaving something worse: a gray weariness, the look of a man who has just understood a painful truth about himself. He looked from his Justiciar, who saw princes as numbers, to his Queen, who saw stepsons as obstacles to be tidied away.

Then his gaze drifted past them, across the hall—and stopped.

In the shadows near the door, half-hidden behind a pillar, sat Godfrey. His son. While knights and lords shifted nervously under Henry's silence, the boy sat perfectly still. Not cowering. Not pleading. Simply... waiting. Watching the debate about his future as if it were a story about someone else.

*He has learned to wait*, Henry thought. *As I waited. As I watched my brothers take everything while I sat in corners just like that.*

The ghost of his own youth stared back at him from across the hall.

Godfrey felt his father's gaze and looked up—slowly, carefully, the way a man looks at the sun. Their eyes met.

Godfrey did not smile. He did not nod. He simply waited, as he had always waited, to see what his father would do.

Henry saw it. The patience. The endurance. The refusal to beg.

*He is better than I was. I clawed and fought and burned. He simply waits. And they call him weak.*

Something hardened in his chest.

*I built this*, he thought. *I made a kingdom where blood is tallied like wool. And now they serve it faithfully—more faithfully, perhaps, than they serve me.*

The room felt suddenly small. Henry realized he had only two choices: accept their framing and treat his son as a surplus asset, or reject it and leave Godfrey with nothing.

Then, something flickered behind his eyes. Not anger, but a dangerous, cold clarity. *Unless there is a third way.*

"So," Henry said softly, his voice dropping to a dangerous rasp. "Everyone arrays against me? Am I the only man in England who sees a son instead of a sack of wool?"

He looked back at Roger, a dangerous smile playing at the corners of his mouth—the look of a gambler who has decided to destroy the table entirely.

"You think my blood is currency, Roger? You want to bargain? You want to weigh and measure and trade? Fine. Let us bargain with Someone who cannot be outbid."

Henry's voice began to rise, the "Scholar-King" giving way to the impulsive pride of the Conqueror's son. He jabbed a finger toward the heavy, carved doors of the lodge.

"If he be a coin, Roger, then we shall toss him to the Heavens! The next pure maid to cross that threshold—be she a Saxon virgin, a Norman heiress, or a milk-stained scullion—she shall be his wife! If God deems him royal, He shall send a match of fire. If not... let the winds take him. If he cannot thrive with a peasant at his side, he was never my son at all."

The Queen stared at him, her face pale. "You cannot possibly mean to cast his life so blindly."

Henry's posture relaxed instantly, the fire cooling into a stony, dismissive indifference. He reached for his wine. "If the Heavens wish him wed, they shall provide. Elsewise, let the hall stay empty, that I may drink in peace."

The hall settled into a jagged silence. Roger of Salisbury stood motionless. He knew the truth, as did the older lords: the King had spoken a sacred vow *coram rege*—before the court. If a beggar girl crossed that threshold now, Henry would have to marry his son to her or become a liar before God.

Henry reached for his wine, oblivious, for the most part, to the cage he had just built—its door wide open to the night.

![Chapter](Goose_Bride-goosemark-cut_small.png) 

## Sir Guy’s Spite

Beatrice reached the hunting lodge by midday.

The place swarmed with soldiers and servants. 

The hall was still nursing the King's mood. Nobles muttered into their wine, casting dark looks toward the doors. A spilled cup, a whispered curse—the court was a pot waiting to boil, and any stranger who entered would do well to be wary of its hot steam. 

As Beatrice entered, carrying the handmade basket and dusty from the journey, a young Norman knight lounging near the doorway recognised her.

**Sir Guy de Montfort.**

Months earlier, Beatrice and her father had travelled up to the Midsummer Feast of St John (held at St Andrews parish church). While the elders shared ale by the bonfires, Sir Guy had cornered her, boasting of his lineage and the "civilising" hand his family had brought to the inferior Midlands.

Insulted, Beatrice had politely begged to be excused, then to go and find her father.

He had called after her then: “A Saxon maid with a fading father and no brother to defend the holding should be more accommodating to a Norman blade. Else, your lands *escheat* to the King and your hall is burned for charcoal!”

She had told him coldly that she preferred men who worked for their supper, not some fine *popinjay* who lived off the sweat of others.

He had not forgotten the insult.

Seeing her now amused him terribly: standing at the entrance to the King’s royal hall with a smudge of charcoal on her nose.

As she walked past him, he extended one boot slightly, interrupting her path.

Beatrice stumbled.

The basket flew open.

![Chapter](Goose_Bride-goosemark-cut_small.png) 

## The Goose Hunt

Goosie exploded from the basket in a fury of wings.

Servants shouted.

A clerk dropped his parchments.

The goose darted across the hall like a feathered arrow.

Someone muttered:

“My troth! A goose loose in the king’s house.”

The bird leapt onto the king’s table.

Henry blinked at the goose, then roared with laughter: a great, genuine sound that startled even him. The court, hearing it, exchanged uncertain glances before daring to chuckle along.

“Well! At last a lively hunt!”

He lunged and caught the goose just as it snapped at the clerk's rear end.

At the sound of Goosie's distressed squawking, Beatrice burst into the hall, long hair flying and uncovered.

“Please don’t hurt Goosie!”

The King blinked.

“Your goose?”

Laughter rippled again throughout the hall. 

Sir Guy, emboldened by the court's uncertain laughter, called out: "This Saxon girl needs a lesson her father's hall could not teach!"

Beatrice suddenly remembered whose hall she had entered. Her heart hammered against her ribs like a trapped bird. She instinctively flung up both hands, unadorned palms outward in the ancient sign of a peaceful traveller. All eyes turned toward her as she curtsied low. Drawing courage in the silence, she spoke.

“She was meant for your table, sire… but if it please you, spare her.”

Henry chuckled, his eyes glinting with a curious merriment. 

"At last—an honest creature in this hall. Spare the goose, you plead?"

It was a pleasing novelty for a petitioner to plead for a bird’s life while her own head sat so precarious.

“I say she has earned mercy from my knife, for she has already graced my table with more sport than my knights.”

![Chapter](Goose_Bride-goosemark-cut_small.png) 

## The Red‑Wolf’s Daughter

The King leaned forward, studying her with amused wonder.

“And tell me, who are you, and whose daughter?”

The girl blushed a little, but held her ground with head held high.

“My lord, I am Beatrice, daughter of Harold Red-Wolf of Stanwey, not five miles from here. He sends apology for not renewing friendship in person, for he is become old.”

The king’s eyebrows shot up.

“Hrathulfr?”

He tilted his head as a distant memory stirred.

“Not the same man who pulled my brother from the Severn?”

Beatrice brightened.

“The very one, sire. He often tells how the King’s brother was heavier than any salmon he ever netted.”

The King roared with excited laughter, in sudden recognition.

“Ha! Then it all returns to me! My father the King gave your father a purse of silver for his damp trouble, and my brother a whipping for his damp clothes. Your father went fishing for lampreys in the Severn and caught a loach with a wet wit instead. My brother Robert was ever more a sodden worm than a lord, and would have stayed on the riverbed had the Red‑Wolf not hauled him to the bank.”

He looked at her and shook his head. 

"Well, aren't you a fine she-wolf! Do not delay but go and tell your father that I shall visit him next week to hear him tell it anew… and return his goose besides and a larder to boot.”

As Beatrice turned to leave, the King's eyes narrowed seeing Sir Guy leaning by the door, goblet in hand. 

“And you, de Montfort—the door will hold up fine without you! If the daughter of a Red-Wolf can walk five miles with a goose, a knight of my guard can surely find some honest work to do before sunset.”

It seemed that the King missed very little in his court. 

Beatrice caught the knight's eye and offered a quick, sharp smile before dipping her head as maidenly modesty required. It seemed the King, too, preferred men who worked for their supper.

![Chapter](Goose_Bride-goosemark-cut_small.png) 

## The Queen Remembers the Vow

As Beatrice left, the queen turned hesitantly to the king.

“My lord, surely your jest was but a passing breath...”

Henry frowned at his wife.

“Is my lady unwell?”

Nervously, the clerk stepped forward to intervene.

“Your Majesty, I believe the queen refers to your royal oath that the next eligible maiden entering the hall should wed Master Godfrey.”

The king's grin returned with a dangerous sort of mischief.

"It seems, Matilda, that the Heavens have a sense of humour. And they have sent us a Red-Wolf's daughter."

The queen grew pale.

“My lord, consider what sorrow of reputation a low-born woman will bring your son.”

The king shrugged.

“Would you rather the boy marry the goose? It arrived first.”

Laughter rippled through the court.

“And besides,” Henry added, “the daughter of Red-Wolf is good blood of an ancient house, even if Saxon.”

He called aside his youngest son.

“Godfrey, take a pair of riders and see the young lady safely home.”

Then, after a sharp look at his clerk — who had anticipated with his quill poised over a fresh parchment—the King stood. The chatter of the hall died instantly. He spoke in the clipped, melodic French of the court, but his voice carried to the furthest rafters.

“Hearken now, all my barons and faithful men of England. By my royal will and with the counsel of my court, I have seen fit to reward the service of Harold of Stanwey. Therefore, I grant and notify you that my son, Godfrey, shall take to wife the daughter of Harold. He shall hold the manor of Stanwey in wardship and by right of marriage, as of my crown. Let him serve me faithfully for these lands, as his father-in-law has done before him. I command my peace be kept in this matter, and let no man presume to challenge this gift or disturb their possession.”

He looked directly at the cluster of knights where Sir Guy stood, his gaze like a physical weight.

“Let this be clear to one and all. My son, Godfrey, shall marry the daughter of Harold Red-Wolf.”

![Chapter](Goose_Bride-goosemark-cut_small.png) 

## A Courtship No One Expected

Godfrey obeyed his father. 

At first he visited Harold’s cottage only to honour the king’s command.

But he found Beatrice unlike the ladies of court.

She spoke plainly.

She laughed easily.

She did not treat him as a prince, but as a man.

Godfrey discovered he liked this very much. Though he was not the handsomest of the king’s sons, nor the cleverest, he possessed this rarer quality: he listened.

And so it was that with time, after some initial suspicion, even Goosie accepted him.

![Chapter](Goose_Bride-goosemark-cut_small.png) 





NEW MULTIPART SECTION - THE WALK



---

## Chapter 6 — The Road Home

The Roman road stretched eastward through the forest, pale stone under a pale sky. Beatrice walked with her basket on her hip, Goosie's occasional rustle the only sound besides her own footsteps. The lodge was behind her now, the king's laughter still echoing strangely in her memory.

She had her goose. The king had spared her. More than that—he had *laughed*. At her, perhaps, but also *with* her. It was more than she had dared hope.

She was still turning it over in her mind when she heard the horses.

Hooves on stone. Coming fast. Two, maybe three riders.

She stepped to the side of the road without thinking, bowing her head, pulling the basket close. Nobles passed quickly when they passed at all. You stood aside and waited for the dust to settle.

The horses slowed. Stopped.

She waited, head still bowed. The dust drifted. Someone dismounted.

Then a voice—young, uncertain, not commanding:

"Please. Don't be afraid."

She looked up.

It was him. The young man from the hall. The one who had stood by the pillar, watching. Their eyes had met for a heartbeat when she first entered—she remembered because he hadn't looked away quickly, the way nobles usually did when caught staring at a peasant. He'd just... watched. Like he was trying to understand something.

Now he stood before her, holding his horse's reins, looking as uncertain as she felt.

"I'm sorry to startle you," he said. "My father—the king—has commanded me to give you safe escort back to your home. That's all. Nothing more."

She stared at him. Safe escort. A prince, sent to walk a goose girl home.

"You'll get your boots muddy," she heard herself say.

He looked down at his fine leather boots. Then at the road. Then back at her.

"I've had muddier."

It was almost a joke. Almost. She didn't smile, but something in her face shifted.

---

They walked.

The guards followed at a distance—far enough to be respectful, close enough to be protective. Godfrey had offered her his horse, but the thought of sitting on that tall, sleek animal, of being lifted up by a prince in front of soldiers... her face had gone hot just imagining it.

"I'll walk," she'd said.

And so they walked.

For a long time, neither spoke. The road crunched under their feet. Goosie rustled in her basket. The forest breathed around them.

Finally, Godfrey said: "The goose. What's its name?"

She glanced at him sharply, searching for mockery. Found none.

"Goosie."

"Goosie." He nodded, considering it seriously. "That's a good name. Simple. She knows who she is."

Beatrice didn't know what to make of that.

---

After another silence, she asked: "Do you always escort peasants home?"

He almost laughed, then stopped himself.

"No. I've never escorted anyone anywhere." A pause. "I mostly just... watch."

She remembered him by the pillar. Watching.

"Why?"

He shrugged. "It's safer. No one expects much from you if all you ever do is just watching."

She filed that away. It wasn't what a prince was supposed to say.

---

They walked on. The guards' horses clip-clopped softly behind them.

Godfrey kept glancing at her—quick looks, then away, as if trying to work something out. She felt his gaze like a small warmth.

Finally, she couldn't bear it.

"What is it?" She refused to look at him. "What are you staring at?"

He went pink. "It's nothing. It's... I'm... I mean I'm sorry. I didn't mean to—"

She glanced at him sideways. Waited.

He took a breath.

"I... I think you're one of the bravest women I've ever seen."

She stumbled. Actually stumbled, catching herself just in time.

"What!?"

"In the hall." He wasn't looking at her now, staring straight ahead. "You walked in after your goose. Everyone was staring. My father was in a mood that could curdle milk. And you just... walked up to him. And begged. For a goose."

Beatrice didn't know what to say. No one had ever called her brave before. Stubborn, yes. Headstrong. Her father said she acted first and thought second. But brave?

"I was terrified," she admitted.

"I know." He glanced at her. "That's what made it brave."

---

They walked on. The forest opened up ahead—she could see the clearing where Stanwey sat, smoke rising from the hall's hearth.

"My..."

Godfrey took a breath.

"My father made a vow today. Before the whole court."

She waited.

"He was angry. About the hunt, about—" He stopped. "About me. About my future. And about... whom I shall marry."

Beatrice glanced at him, then away. Marriage. That was for nobles to arrange. For peasants, it was simpler—whoever your father chose, whoever could keep you fed.

"Oh," she said. Just that.

---

He seemed to need to fill the silence.

"My mother wanted someone important for me. A princess from across the sea—Agnes of Brittany. Beautiful, they say. Wealthy. The kind of match that would..." He trailed off. "That would make me matter, I suppose."

Beatrice said nothing. A princess. Silk dresses. Castles by the sea.

"But my father said no."

This surprised her. She looked at him.

"Why?"

Godfrey almost smiled. "He said it would make me a target. Put me in a rival's hands. Give the Bretons a knife to hold at his throat." He shrugged. "He sees threats everywhere. Sometimes he's right."

---

They walked. The road curved through the trees.

"What happens now?" Beatrice asked. "If not Brittany?"

Godfrey looked at her directly.

"That's the thing." He took a breath. "He said... he would let God decide."

She frowned. "Let God decide? How?"

His ears went slightly pink. It was the first time she'd seen anything like embarrassment on his face.

"He pointed to the door. The entrance to the hall. He said... the next maiden to walk through it..." He trailed off.

Beatrice waited. "The next maiden...?"

"Would be the one." He said it quickly, like getting a splinter out. "The one I marry."

---

Beatrice considered this. It was odd, certainly. Kings usually arranged marriages like farmers arranged livestock—with deliberation, with bargaining, with contracts. Leaving it to chance seemed...

"Is that usual?" she asked.

Godfrey almost laughed. "No. I've never heard of such a thing. It's... it's put him in a difficult spot."

"Oh?"

Just that. One syllable. She was still processing, still fitting this strange information into her understanding of how the world worked.

They walked on.

---

After a few steps, curiosity got the better of her.

"What difficulty?"

Godfrey glanced at her, then away.

"A vow like that... he can't refuse it. It's spoken before the court. Before God. A king's word is sacred—if he breaks it, his knights don't have to keep their oaths to him." He shook his head. "He's trapped. Whoever walked through that door, that's who I have to marry. A princess, a peasant, anyone."

Beatrice walked in silence, turning this over.

A king, trapped by his own words. A prince, married to whoever walked in next. Some girl somewhere, about to have her life turned upside down by a door.

She almost felt sorry for that girl. Whoever she was.

---

"So," Beatrice said, more to fill the silence than anything, "who is she? The one who walked through?"

Godfrey stopped walking.

She took two more steps before realizing he was no longer beside her. She turned.

He was just standing there, looking at her with an expression she couldn't read. Something between wonder and terror.

She waited.

He didn't speak.

The road was very quiet.

---

And then—slowly, terribly, wonderfully—it dawned on her.

*The next maiden to walk through the door.*

She had walked through a door today. Many doors. The lodge door. The hall door.

*She* had walked through the door.

She remembered it suddenly—pushing through after Goosie, long hair flying, not thinking, just acting. The hall had been full of staring faces, strange and hostile. She'd barely noticed them. She'd only seen the king, and the goose, and her own terror.

*Oh.*

She had walked through that door.

"Oh," she breathed. Then, louder: "Ooh!"

The basket tipped. Goosie honked in protest. Beatrice didn't notice.

Her face went white, then red, then white again. Her heart was suddenly loud in her ears—so loud she was sure he must hear it.

"It's me," she whispered. "It's me."

Godfrey nodded. Just once. Still not speaking.

---

For a long moment, she couldn't move. Couldn't think. The world was upside down and her thoughts crashed into each other like startled birds.

*Me? The goose girl? A fading Saxon house? Me.*

*A prince. I'm supposed to marry a prince.*

*I have charcoal on my nose.*

She became acutely aware of everything about herself: her dusty dress, her wind-tangled hair, her muddy shoes. The goose basket on her hip. The smudge she knew was on her face.

She must look ridiculous. She must look like a complete fool. A peasant standing on a road, gaping at a prince, while her goose squawked.

And then—despite everything, despite the terror and the confusion and the utter impossibility of it all—she did something she never expected.

She looked at him. Really looked.

And he was still just standing there. Waiting. Not smirking. Not triumphant. Just... waiting. Like her opinion mattered. Like *she* mattered.

A shy glance. Quick, before she could stop herself. Then away.

Godfrey's ears were still pink.

---

"You're blushing," she heard herself say.

He touched his ear self-consciously. "I'm not."

"You are."

A pause. Then, incredibly, he almost smiled.

"So are you."

She touched her own burning cheek and wanted to die.

The goose honked.

And somehow, impossibly, they were both almost laughing.

---

They walked again. Slower now. The guards still followed at a distance.

After a long silence, Beatrice said: "Thank you."

"What's that?"

"For telling me yourself," she said. "You could have let me find out at home. From my father, or some messenger at the gate."

The timbered hall of Stanwey was visible now, a grey island in the clearing. Godfrey slowed his pace, his eyes moving from the sturdy walls to the small, calloused hands Beatrice used to steady her basket.

"How is your father?" he asked, his voice low and thoughtful. "Does he still keep the high seat in the hall, or has the governance of this house settled upon your shoulders? Does he hold the keys himself, or has the daily charge of these lands fallen to you?"

Beatrice didn't look away from the smoke of her hearth, her voice steady and protective of the man within. "His heart is in the hall," she said, "but the winter is hard on his aching bones. The daily ordering—the accounts, the boon-work, the settling of village strife—that is my charge now. He provides the counsel; I provide the feet."

"A heavy burden for a daughter alone," Godfrey observed, watching her with a quiet, searching intensity. 

"He believes the world is as it ever was," she said, her tone uncomplaining, almost a whisper of pride. "And I see that it remains so for him. He pretends he's fine. He pokes at the fire and says the cold doesn't bother him. But I see him at night, when he thinks I'm asleep. The pain in his hands. The way he moves slow, like every step costs him something."

She swallowed.

"How could I forgive myself if he... if something happened? If he got hurt, or worse, because I let him go?"

Godfrey's face was still. Not pitying. Just present.

"You love him," he said. Not a question.

"Yes."

Another silence. Then, more softly:

"He cautioned me, before I left. Told me to remember whose hall I was entering." She almost smiled. "Meaning: behave yourself. Don't speak out of turn. Don't act first and think second."

She looked at him, embarrassed.

"He says I do that. Act first, think second."

Godfrey considered this.

"In the hall," he said slowly, "you acted first. And it worked."

She blinked.

"You saved your goose. You made my father laugh. You—" He stopped, then went on, quieter. "You made me want to know who you were."

Godfrey turned to her. "Would you like me to wait outside? Give you time to tell him alone?"

She looked at him sharply. It hadn't occurred to her that he'd offer that. That he'd think of her father, her home, her need for a moment to breathe.

"That would be..." She trailed off. "Yes. Please."

He nodded again. Stepped back. Gestured for the guards to halt.

"I'll wait here. Take as long as you need."

---

She walked the last hundred yards alone.

The hall door was open. Her father was there—she could see him, standing in the doorway, watching her approach. His face was worried. He'd seen the riders, the soldiers, the prince.

She reached him. Set down the basket. Goosie waddled out and headed for the hearth.

Harold looked at his daughter. At her red cheeks. At her strange, stunned expression.

"Daughter?"

She took a breath.

"Father," she said. "I saved Goosie."

A pause.

"But there's something else."

---

Outside, at the edge of the trees, Godfrey waited.

He didn't know what would happen next. He didn't know if she'd come back out, or send him away, or laugh at the impossibility of it all.

But he knew one thing: she had charcoal on her nose, and she had made him almost laugh, and that was more than any princess had ever done.

He waited.

The road stretched both directions, past and future, and for the first time in his life, he wasn't sure which was which.

... 

Harold struggled accept the thing that seemed to be a fantasy to him. But when he saw the likeness of Godfrey to his memory of the King, he began to believe it at last.





## A Dark Place

### Some Weeks into the Courtship

Beatrice has been to court twice. The first time, she endured the whispers. The second time, she answered them with such plain good sense that even the Queen's ladies fell silent.

But tonight, alone in a small chamber off the great hall, she has heard something she cannot answer.

A cluster of noblewomen, unaware she was just around the corner:

*"She thinks she's one of them now. The goose girl."*

*"He'll tire of her. Men do. Especially when the king's will isn't behind it anymore."*

*"The king's will? That was a whim. A mood. He's probably forgotten already."*

*"Wait until the Brittany marriage is proposed again. Ten thousand marks. You think he'll choose a goose over that?"*

Beatrice didn't stay to hear more.

She is sitting now on a cold stone window seat, Goosie (smuggled in, against all rules) pressed against her side. The goose's warmth is the only steady thing.

She should leave. Should walk back to Stanwey tonight, before—

A footstep.

She looks up.

Queen Matilda stands in the doorway.

Not attended. No ladies. Just the Queen, in a simple gown, her face unreadable.

**Matilda:** You're meant to be at supper.

**Beatrice:** (rising, curtsying mechanically) I wasn't hungry, your Majesty.

**Matilda:** (glancing at Goosie) The goose is meant to be in the kitchens.

**Beatrice:** (protectively) She's with me.

A pause. The Queen studies her. Then, unexpectedly, she moves to the window seat and sits. Not beside Beatrice—a little apart. But sitting.

**Matilda:** You heard something.

Beatrice says nothing.

**Matilda:** (quietly) I've been Queen long enough to know that look. It's the look of someone who's just discovered what people say when they think you can't hear.

Beatrice's throat tightens.

**Matilda:** What did they say?

**Beatrice:** (after a long moment) That he'll tire of me. That the king's will was a whim. That when Brittany offers ten thousand marks again, he'll choose that instead.

She stops. Breathes.

**Beatrice:** That I'm a goose girl playing at being someone else.

The Queen is quiet. The fire crackles.

Then:

**Matilda:** I was not born Matilda.

Beatrice looks at her.

**Matilda:** I was born Edith. In Scotland. To a Saxon mother and a Scottish king. When I came to England to marry Henry, the Norman court called me "the Saxon girl." They whispered that I'd bring barbarian ways. That I'd never understand how to be queen.

She meets Beatrice's eyes.

**Matilda:** That was twenty years ago. I am still here.

Beatrice doesn't know what to say.

**Matilda:** The people who whispered then? Most are gone. Forgotten. I am Queen of England.

She leans forward slightly.

**Matilda:** You want to know what I think of this match?

Beatrice waits.

**Matilda:** At first, I hated it. Not because of you—I didn't know you. Because of what it meant for William. My son. The heir. Every piece of attention Godfrey gets, every scrap of affection, every whispered "he's a king's son too"—I saw it as a threat.

**Beatrice:** (quietly) I understand.

**Matilda:** Do you?

**Beatrice:** I have no brothers. But if I did... if my father had someone else to leave the manor to... (she shrugs) I'd want to protect what was mine too.

The Queen looks at her. Really looks.

**Matilda:** (slowly) Yes. You do understand.

A silence. Then:

**Matilda:** I've been watching you. These past weeks. The way you speak to servants. The way you tend the sick in the village. The way you handle my ladies—their whispers, their snubs, their little cruelties. You don't fight. You don't flinch. You just... go on being yourself.

She pauses.

**Matilda:** That's rarer than you know.

Beatrice's eyes sting. She blinks rapidly.

**Matilda:** My son William is ten. When he's older, he'll need people around him who are steady. Who don't bend with every wind. Who know who they are.

She reaches out. Just for a moment, her hand touches Beatrice's.

**Matilda:** Godfrey has found one. I see that now.

She rises.

**Matilda:** As for Brittany—ten thousand marks is silver. It buys soldiers, ships, alliances. It does not buy a wife who will sit with a frightened girl in a cold window seat and understand her without being told.

She moves toward the door. Pauses.

**Matilda:** You are not a goose girl playing at being someone else. You are exactly who you are. That is why my stepson—who has watched and waited his whole life—chose you before he even knew he could.

She goes.

Beatrice sits alone with Goosie, the goose's warmth against her side.

For a long time, she doesn't move.

Then, slowly, she presses her face into Goosie's feathers and lets herself cry—just a little, just enough.

---

### Later — Godfrey Finds Her

He's been searching. His face, when he sees her, is tight with worry.

**Godfrey:** I looked everywhere. They said you'd left the hall, and I thought—

**Beatrice:** I'm here.

He crosses to her. Kneels beside the window seat. Sees her face.

**Godfrey:** What happened?

**Beatrice:** (quietly) Your mother.

His face shifts—wary, protective.

**Beatrice:** No. Not like that. She... (she shakes her head, wondering) She sat with me. She told me about being Edith. About the whispers. She said... she said you chose me.

Godfrey is very still.

**Beatrice:** Did you? Choose me? Before you knew about the vow?

He meets her eyes.

**Godfrey:** In the hall. When you burst in after your goose. When you spoke to my father like he was just a man. When you looked at me—just for a moment, when you first entered—and didn't look away.

He reaches for her hand. Slowly, giving her time to pull back.

She doesn't.

**Godfrey:** I didn't know about the vow then. I just knew I wanted to know who you were.

**Beatrice:** (very soft) Oh.

**Godfrey:** The vow gave me permission to walk you home. It didn't make me want to.

They sit together in the window seat, Goosie between them, the night cold beyond the glass.

**Beatrice:** (after a long moment) I heard things tonight. Cruel things. About me. About us. About what will happen when Brittany offers again.

Godfrey's jaw tightens.

**Godfrey:** Brittany can offer. My father can command. But I— (he stops, starts again) I've spent my whole life being told what to do, where to go, who to be. This is the first thing I've wanted for myself.

He looks at her.

**Godfrey:** I'm not letting it go.

Beatrice looks at him. This quiet young man who waited at the tree line. Who asked her father. Who is still here.

**Beatrice:** (almost a smile) You're strange.

**Godfrey:** (matching it) I know.

Goosie honks.

They both laugh—a little wetly, a little worn, but together.

---

### The Next Morning

The Queen, breaking her fast, finds a small bundle outside her chamber door.

Inside: a bunch of dried herbs, carefully bundled, with a note in an uneducated hand:

*For sleepless nights. Steep in hot water. Thank you.*

*—B.*

The Queen's ladies wonder at her expression. It's almost a smile.

---






REMAINDER TO REWRITE MAYBE

## The Goose Bride

Their wedding was held the following summer, when the oak trees of Rockingham forest were heavy with green.

Nobles came reluctantly at first, expecting scandal.

Instead they found a bright-eyed bride who moved through the court with quiet confidence of a Lady of the Hall.

Even the queen eventually softened and called it a good thing.

Harold watched with a wet eye, knowing that his landhold was revived and the village Reeve would answer to a son-in-law of royal blood."

When the wedding procession left the church porch, a plump white goose waddled proudly ahead of them, its neck stretched high as if it wore a crown of its own.

Someone in the crowd chuckled.

“Look there — the goose leads the bride.”

An old woman nearby nodded knowingly.

“Aye,” she said.

“Did I never tell you? In Mercia they say a goose may wend where a King must wait."

And so it did.

![Chapter](Goose_Bride-goosemark-cut_small.png) 

---
# **Teacher & Parent Notes**  
---
**Recommended Age Range:** *8–12 years*

*The Goose Bride* is a short medieval tale suitable for independent readers in upper primary and early secondary years. Its language, themes, and humour are accessible to children around ten, while still offering enough richness for older readers to enjoy. Younger children (7–8) can follow it easily when read aloud.

---

## **Themes to Explore**
These themes appear naturally in the story and lend themselves to discussion:

- **Kindness & Mercy**  
  Beatrice pleads for the life of a goose meant for the king’s table.

- **Courage & Integrity**  
  A young girl enters a royal hall alone, speaks honestly, and stands her ground.

- **Justice & Fair Leadership**  
  King Henry rewards humility, corrects arrogance, and notices more than his court expects.

- **Memory, Gratitude & Community**  
  The king remembers an old debt to Beatrice’s father and honours it.

- **Humility vs Pride**  
  Beatrice’s modesty contrasts with Sir Guy’s idleness and entitlement.

---

## **Discussion Questions**
Use these to prompt reflection, conversation, or written responses:

1. Why does Beatrice risk entering the king’s hall?  
2. What does the goose chase reveal about King Henry’s character?  
3. How does Henry treat Beatrice differently from Sir Guy?  
4. What makes Beatrice brave?  
5. Why does the king value her father’s past actions so highly?  
6. What qualities make a good leader in this story?  
7. How does humour help soften tense or formal situations?

---

## **Historical & Cultural Notes (Child‑Friendly)**
These points help young readers understand the medieval setting:

- **Showing empty hands** was a traditional sign of peaceful intent.  
- **Royal halls** were public spaces where people brought petitions to the king.  
- **Lineage and reputation** mattered greatly in medieval society.  
- **Lampreys** were a favourite royal delicacy.  
- **Nicknames** like “Red‑Wolf” or “she‑wolf” often reflected personality, deeds, or family history.

---

## **Vocabulary to Notice**  
These words may be new to some readers but are easy to explain:

- **sire** — a respectful way to address a king  
- **curtsy** — a bow made by women or girls  
- **thegn** — a nobleman or landholder in early medieval England  
- **purveyance** — the king’s right to take goods for royal use  
- **wimple** — a cloth head‑covering worn by medieval women  

(These can be included in a short glossary if desired.)

---

## **Creative Extension Ideas**
These activities help deepen engagement:

- **Write a letter** from Beatrice to her father describing her day at court.  
- **Draw the goose chase** in the king’s hall.  
- **Retell the river‑rescue** from Hrathulfr’s point of view.  
- **Invent a new medieval insult** Henry might use (e.g., “sodden worm”).  
- **Create a map** showing Stan‑Way, the Severn, and the king’s hall.

---

Below is the **full set of chapter‑by‑chapter student questions**, crafted for ages 8–12, with a mix of:

- ✔ straightforward comprehension  
- ✔ inference  
- ✔ emotional intelligence  
- ✔ creative thinking  
- ✔ one optional “challenge question” per chapter  

---

# **STUDENT QUESTIONS BY CHAPTER**  
*(For ages 8–12, with optional challenge questions)*

---

## **Chapter 1 — The Red‑Wolf’s Daughter**
1. Why does Beatrice’s father send her to the king instead of going himself?  
2. How does Beatrice feel about her task, and what clues show this?  
3. What does the nickname “Red‑Wolf” suggest about her father?  
4. Why is Beatrice determined to complete her errand?  
5. Creative: Draw or describe what you imagine Stan‑Way looks like.

**Knight's Challenge:**  
Why might the king remember the Red‑Wolf even if many years have passed?

---

## **Chapter 2 — The King’s Demand**
1. What does the king want from the people of Stan‑Way?  
2. How do the villagers react to the king’s order?  
3. Why is Beatrice troubled by the king’s demand?  
4. What does this chapter show about the king’s personality?  
5. Creative: If you were in Beatrice’s place, what would you do?

**Knight's Challenge:**  
Is the king being unfair, or is he acting as a medieval king normally would? Explain your reasoning.

---

## **Chapter 3 — The King’s Frustration**

1. **The Hunt:** Why is the King’s hunt described as a "disaster," and how does his mood affect the other people in the hall?
2. **The King’s Stature:** The text says Henry was built like a "war-horse." What specific details describe his physical strength?
3. **The Queen’s Approach:** How does Queen Matilda attempt to soothe the King before she brings up the news?
4. **The Contrast:** Why is the King’s silence described as being as "fat" as his wrath is lean?
5. **Creative:** Describe the sound of the oak doors crashing inward from the perspective of one of the hounds by the hearth.

**Knight's Challenge:**
In the 1100s, a King’s physical presence was his power. Why would it be important for a medieval audience to know that the King was "barrel-chested" and "broad-shouldered" even if he wasn't very tall?

---
They are still **largely relevant**, but the revisions to Chapter 5 have added so much psychological depth that a few questions now feel a bit "thin" compared to the new text. To maintain the "Dunnett-style" complexity for your readers, we should sharpen them to reflect Henry’s self-realization and the specific "accounting" metaphors.

Here is the updated set, refined to mesh perfectly with the new "Option D" narrative.

---

## **Chapter 4 — The Breton Offer**

1. **The Trap:** Why does Henry believe the marriage offer for Agnes of Brittany is a "fox in his henhouse" rather than a kind gesture?
2. **Family Feeling:** Henry says "Family feeling fills dungeons." Based on what you know of his brothers, why does he find "kindness" dangerous?
3. **The Queen’s Motive:** The Queen calls Godfrey a "weak whelp" and a "sad shadow." Why does she want him sent across the sea to Brittany?
4. **The Whetstone:** Henry describes Brittany as a "whetstone." What does he fear the Bretons will do with his son if he sends him there?
5. **Creative:** If you were Duke Alain of Brittany, write the one "personal note" from Godfrey’s sister Matilda that would be most likely to convince him to come.

**Knight's Challenge:**
Henry says he cannot trust his own daughter because her loyalty is now to her husband’s land. In the medieval world, how did marriage change a woman’s political "team"?

---

## **Chapter 5 — The Ledger and the Lion**

1. **The Tanner's Grandson:** Henry mentions his father (William the Conqueror) was mocked. How does his father’s history influence Henry's view on what makes a person "royal"?
2. **The "Accounting" Crisis:** Henry realizes he made a kingdom where "blood is tallied like wool." Why does it bother him that Roger and the Queen are being "perfectly loyal" and "perfectly correct"?
3. **The "Sack of Wool":** Why does seeing Godfrey's patience change Henry's mood?
4. **The Third Way:** Henry feels "suffocated" by the choices Roger and the Queen give him. How is his "Next Maid" vow a "Third Way" or a way to "destroy the table"?
5. **The Cage of Law:** If a beggar girl walks through the door, why would Henry's knights stop keeping their oaths if he refused to marry her to Godfrey?

**Knight's Challenge:**
Henry says, "If he cannot thrive with a peasant at his side, he was never my son at all." This reflects a belief in **Innate Nobility** (nobility born *within* a person). Does Henry believe a crown makes a King, or does the man make the Crown? Use evidence from his "Tanner" speech to explain.

---

## **Chapter 6 — Sir Guy’s Spite**
1. What does Sir Guy do that shows his spiteful nature?  
2. How does Beatrice respond to his behaviour?  
3. What does this chapter reveal about the difference between Beatrice and Sir Guy?  
4. Why might Sir Guy feel threatened by Beatrice?  
5. Creative: Describe Sir Guy using an animal metaphor (e.g., “as sly as…”).

**Knight's Challenge:**  
Is Sir Guy’s behaviour caused by pride, jealousy, or fear? Defend your answer.

---

## **Chapter 7 — The Goose Hunt**
1. What causes chaos in the king’s hall?  
2. How does the king react to the goose’s behaviour?  
3. What does Beatrice do when she enters the hall?  
4. Why is she afraid, and what helps her find courage?  
5. Creative: Draw or describe the goose chase in the hall.

**Knight's Challenge:**  
Why does the king spare the goose? Is it mercy, amusement, or something deeper?

---

## **Chapter 8 — The Red‑Wolf’s Daughter (Hall Scene)**
1. How does the king recognise Beatrice’s father?  
2. What story does Henry remember about his brother?  
3. Why does Henry decide to visit the Red‑Wolf?  
4. What does the king’s treatment of Sir Guy reveal about leadership?  
5. Creative: Write a short speech Henry might give when he visits Stan‑Way.

**Knight's Challenge:**  
Why does Henry value the Red‑Wolf’s old deed more than Sir Guy’s present service?

---

## **Chapter 9 — The Queen Remembers the Vow**
1. What vow does the queen remember?  
2. Why does the vow cause trouble now?  
3. How does the queen feel about the king’s promise?  
4. What does this chapter show about royal responsibility?  
5. Creative: Write a diary entry from the queen’s point of view.

**Knight's Challenge:**  
Is the queen more concerned with honour, politics, or her son’s future? Explain.

---

## **Chapter 10 — A Courtship No One Expected**
1. How does Godfrey react to meeting Beatrice?  
2. What surprises the court about their interaction?  
3. How does Beatrice behave during the courtship?  
4. What does this chapter reveal about Godfrey’s character?  
5. Creative: Imagine a short conversation between Beatrice and Godfrey after the feast.

**Knight's Challenge:**  
Why might Beatrice be a better match for Godfrey than the noble brides the queen prefers?

---

## **Chapter 11 — The Goose Bride**
1. How does the story resolve the king’s vow?  
2. What happens to Beatrice and Godfrey at the end?  
3. How does the goose play a role in the final outcome?  
4. What lesson does the king learn?  
5. Creative: Write a one‑sentence moral for the story.

**Knight's Challenge:**  
What is the true “gift” Beatrice brings to the royal family — and why is it more valuable than gold or tribute?


Here is the complete, updated Fact Sheet with all revisions integrated:

---

## 📜 Facts: The World of the 'Goose Bride' (12th-Century England)

This guide provides the historical "bones" for our story. It explains why Beatrice walks, why her father is worried, and how the law of the forest rules their lives.

---

### 🏰 The Saxon Home: Life in the "Hall"

In the 1100s, Beatrice and Harold don't live in a house—they live in a **Hall**.

* **The Structure:** A timber-framed "longhall" with a central fire-pit. There are no chimneys; smoke escapes through a hole in the thatch roof.
* **The Saxon Thegn:** Harold "Red-Wolf" represents the Thegns, the pre-Conquest Saxon nobility. While many lost their lands to Norman lords, some were kept on as foresters or local officials because of their deep knowledge of the terrain and their martial skill.
* **The Status:** The Hall is the heart of the community. It's where the **Manorial Court** is held and where villagers bring their "renders" (taxes paid in eggs, grain, or ale).
* **The Upkeep:** The villagers (called **villeins**) owe Harold "boon-work." They are legally required to help repair his roof or stone walls.

---

### 🌲 The Law: The King's Forest & Purveyance

Stanwey is located within **Rockingham Forest**. In the 1100s, a "Forest" wasn't just trees; it was a legal zone where the King's word was absolute.

* **Rockingham Forest & Purveyance:** Rockingham was a Royal Forest, subject to "Forest Law" rather than Common Law. This gave the King absolute power over the land, its deer, and its inhabitants. **Purveyance** was the dreaded royal right to seize food and transport from locals to support the travelling court.
* **Vert and Venison:** It was a crime to cut "green wood" or hunt the King's deer. Even carrying a bow could lead to a massive fine.
* **The "Lawed" Dog:** To protect the deer, any large dog kept for protection had to have three claws removed from its front feet (called "expediting") so it couldn't chase game.
* **The Roman Road (Stanwey):** The name Stanwey refers to the Roman roads common in the Rockingham area. *Stan* means stone and *Wey* (or Way) means a thoroughfare or road. The **Gartree Road**—an ancient, straight, stone-paved Roman highway—is the main artery for messengers and charcoal-burners.

---

### ⚖️ Politics, Land and Lineage

The legal landscape of the 1120s was defined by the struggle between the old Saxon ways and the new Norman rules.

* **The Son-less Lord:** In Norman law, land is held in exchange for military service. Because Harold has no son to fight for him, his land is "vulnerable."
* **The Ward of the Crown:** If Harold dies, the King has the legal right to choose Beatrice's husband—usually a Norman knight who wants her land.
* **The "Scutage" (Shield Money):** Harold likely sold his warhorses to pay "scutage"—a tax paid to the King to avoid going to war in his old age.
* **The King's Brother (Robert Curthose):** Henry I's eldest brother, Robert, was Duke of Normandy. Their relationship was defined by bitter rivalry. Henry eventually defeated Robert at the Battle of Tinchebray (1106) and kept him imprisoned for the rest of his life—making the King's jokes about Robert's "wet wit" and "sodden toad" historically biting.
* **Prince Godfrey (The "Natural" Son):** King Henry I is famously credited with fathering the most illegitimate children of any English monarch (over 20). While the "Lord Godfrey" of this story is fictional, Henry frequently used his "natural" children to build political bridges and reward loyal families.

---

### 🐺 Who Was Harold "Red-Wolf"? (And Why Does the King Call Him "Hrathulfr"?)

Readers sometimes ask: **"In the story, Harold is a Saxon lord who serves Norman kings. Is that historically realistic? Wouldn't the Normans have replaced all the Saxon lords after 1066?"**

**A:** It's realistic—but it was rare, needing the right circumstances.

After the Norman Conquest in 1066, William the Conqueror did indeed replace most of the Anglo-Saxon aristocracy with his own Norman followers. This process took about twenty years, and by the 1080s, very few Saxon lords held significant lands.

However, there were exceptions. A Saxon lord might keep his lands if he:

* **Submitted to William early**, before the major battles
* **Swore loyalty** and proved useful to the new regime
* **Performed a valuable service** that earned royal gratitude
* **Held lands in a strategic area** where the king preferred continuity

The fictional Harold "Red-Wolf" fits this pattern, especially with his shared Viking ancestry. He fought in the early resistance (as the story says, he "fought in the wars that followed the Conquest"), but eventually made peace with the new order. His heroic act—saving the king's brother from drowning—would have been exactly the kind of deed that earned lasting royal favor.

---

**Q: Why does King Henry call Harold "Hrathulfr"? That sounds Norse, not Saxon.**

**A:** Another excellent observation! "Hrathulfr" (or Hróðulfr) is indeed an Old Norse name. But here's the historical twist:

The **Danelaw**—the part of England settled by Vikings centuries before the Conquest—had a lasting influence on names and culture. The Danelaw covered about a third of England, including large parts of the Midlands where Stanwey is located. Many people in these regions had names of Scandinavian origin. A Saxon thegn with a Norse-derived name like "Hrathulfr" is entirely plausible.

The Normans themselves were descendants of Vikings who had settled in France in the early 900s. So when King Henry uses the old Norse form of Harold's name, it's a subtle nod to their shared ancestral roots—and a sign of personal familiarity. He's not using a formal title; he's using the name from the youth of an old warrior.

---

**Q: Harold "Red-Wolf" is Saxon, but he has a Norse name and serves Norman kings. Isn't that confusing?**

**A:** It might seem that way, but actually it reflects the beautiful complexity of medieval England and the English language!

By 1113, when our story takes place, England had been shaped by waves of settlement: Celts, Romans, Angles, Saxons, Vikings, and Normans. A man like Harold represents that layered history. He is:

* **By ancestry:** Saxon (with Norse roots in the Danelaw)
* **By loyalty:** A servant of the Norman crown
* **By reputation:** "Red-Wolf," a nickname earned by his deeds
* **By relationship:** An old warrior remembered personally by the king

This complexity enriches the story. It shows that identity in the Middle Ages wasn't simple—and that loyalty, courage, and honor transcended the labels of "Saxon" or "Norman."

---

**Q: Does this matter for the story?**

**A:** Yes—in a wonderful way!

Harold's Saxon heritage creates a quiet but powerful theme. Here is a man from a conquered people, yet he is honored by the king, his daughter marries a prince, and his ancient bloodline is called "good blood of an ancient house." This echoes the story's deeper message: true worth is not a matter of birth or conquest, but of character and deeds.

When Henry later says, *"If my blood is weak, no crown can help the boy. If it is royal, no rags can hide it,"* he could almost be talking about Harold—a man whose nobility needed no crown to prove it.

---

### 🦢 The Journey: Social Cues & Logistics

Beatrice walking five miles to the Royal Lodge at **Brigstock** isn't just about exercise; it's a statement of her status and her survival skills.

* **Avoiding Tolls:** Riding a horse often meant paying "palfrey taxes" or forest tolls to the King's officers (the **Agisters**).
* **The "Peaceful Petitioner" Gesture:** The act of raising both palms (*ostentatio manuum*) was a recognised legal and social gesture. It proved the petitioner was unarmed and was a common posture for those seeking mercy or making a formal request of a superior.
* **Maidenly Modesty (Hair and Rings):** In the 12th century, loose, uncovered hair was the primary signifier of an unmarried maiden. Once married, a woman was socially and religiously required to wear a wimple or veil. Similarly, the absence of a ring or band on the hand and by naming her father's household, it is all clear enough that she is still under her father's "*mund*" (legal protection/guardianship).
* **The Goose Factor:** A large, angry white goose is much easier to carry in a basket than to balance on a galloping horse!

---

### 👑 The Royal Court: Secrets & Legends

* **Queen Matilda's Secret Heritage:** Though the court called her by her Norman name, Matilda, she was born a Saxon princess named Edith. Her marriage to Henry I was a calculated political move to appease the English population. Because of her own Saxon roots, the Queen's eventual "softening" toward Beatrice carries a deeper historical weight.
* **The Lamprey Legend:** Henry I was famously fond of lampreys (eel-like jawless vertebrates). His death in 1135 was famously attributed by the chronicler Henry of Huntingdon to a "surfeit of lampreys," which the King ate against his physician's advice.

---

### 👵 What About the Mothers?

**Q: We hear a lot about the fathers in this story—Harold and Henry. But what about the mothers? Who was Godfrey's mother? And what happened to Beatrice's mother?**

**A:** Wonderful question! The story focuses on the fathers because medieval inheritance and politics ran through the male line, but the mothers are present in the story's silences. Here's what we know—and what we can surmise.

---

#### 👑 Godfrey's Mother: The Unknown Mistress

King Henry I is famously credited with fathering the **most illegitimate children of any English monarch—over 20 in total**. While his legitimate children (William Adelin and Empress Matilda) were born to Queen Matilda of Scotland, his "natural" children like Godfrey came from a series of mistresses whose identities were rarely recorded.

| Fact | What We Know |
| :--- | :--- |
| **Who was she?** | Her name is lost to history—deliberately. Chronicles recorded the names of kings and bishops, not the women who bore their bastards. |
| **What was her status?** | She was likely a noblewoman, possibly from a Norman or English family. Henry's illegitimate children were married into high noble houses, suggesting their mothers had status enough that the children were considered marriageable. |
| **Did she raise Godfrey?** | Probably not. Anglo-Norman royal children, legitimate or otherwise, were often raised in households separate from their parents. They might be sent to noble families for fostering or placed in religious houses for education. |
| **Did she have other children?** | Possibly. Henry's illegitimate children had several different mothers. Godfrey may have had full siblings, or he may have been the only child of this particular union. |
| **Was she still alive in 1113?** | Possibly, possibly not. She would have had no formal role at court regardless. As an unmarried mistress, her position was entirely dependent on the king's favor. |

**What we can imagine:** She was likely young when she caught Henry's eye—perhaps a lady-in-waiting, a daughter of a loyal baron, or a noble widow. Their relationship may have been brief or lasting; we simply don't know. What we do know is that she gave Henry a son, and that son grew up to be a man of "quiet grace" who knew how to wait.

---

#### 🏡 Beatrice's Mother: The Lady of Stanwey

Beatrice's mother is never named in the story, but her presence is felt throughout. The READER questions section reveals one crucial detail:

> **"How did she come to raise the goose herself? AK: Regarding Goosie, Beatrice's late mother was actually the one that arranged for Beatrice to be there when Goosie hatched from an egg."**

This tiny detail opens a window into who she was.

| Fact | What We Know or Can Surmise |
| :--- | :--- |
| **She is deceased by 1113** | Harold is alone with Beatrice at the start of the story. The fact that Beatrice manages the household "without murmur" suggests she has stepped into her mother's role. |
| **She arranged for the goose** | This tells us she was thoughtful, forward-looking, and understood the value of small joys. She knew her daughter would love raising a gosling. |
| **She taught Beatrice** | Beatrice's skills—tending the sick with herbs and medicine, overseeing the brewing and the buttery, managing the manor—would have been learned from her mother. |
| **She was Harold's wife** | As the wife of a Saxon thegn who had fought in the wars following the Conquest, she lived through turbulent times. She may have been a Saxon woman from a neighboring family, or perhaps the daughter of another thegn. |
| **She likely had other children** | The story mentions Beatrice has "no brother to defend the holding." This doesn't mean she had no siblings—only that she had no *brothers*. Sisters would not affect the inheritance. |

**What we can imagine:** She was the practical heart of Stanwey—the one who knew which herbs healed fevers, which villagers could be trusted, and how to stretch provisions through a hard winter. She saw in Beatrice the same capable spirit and nurtured it. Her death left a void that Beatrice quietly filled, and a grief that Harold carries in his tired bones.

---

#### 👸 The Queen as Stepmother

Queen Matilda was a real person. Her relationship to fictional Godfrey adds another layer to the story's exploration of motherhood.

| Fact | Relevance |
| :--- | :--- |
| **Matilda was known for piety and learning** | She ran a cultured court, patronized the arts, and was deeply involved in governance. When Henry was away, she governed in his name. She would have set expectations for all the young people in her household. |
| **She had her own children to protect** | Her son William Adelin was the heir. Her daughter Matilda (later Empress) was married into German nobility. Her primary loyalty was to them. |
| **Step-relations were complex** | Royal stepmothers were expected to care for all children in the household, but their first duty was to their own offspring. This tension is exactly what we see in Chapter 4. |

When the Queen calls Godfrey a "weak whelp" and a "sad shadow," it's not simple cruelty—it's a woman trying to clear a path for her own child, while trying to care for another. Her later softening toward Beatrice, noted in the wedding chapter, reflects both her own Saxon heritage (which would make her sympathetic to Beatrice's bloodline) and perhaps a recognition that she had been too harsh.

---

#### 👵 The Mothers' Legacy

Though neither mother appears in the story, both shape it:

| Mother | Legacy |
| :--- | :--- |
| **Godfrey's mother** | Gave him royal blood and a place at court, then stepped aside—as mistresses had to—leaving him to navigate the world on his own. His patience and quiet grace may have been her gifts. |
| **Beatrice's mother** | Trained her daughter to manage a manor, tend the sick, and speak her mind. She gave her a goose—a small thing that became the instrument of fate. |
| **Queen Matilda** | Complicates the story with her very human conflict: love for her own child versus duty to her stepson. Her arc from suspicion to acceptance mirrors the story's theme that true worth reveals itself. |

**In short:** The mothers are absent but not absent. They live on in what their children have become—and in one case, in a goose that waddles where kings must wait.

---

### 🛡️ Social Hierarchy: Who's Who?

| Title | Role |
| --- | --- |
| **Thegn** | A Saxon noble (Harold). High status, but fading fast under Norman rule. |
| **Reeve** | The village headman. The "bridge" between the peasants and the Lord. |
| **Knight** | The Norman elite (Sir Guy). They often speak **Old French** and look down on Saxons. |
| **Villein** | A peasant tied to the land. They provide the labour that keeps the Hall running. |


---------------------------------------------
# Η Χήνα Νύφη (The Goose Bride - In Greek — from an earlier edition)
---------------------------------------------
Στα αγγλικά μέσα της χώρας, σε εκείνη τη γη που κάποτε ονομαζόταν Μερκία (τώρα τα Μίντλαντς), ζούσε μια νεαρή γυναίκα ονόματι Βεατρίκη. Τα μάτια της έλαμπαν σαν το καλοκαιρινό ουρανό και τα μαλλιά της ήταν άγρια και ξανθά σαν ανεμοδαρμένο λιβάδι. Μοναδική συντροφιά της ήταν ο πατέρας της, ο Χάρολντ, ένας γηρασμένος βετεράνος πολέμου. Οι ένδοξες μέρες του είχαν πια επισκιαστεί από την κακή υγεία και τα τσουχτερά κρύα του χειμώνα που τον πονούσαν στα κόκαλα, τουλάχιστον έτσι έλεγε στους παλιούς του φίλους όταν τον επισκέπτονταν.

Μια μέρα, ένας αγγελιοφόρος έφερε νέα στο σπιτικό τους. Ο βασιλιάς θα κυνηγούσε κοντά και απαιτούσε φόρο: δύο φτερωτά βέλη και ένα πουλερικό για το τραπέζι του. Η Βεατρίκη κοίταξε φοβισμένη τον πατέρα της, γιατί η μοναδική τους κότα κατάλληλη για βασιλικό τραπέζι ήταν η Χήνα - μια χοντρή, λευκή χήνα που την είχε μεγαλώσει η ίδια με το χέρι. Ήταν η αγαπημένη της συντροφιά και τα μάτια της βούρκωσαν καθώς ο πατέρας της έπαιρνε μια δύσκολη απόφαση. "Αυτό είναι το καθήκον μας, κόρη μου", είπε βραχνά, η φωνή του βαριά από τύψεις (γιατί η Χήνα έφερνε και πολλά αυγά).

Η Βεατρίκη καταλάβαινε την υποχρέωση, όμως, το ελεύθερο πνεύμα της δεν μπορούσε να δεχτεί τον χαμό της αγαπημένης της χήνας. "Ποιος είναι αυτός που απαιτεί τη Χήνα μας; Δεν έχεις προσφέρει αρκετά στον βασιλιά, πατέρα; Θα ήθελα να του πω μερικά καλά λόγια!"

Η απάντηση του πατέρα της ήταν μια τυπική σοφή συμβουλή: "Ένα στέμμα, Βεατρίκη, είναι ένα βαρύ φορτίο. Ένας βασιλιάς υπηρετεί το βασίλειο και οι απαιτήσεις προς αυτόν πρέπει να εκπληρωθούν, ακόμα κι αν φαίνονται σκληρές. Είναι άνθρωπος σαν κι εμάς, μα έχει λίγους φίλους στους οποίους μπορεί να εμπιστευτεί τυφλά. Η ζωή του μπορεί να είναι τόσο ευλογία όσο και βάρος. Για αυτό, θα πάω εγώ τη χήνα αύριο".

Η Βεατρίκη διαφώνησε έντονα. "Όχι, πατέρα, χρειάζεσαι την ανάπαυση σου. Άσε τον Γουίλφρεντ, τον γείτονά μας, να την πάει ή..." Με ένα τολμηρό σχέδιο να στριφογυρίζει στο μυαλό της, ανακοίνωσε: "Αν μπορώ, πατέρα, ίσως να την πάω εγώ".

Έτσι τα συμφώνησαν και το επόμενο πρωί, Βεατρίκη ξεκίνησε το ταξίδι της με τη ζωντανή χήνα σφιχτά κάτω από το μπράτσο της. Τα νευρικά κρώξιματα του πουλιού αντηχούσαν σε όλο το χωριό. Το κατάλυμα του βασιλιά έσφυζε από δραστηριότητα. Φρουροί στέκονταν αγέρωχοι στις επάλξεις, ενώ μάγειρες έτρεχαν στην κουζίνα ετοιμάζοντας το βασιλικό γεύμα. Η Βεατρίκη, κρατώντας τη χήνα πιο σφιχτά, πλησίασε το πολυάσχολο προσωπικό και ρώτησε για να παραδώσει τα "πουλερικά".

Εν τω μεταξύ, μέσα στο κατάλυμα, ο βασιλιάς και η βασίλισσα βρίσκονταν σε μια ακόμα περίοδο "ζωηρών συζητήσεων" όπως τις ονόμαζε ο βασιλιάς (περισσότερο διαφωνίες παρά καβγάδες). Η βασίλισσα προτιμούσε τη ζωή στις πόλεις, ενώ ο βασιλιάς δεν αγαπούσε τίποτα περισσότερο από το ατέρμονο κυνήγι στην εξοχή. Η βασίλισσα λάτρευε τις έξυπνες και όμορφες συζύγους που είχε διαλέξει για τους δύο μεγαλύτερους γιους τους, αλλά ο βασιλιάς πίστευε ότι διψούσαν υπερβολικά για εξουσία και πλούτη.

Η βασίλισσα είχε βάλει εδώ και πολύ καιρό στόχο να βρει μια γυναίκα για τον γιο της που είχε απομείνει, τον Γοδεφρείδο, αν και δεν ήταν τόσο όμορφος ή ευφυής όσο οι μεγαλύτεροι αδερφοί του. Ο βασιλιάς, σε μια έκρηξη απογοήτευσης από τις ατέρμονες συζητήσεις για το θέμα, της φώναξε (πολύ πιο δυνατά απ' όσο σκόπευε), "Κυρία μου, η επόμενη κατάλληλη δεσποινίδα που θα μπει από αυτή την πόρτα θα γίνει η νύφη του γιου σας!"

Ευτυχώς για όλους, η κακή διάθεση του βασιλιά διαλύθηκε γρήγορα με την θορυβώδη είσοδο μιας μεγάλης λευκής χήνας που πέταξε φτερουγίζοντας μέσα στο δωμάτιο και άρχισε να τρέχει πανικόβλητη, κυνηγημένη από έναν γραμματέα και αρκετούς φρουρούς. Ο βασιλιάς ξέσπασε σε γέλια με το θέαμα, άρχισε να την κυνηγάει κι εκείνος και τελικά την έπιασε μόνος του, ακριβώς την ώρα που ετοιμαζόταν να δαγκώσει τον γραμματέα.

"Σε παρακαλώ, μην πειράξετε τη Χήνα!"

Ο βασιλιάς ανοιγόκλεισε τα μάτια του και κοίταξε γύρω του για να βρει την πηγή της άγνωστης φωνής. Τελικά είδε μια νεαρή γυναίκα να τον κοιτάζει με μεγάλο φόβο. Ο βασιλιάς σήκωσε τα φρύδια του. "Η δική σου χήνα;"

"Ναι, κύριε. Θέλω να πω όχι, κύριε. Θέλω να πω είναι δώρο από τον πατέρα μου σε εσάς (μαζί με δύο βέλη, κύριε), αλλά σας παρακαλώ μην φάτε τη Χήνα."

Ο βασιλιάς χαχάρισε. "Λοιπόν, η Χήνα μου έδωσε το καλύτερο κυνήγι της ημέρας... αλλά ποιος είναι ο πατέρας σου;"

"Τον λένε Χάρολντ Ρεντ-Γουλφ, κύριε."

"Ο γέρος Χράθουλφρ! Πολέμησε υπό τις διαταγές του πατέρα μου, ένας καλός άνθρωπος ήταν. Η γη του είναι κοντά;"

"Ναι, κύριε, αλλά εφτά μίλια ανατολικά από εδώ. Σας ζητάει συγγνώμη που δεν ήρθε ο ίδιος λόγω της κακής του υγείας."

"Λοιπόν, μπορείς να του πεις ότι την επόμενη εβδομάδα θα τον επισκεφτώ εγώ ο ίδιος. Του χαρίζω μια χήνα."

"Α, σας ευχαριστώ, κύριε. Σημαίνει πολλά για μένα. Θα του το πω."

Καθώς το κορίτσι και η χήνα αποχωρούσαν, η βασίλισσα στράφηκε επειγόντως στον βασιλιά. "Δεν μιλούσατε σοβαρά, ελπίζω."

"Για ποιο πράγμα; Για την επίσκεψη;"

Η βασίλισσα τον κοίταξε αυστηρά. "Δεν θέλω καμία κοπέλα της χήνας για νύφη του γιου μας."

Ο βασιλιάς γέλασε σιγανά. "Γραμματέα. Τι είπα νωρίτερα;"

Ο γραμματέας κοίταξε νευρικά τη βασίλισσα. Ήξερε ότι τα προηγούμενα λόγια του βασιλιά ειπώθηκαν βιαστικά, χωρίς πολλή σκέψη, κυρίως ως έκφραση της εκνευρισμού του βασιλιά. "Ο γιος σας θα παντρευτεί όποια κατάλληλη νεαρή γυναίκα μπει από την πόρτα στη συνέχεια, κύριε."

Ο βασιλιάς έγνεψε καταφατικά και κάλεσε τον γιο του να πάει να συνοδεύσει τη νεαρή γυναίκα σπίτι της με ασφάλεια. Η βασίλισσα φαινόταν χλωμή. "Άρχοντά μου, δεν μπορείς να μιλάς σοβαρά. Μια κοινή θνητή;"

"Να τον παντρέψω καλύτερα με τη χήνα; Χα! Ήταν η πρώτη που μπήκε από την πόρτα, τελικά." Ο βασιλιάς χαμογέλασε πλατιά. "Η κόρη του Χάρολντ κατάγεται από καλό σόι."

Η αυλή ήταν σε κατάσταση σοκ, αλλά ως άνθρωπος του λόγου του, ο βασιλιάς ανακοίνωσε, "Ο Πρίγκιπας Γοδεφρείδος θα παντρευτεί την κόρη του Χάρολντ Χράθουλφρ."

Όσο για τον νεαρό πρίγκιπα και τη Βεατρίκη, αν και έκπληκτοι, αφού πέρασαν κάποιο χρονικό διάστημα μαζί (οι επισκέψεις του πρίγκιπα έγιναν τακτικές), οι δυο τους χάρηκαν να παντρευτούν. Σε σύντομο χρονικό διάστημα, η βασίλισσα συγχώρεσε τον βασιλιά, περιστασιακά τον ανέβαζε το ηθικό λέγοντάς του ότι ήταν καλό που δεν είχαν άλλους γιους, διαφορετικά θα μπορούσε να καταλήξει με μια χήνα στην οικογένεια.


Τέλος καλό, όλα καλά! Η ιστορία της Βεατρίκης και της Χήνας της έγινε αγαπημένο παραμύθι ανάμεσα στους ανθρώπους του βασιλείου. Κάποιοι ψιθύριζαν για καλή τύχη που ήρθε με τη μορφή μιας χήνας, άλλοι για τη σοφία του βασιλιά να τηρεί τον λόγο του και μερικοί για την ευτυχία που βρήκε ένας πρίγκιπας με μια απλή κοπέλα. Όποιος κι αν ήταν ο λόγος, η βασιλική αυλή γνώρισε μια περίοδο ειρήνης και χαράς χάρη στην έξυπνη Βεατρίκη και τη γενναία της χήνα.

(Τέλος καλό, όλα καλά! -  All's well that ends well!)

---

## Blurb

In the halls of Kings, fate is a feathered thing.

England, 1113. Behind the heavy stone walls of Rockingham, King Henry I is losing his patience. Trapped between Queen Matilda’s negotiations with the House of Anjou and the restless spirits of a conquered land, the King issues a reckless, wine-soaked decree to silence his court: the very next maiden to walk through the hall doors shall marry his son, Godfrey FitzRoy—be she noble or milkmaid.

They expect a lady of the court. They expects a political solution.

Instead, the doors swing wide for Beatrice, the sharp-witted daughter of a fallen Saxon warrior known as the Red-Wolf. She hasn't come for a crown or a husband; she has come to save her prize goose from the King's table.

---
## More READER Questions

> How did she come to raise the goose herself?

AK: *Regarding Goosie, Beatrice's late mother was actually the one that arranged for Beatrice to be there when Goosie hatched from an egg. Geese can live for up to 30 or more years. The King (I suspect) was mainly hoping for a good hunt; things were generally going well for Henry I in 1113, though he came to regret some of his decisions over the next decade; presumably his new daughter-in-law was not among those. :)*



---

## ✅ LICENSE

> **Text (English and Greek):** © 2024-2026 Andrew Kingdom. This work in its entirety is licensed under a Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License (CC BY-NC-ND 4.0). Educators may reproduce this story for classroom use without additional permission. All other rights, including film, translation, and commercial adaptation, are reserved.
>
> **Images:** © 2024-2026 Andrew Kingdom. Images are covered under the same CC BY-NC-ND 4.0 license as the text. For commercial or print publication, please contact the author for licensing.
>
> **Greek version:** Licensed exclusively to Greek Fairy Tales for publication. All other rights remain with the author.
>
> **Attribution for educators:** When sharing, please include: *"The Goose Bride" © 2024-2026 Andrew Kingdom, used under CC BY-NC-ND 4.0. Original at [https://akingdom.github.io/articles/The_Goose_Bride].*
