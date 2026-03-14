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

One autumn morning, the Stanwey village smithy was startled by the heavy thud of a horse passing through. A servant peered from the main doorway of Harold’s timber manor as a royal rider pulled up, his cloak stained with the road.

Without dismounting, the rider unrolled a stiff parchment. He ignored the servant entirely, projecting his voice toward the high timber gables as if the hall itself were the only thing worthy of his breath. With the sharp, clipped accent of the Norman court, he proclaimed:

“The King hunts in Rockingham Forest.”

He held the *writ* high, its wax seal catching the morning light. Rockingham was the King's forest, and the King’s forest had its own laws. A man might lose a hand for taking the King’s deer, yet a king might take from a man without apology. Under the right of *purveyance*, landholders such as Harold were expected to provide food and supplies whenever the royal court moved through the shire.)

“This holding shall render its service: two feathered arrows and a fowl for His Majesty’s table.”

Beatrice immediately looked at the goose.

The goose honked at her.

The King's servant quickly returned to his impatient horse, brushing imagined dust from his cloak as he departed.

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

“The *agisters* will strip the very shoes from a horse as a 'grazing tax,' and the *foresters*? They bleed a man merely for looking at a deer; petty tyrants! Besides, the Reeve has a large, hungry family, and Goosie would just as like end up in his pot, before they even saw the forest!"

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

“And yet, you pressed the French King hard enough at Gisors that he yielded the west lands to you,” she countered. “Brittany—that rugged rugged sentinel—it is yours in all but name now, and your daughter sits there as Duchess. It is a solid shield for our borders overseas.”

She watched his jaw relax. He liked the map she was drawing.

“In fact,” she added, her voice dropping, “I have recently had news from that very place.”

Only then did his expression soften a little. "What news?"

![Chapter](Goose_Bride-goosemark-cut_small.png) 

## Chapter 4 — The Breton Offer

Matilda leaned closer to the King, her voice dropping.

"A message from Brittany, my lord. From your son-in-law, Duke Conan."

Henry's eyes narrowed, but he said nothing. He waited. 

She drew a parchment from her sleeve. "He has a daughter—Agnes, fair and of marriageable age. They propose a match... with your son Godfrey. Even old Alain, the Duke's father, gives his blessing."

Slowly, very slowly, a smile spread across Henry's face; but not a warm smile, rather like that of a man who had just spotted a fox climbing into his henhouse.

"Alain and Conan both want my son?"

He read the letter, his thumb tracing the wax seal of the House of Cornouaille. 

The Queen pressed forward, uncertainly. “It is a clever move, my lord,” she pressed. “Alain is retiring to a monastery. They want to bind their house to ours with a second knot. It would reinforce our borders.”

Henry set the parchment down. "That is the point. Old Alain is fading and so he must look at his son Conan and wonder: is he strong enough to stand alone? So he reaches for Godfrey as a second to his son, in case the first should fail. It is an ill wind blowing from the south."

The Queen frowned. "Why call it treachery, not stronger family ties?"

Henry laughed his short, sharp bark. "Fie, I say! Family feeling? Nay Madam; my own brother sits in a dungeon for trying to steal my crown."

He leaned forward.

"Once Godfrey is there, with Breton lords whispering in his ear—a king's son, a warrior's blood—how long before some start thinking *he* would make a fine duke? How long before Conan sees the threat and turns on him? Then I must choose: lose my son, or march on Brittany."

He crumpled the letter.

"No. Godfrey stays here."

The Queen's voice rose sharply, in a rare display of annoyance with the King. "Here under your shadow? Our son William has Anjou. Your daughter Matilda FitzRoy has Brittany. Your nephews have lands over the sea. Yet what name has Godfrey?"

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

"My lifeblood is in all my children and they each bring much joy. If my blood is weak, no crown can help the boy. If it is royal, no rags can hide it."

![Chapter](Goose_Bride-goosemark-cut_small.png) 

## Chapter 5 — The King's Decree

King Henry turned and spoke strongly to everyone assembled in the great hall.

"My father was mocked as the Tanner's Grandson by every noble in Paris. Did he wait for their blessing? No. He carved his kingdom with a sword. We are kings because God willed it, not because nobles permitted it."

Emboldened by the King's speech, Roger of Salisbury, the King's Justiciar and keeper of the royal purse, stepped from the shadows. He kept his head bowed, his tone placatory but fixed on the ledger—as if a marriage were no different from a shipment of wool.

"My Lord King," Roger murmured into the silence, "since the boy needs a wife, and a marriage is a contract of the state... well. If Brittany will not serve, there are other houses with daughters. We need only find the best bargain. The boy is sure coin enough."

Henry turned to look at him.

Not with anger. With something worse: an odd humour, a dangerous smile playing at the corners of his mouth.

"Coin," Henry repeated softly. "You think my son is coin. To be weighed. Bartered. Sold to the highest bidder."

Roger's mouth opened, then closed. He realized, too late, that he had stepped where no ledger could protect him.

Henry's voice dropped, but it carried to every corner of the hall.

"If Godfrey is a shadow, let us see if the shadow can find the sun. If he be a coin, then we shall toss him to the Heavens and see how he lands. "

He jabbed a finger toward the carved entrance of the hunting lodge.

"The next pure maid to cross that threshold—be she a Saxon virgin, a Norman heiress, or a milk-stained scullion—she shall be his wife! If God deems him royal, He shall send a match of equal fire. If not... let the winds take him. If he cannot thrive with a peasant at his side, he was never my son at all."

The Queen stared at him uncertainly, her face pale. "You cannot possibly mean to cast his life so blindly to the winds."

The King's posture relaxed, the explosive fire cooling into a stony, dismissive indifference. He waved a hand as if swatting a fly.

"If the Heavens wish him wed, they shall provide the woman. Elsewise let us hope the halls stay empty, that I may drink in peace."

He reached for his wine.

The hall settled into an uneasy silence. Some knights sat frozen in shock, their hands hovering over their daggers. Others smirked into their wine, half hoping to see the King's pride stumble.

A few older lords simply looked at the floor, knowing the awkward truth: the King had spoken a sacred vow before the court. If a beggar girl came in that door, Henry would have to marry his son to her or become a liar before God. If he broke his word, his knights would no longer have to keep their own oaths to him.

He had built a cage out of his own pride, with no easy escape.

![Chapter](Goose_Bride-goosemark-cut_small.png) 

## Sir Guy’s Spite

Beatrice reached the hunting lodge by midday.

The place swarmed with soldiers and servants. 

The hall was still nursing the King's mood. Nobles muttered into their wine, casting dark looks toward the doors. A spilled cup, a whispered curse—the court was a pot waiting to boil, and any stranger who entered would feel the steam. 

As Beatrice entered, carrying the handmade basket and dusty from the journey, a young Norman knight lounging near the doorway recognised her.

**Sir Guy de Montfort.**

Months earlier, Beatrice and her father had travelled up to the Midsummer Feast of St John (held at St Andrews parish church). While the elders shared ale by the bonfires, Sir Guy had cornered her, boasting of his lineage and the "civilising" hand his family had brought to the inferior Midlands.

Insulted, Beatrice had politely begged to be excused, then to go and find her father.

He had called after her then: “A Saxon maid with a fading father and no brother to defend the holding should be more accommodating to a Norman blade. Else, your lands escheat to the King and your hall is burned for charcoal!”

She had told him coldly that she preferred men who worked for their supper, not some fine *popinjay* who lived off the sweat of others.

He had not forgotten the insult.

Seeing her now amused him: standing in the King’s royal hall with a smudge of charcoal on her nose.

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

“My troth! A goose in the king’s hall.”

The bird leapt onto the king’s table.

Henry burst into laughter.

“Well! At last a lively hunt!”

He lunged and caught the goose just as it snapped at the clerk's rear end.

At the sound of Goosie's distressed squawking, Beatrice burst into the hall, long hair flying and uncovered.

“Please don’t hurt Goosie!”

The King blinked.

“Your goose?”

Laughter rippled throughout the hall. 

Sir Guy, called out rudely. "This Saxon girl needs a lesson that her father's hall could not teach."

Beatrice suddenly remembered whose hall she had entered. Her heart hammered against her ribs like a trapped bird. She instinctively flung up both hands, unadorned palms outward in the ancient sign of a peaceful traveller. All eyes turned toward her as she curtsied low. Drawing courage in the silence, she spoke.

“She was meant for your table, sire… but if it please you, spare her.”

Henry chuckled, his eyes glinting with a curious merriment. 

"At last—an honest creature in this hall. Spare the goose, you plead?"

It was a novelty for a petitioner to plead for a bird’s life while her own head sat so precarious.

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

“And you, de Montfort—the door will hold up fine without you! If the daughter of a Red-Wolf can walk five miles with a basket, a knight of my guard can surely find some honest work to do before sunset.”

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

## **Chapter 4 — The Breton Offer**

1. **The Trap:** Why does Henry believe the marriage offer for Agnes of Brittany is a "fox in his henhouse" rather than a kind gesture?
2. **Family Feeling:** Henry says "Family feeling fills dungeons." Based on what you know of his brothers, why does he find "kindness" dangerous?
3. **The Queen’s Motive:** The Queen calls Godfrey a "weak whelp" and a "sad shadow." Why does she want him sent across the sea to Brittany?
4. **The Whetstone:** Henry describes Brittany as a "whetstone." What does he fear the Bretons will do with his son if he sends him there?
5. **Creative:** If you were Duke Alain of Brittany, write the one "personal note" from Godfrey’s sister Matilda that would be most likely to convince him to come.

**Knight's Challenge:**
Henry says he cannot trust his own daughter because her loyalty is now to her husband’s land. In the medieval world, how did marriage change a woman’s political "team"?

---

## **Chapter 5 — The King’s Decree**

1. **The Tanner's Grandson:** Henry mentions his father (William the Conqueror) was mocked. How does his father’s history influence Henry's view on what makes a person "royal"?
2. **The "Coin" Insult:** Why does the King find Roger of Salisbury’s suggestion that Godfrey is "sure coin" so offensive?
3. **The Threshold Vow:** List the three types of women Henry says God might send through the door.
4. **The Cage of Pride:** Why would Henry’s own knights stop keeping their oaths to him if he broke his "next maid" vow?
5. **Creative:** Imagine you are a knight smirking into your wine at the end of the chapter. Write a short diary entry about what you hope walks through the door next.

**Knight's Challenge:**
Henry says, "If my blood is weak, no crown can help the boy." This reflects a medieval belief in *Innate Nobility*. Does Henry believe being a Prince comes from a title, or from something inside a person? Explain your answer.

---

### **Next Step**

Would you like me to finish the transition for **Sir Guy’s Spite**, focusing on how he uses the King’s "blistered" mood to justify tripping Beatrice as she enters the hall?
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


## 📜 Fact Sheet: The World of the 'Goose Bride' (12th-Century England)

This guide provides the historical "bones" for our story. It explains why Beatrice walks, why her father is worried, and how the law of the forest rules their lives.

---

### 🏰 The Home: Life in the "Hall"

In the 1100s, Beatrice and Harold don't live in a house—they live in a **Hall**.

* **The Structure:** A timber-framed "longhall" with a central fire-pit. There are no chimneys; smoke escapes through a hole in the thatch roof.
* **The Saxon Thegn:** Harold "Red-Wolf" represents the Thegns, the pre-Conquest Saxon nobility. While many lost their lands to Norman lords, some were kept on as foresters or local officials because of their deep knowledge of the terrain and their martial skill.
* **The Status:** The Hall is the heart of the community. It’s where the **Manorial Court** is held and where villagers bring their "renders" (taxes paid in eggs, grain, or ale).
* **The Upkeep:** The villagers (called **villeins**) owe Harold "boon-work." They are legally required to help repair his roof or stone walls.

### 🌲 The Law: The King’s Forest & Purveyance

Stanwey is located within **Rockingham Forest**. In the 1100s, a "Forest" wasn't just trees; it was a legal zone where the King’s word was absolute.

* **Rockingham Forest & Purveyance:** Rockingham was a Royal Forest, subject to "Forest Law" rather than Common Law. This gave the King absolute power over the land, its deer, and its inhabitants. **Purveyance** was the dreaded royal right to seize food and transport from locals to support the travelling court.
* **Vert and Venison:** It was a crime to cut "green wood" or hunt the King’s deer. Even carrying a bow could lead to a massive fine.
* **The "Lawed" Dog:** To protect the deer, any large dog kept for protection had to have three claws removed from its front feet (called "expediting") so it couldn't chase game.
* **The Roman Road (Stanwey):** The name Stanwey refers to the Roman roads common in the Rockingham area. *Stan* means stone and *Wey* (or Way) means a thoroughfare or road. The **Gartree Road**—an ancient, straight, stone-paved Roman highway—is the main artery for messengers and charcoal-burners.

### ⚖️ Politics, Land and Lineage

The legal landscape of the 1120s was defined by the struggle between the old Saxon ways and the new Norman rules.

* **The Son-less Lord:** In Norman law, land is held in exchange for military service. Because Harold has no son to fight for him, his land is "vulnerable."
* **The Ward of the Crown:** If Harold dies, the King has the legal right to choose Beatrice’s husband—usually a Norman knight who wants her land.
* **The "Scutage" (Shield Money):** Harold likely sold his warhorses to pay "scutage"—a tax paid to the King to avoid going to war in his old age.
* **The King’s Brother (Robert Curthose):** Henry I’s eldest brother, Robert, was Duke of Normandy. Their relationship was defined by bitter rivalry. Henry eventually defeated Robert at the Battle of Tinchebray (1106) and kept him imprisoned for the rest of his life—making the King’s jokes about Robert’s "wet wit" and "sodden toad" historically biting.
* **Prince Godfrey (The "Natural" Son):** King Henry I is famously credited with fathering the most illegitimate children of any English monarch (over 20). While the "Lord Godfrey" of this story is fictional, Henry frequently used his "natural" children to build political bridges and reward loyal families.

### 🦢 The Journey: Social Cues & Logistics

Beatrice walking five miles to the Royal Lodge at **Brigstock** isn't just about exercise; it’s a statement of her status and her survival skills.

* **Avoiding Tolls:** Riding a horse often meant paying "palfrey taxes" or forest tolls to the King's officers (the **Agisters**).
* **The "Peaceful Petitioner" Gesture:** The act of raising both palms (*ostentatio manuum*) was a recognised legal and social gesture. It proved the petitioner was unarmed and was a common posture for those seeking mercy or making a formal request of a superior.
* **Maidenly Modesty (Hair and Rings):** In the 12th century, loose, uncovered hair was the primary signifier of an unmarried maiden. Once married, a woman was socially and religiously required to wear a wimple or veil. Similarly, the absence of a ring or band on the hand and by naming her father's household, it is all clear enough that she is still under her father's "*mund*" (legal protection/guardianship).
* **The Goose Factor:** A large, angry white goose is much easier to carry in a basket than to balance on a galloping horse!

### 👑 The Royal Court: Secrets & Legends

* **Queen Matilda’s Secret Heritage:** Though the court called her by her Norman name, Matilda, she was born a Saxon princess named Edith. Her marriage to Henry I was a calculated political move to appease the English population. Because of her own Saxon roots, the Queen’s eventual "softening" toward Beatrice carries a deeper historical weight.
* **The Lamprey Legend:** Henry I was famously fond of lampreys (eel-like jawless vertebrates). His death in 1135 was famously attributed by the chronicler Henry of Huntingdon to a "surfeit of lampreys," which the King ate against his physician's advice.

---

### 🛡️ Social Hierarchy: Who’s Who?

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
## READER Questions

> How did she come to raise the goose herself?

AK: *Regarding Goosie, Beatrice's late mother was actually the one that arranged for Beatrice to be there when Goosie hatched from an egg. Geese can live for up to 30 or more years. The King (I suspect) was mainly hoping for a good hunt; things were generally going well for Henry I in 1113, though he came to regret some of his decisions over the next decade; presumably his new daughter-in-law was not among those. :)*



---
(C) 2024-2026 Andrew Kingdom all rights reserved. Licensed to 'Greek Fairy Tales'. May be reproduced for educational use.
