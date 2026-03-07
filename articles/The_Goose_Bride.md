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
</style><script>// text to speech (notoriouly finicky to get right)
(function() {
    const synth = window.speechSynthesis;
    let isPaused = false;

    // A helper to get the container safely
    function getContainer() {
        return document.getElementById('audio-container');
    }

    // Heartbeat: Automatic switch back when finished
    setInterval(() => {
        const container = getContainer();
        if (container && !synth.speaking && !isPaused) {
            container.classList.remove('speaking');
        }
    }, 300);

    function getCleanText() {
        const root = document.querySelector('.markdown-body') || document.body;
        const clone = root.cloneNode(true);
        const selectors = 'header, nav, .audio-controls, script, style, #qrcode, h1';
        clone.querySelectorAll(selectors).forEach(el => el.remove());
        return clone.innerText.trim();
    }

    window.speechControl = {
        play: function() {
            const container = getContainer();
            if (!container) return;

            if (isPaused) {
                synth.resume();
                isPaused = false;
                container.classList.add('speaking');
            } else {
                synth.cancel();
                const utterance = new SpeechSynthesisUtterance(getCleanText());
                utterance.rate = 0.95;
                
                // Backup for standard-compliant browsers
                utterance.onend = () => {
                    isPaused = false;
                    container.classList.remove('speaking');
                };

                synth.speak(utterance);
                container.classList.add('speaking');
                isPaused = false;
            }
        },
        pause: function() {
            const container = getContainer();
            synth.pause();
            isPaused = true;
            if (container) container.classList.remove('speaking');
        },
        restart: function() {
            synth.cancel();
            isPaused = false;
            const container = getContainer();
            if (container) container.classList.remove('speaking');
            this.play();
        }
    };
})();
</script>
<div class="audio-controls" id="audio-container">
    <button id="play-btn" onclick="speechControl.play()">▶ Listen to this guide</button>
    <button id="pause-btn" onclick="speechControl.pause()">⏸ Pause</button>
    <button id="restart-btn" onclick="speechControl.restart()">🔄 Restart</button>
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

Beatrice lived with her father Harold in a small holding among the wooded hills of the Midlands.

In earlier days Harold had been known as **Red-Wolf**, a Saxon thegn who fought in the wars that followed the Conquest. He had ridden with kings, crossed blades with rebels, and once dragged a drowning Norman lord, the king's own brother, from a river crossing.

But battles fade, and wounds grow stiff in the winter.

Now Harold was an old man with iron-grey hair and aching bones. His sword hung above the hearth more as memory than weapon.

His daughter kept the household.

She had bright eyes, quick wit, and a habit of speaking her thoughts aloud before deciding whether she ought to.

Her closest companion was a large white goose she had raised from a gosling.

The bird followed her everywhere.

She called it **Goosie**.

![Chapter](Goose_Bride-goosemark-cut_small.png) 

## The King’s Demand

One autumn morning a royal messenger rode into the village.

“The king hunts in Rockingham Forest,” he announced.

Whenever the king travelled, villages were expected to provide **purveyance**: food and supplies for the royal household. Rockingham was his forest, and the king’s forest had its own laws. A man might lose a hand for taking the king’s deer, yet a king might take from a man without apology.

“This holding shall give two feathered arrows and a fowl for His Majesty’s table.”

Beatrice immediately looked at the goose.

The goose looked back.

Harold sighed.

“It must be done, daughter.”

Beatrice’s eyes filled with tears.

“But Goosie—”

“A crown is a heavy thing,” Harold said gently. “Kings must take much, for much is laid upon them.”

Beatrice folded her arms.

“I should like to tell this king what I think of that.”

Harold laughed softly.

“You may keep that thought to yourself.”

He reached for his cloak.

“I will take the tribute tomorrow.”

Beatrice shook her head.

“You should not walk that far in the cold, father.”

After a moment she said quietly:

“I will take it.”

Harold studied her face, then nodded.

“Very well. But remember whose hall you enter.”

![Chapter](Goose_Bride-goosemark-cut_small.png) 

## The King’s Frustration

The early hunt had gone ill, but Queen Matilda's mind was on farther shores, her expression a mirror of some anxiety.

“Young Godfrey must marry well,” she insisted. “Perhaps a maid of Normandy? It would quiet the restless spirits across the sea.”

Henry snorted.

“A pack of wolves would be sweeter in temperament and less likely to bite the hand that feeds them."

The queen sighed, mildly chafed.

“The boy needs a name of some gravity to anchor his place in this world. This is no time for lightness of heart.”

Henry turned back to his wine.

“It is never a jest with you, my dear.” 

The court pretended not to hear the discussion, for the queen held that king's son in high regard, despite old whispers about his legitimacy. Indeed, of the king's several sons, Godfrey FitzRoy bore such scorn with a quiet grace, learnt in the king's own hall. 

The queen leant over to the king and lowered her voice. 

"I hear that Count Fulk of Anjou wishes to solidify his new rank with a sweetness of peace through marriage. He stresses the urgency, my lord. If you do not sow this seed today, lest the Saxon lords see your son as merely a sad shadow."

The king had heard enough and slammed his cup down impatiently.

“Very well! If marriage must be decided today, then let fate decide it!”

He gestured toward the hall doors.

“The next pure maid who enters through that door shall marry the boy, noble or milkmaid!”

The Queen stared at him, her face pale.

“You cannot possibly mean to cast his life so blindly to the winds.”

Henry waved dismissively, as if swatting a fly.

“If the Heavens wish him wed, they shall provide the woman. Elsewise let us hope the halls stay empty to let me drink in peace.”

![Chapter](Goose_Bride-goosemark-cut_small.png) 

## Sir Guy’s Spite

Beatrice reached the hunting lodge by midday.

The place swarmed with soldiers and servants.

As she entered the hall carrying the basket, a young Norman knight lounging near the doorway recognised her.

**Sir Guy de Montfort.**

Months earlier he had tried to charm her at a market fair. Beatrice had laughed and told him she preferred men who worked for their supper.

He had not forgotten the insult.

Seeing her now in the royal hall amused him.

As she walked past, he extended one boot slightly.

Beatrice stumbled.

The basket flew open.

![Chapter](Goose_Bride-goosemark-cut_small.png) 

## The Goose Hunt

Goosie exploded from the basket in a fury of wings.

Servants shouted.

A secretary dropped his parchments.

The goose darted across the hall like a feathered arrow.

Someone muttered:

“My troth! A goose in the king’s hall.”

The bird leapt onto the king’s table.

Henry burst into laughter.

“Well! At last a lively hunt!”

He lunged and caught the goose just as it snapped at the secretary's rear end.

At the sound of Goosie's distressed squawking, Beatrice burst into the hall, long hair flying and uncovered.

“Please don’t hurt Goosie!”

The king blinked.

“Your goose?”

Beatrice suddenly remembered whose hall she had entered. Her heart hammered against her ribs like a trapped bird. She instinctively flung up both hands, unadorned palms outward in the ancient sign of a peaceful traveller. All eyes turned toward her as she curtsied low. Drawing courage in the silence, she spoke.

“She was meant for your table, sire… but if it please you, spare her.”

Henry chuckled, his eyes glinting with a curious merriment. It was a novelty for a petitioner to plead for a bird’s life while her own head sat so precarious.

“Spare the goose, you say? She has earned mercy from my knife, for she has already graced my table with more sport than my knights.”

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

He roared with excited laughter in sudden recognition.

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

Nervously, the secretary stepped forward to intervene.

“Your Majesty, I believe the queen refers to your royal oath that the next eligible maiden entering the hall should wed Master Godfrey.”

The king's grin returned with a dangerous sort of mischief.

"It seems, Matilda, that the Heavens have a sense of humour. And they have sent us a Red-Wolf's daughter."

The queen grew pale.

“My lord, consider what sorrow of reputation a peasant will bring your son.”

The king shrugged.

“Would you rather the boy marry the goose? It arrived first.”

Laughter rippled through the court.

“And besides,” Henry added, “the daughter of Red-Wolf is good blood, even if Saxon.”

He called aside his youngest son.

“Godfrey, take a pair of riders and see the young lady safely home.”

Then he decisively proclaimed before the court:

“My son, Godfrey, shall marry the daughter of Harold Red-Wolf.”

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

Their wedding was held the following summer.

Nobles came reluctantly at first, expecting scandal.

Instead they found a bright-eyed bride who moved through the court with quiet confidence.

Even the queen eventually softened and called it a good thing.

And when the wedding procession left the chapel, a plump white goose waddled proudly ahead of them.

Someone in the crowd chuckled.

“Look there — the goose leads the bride.”

An old woman nearby nodded knowingly.

“Aye,” she said.

“Did I never tell you? In Mercia they say a goose may wend where a King must wait."

And so it did.

![Chapter](Goose_Bride-goosemark-cut_small.png) 

---
## Historical Footnotes
---

*   Rockingham Forest & Purveyance: In the 1100s, Rockingham was a Royal Forest, subject to "Forest Law" rather than Common Law. This gave the King absolute power over the land, its deer, and its inhabitants. Purveyance was the dreaded royal right to seize food and transport from locals to support the travelling court.
*   Stanwey: Though made up, the name refers to the Roman roads common in Rockingham area. *Stan* means stone and Wey (or Way) means a thoroughfare, a road.
*   The King’s Brother (Robert Curthose): Henry I’s eldest brother, Robert, was Duke of Normandy. Their relationship was defined by bitter rivalry. Henry eventually defeated Robert at the Battle of Tinchebray (1106) and kept him imprisoned for the rest of his life—making the King’s jokes about Robert’s "wet wit" and "sodden toad" historically biting.
*   Prince Godfrey (The "Natural" Son): King Henry I is famously credited with fathering the most illegitimate children of any English monarch (over 20). While the "Lord Godfrey" of this story is fictional, Henry frequently used his "natural" children to build political bridges and reward loyal families.
*   The Saxon Thegn: Harold "Red-Wolf" represents the Thegns, the pre-Conquest Saxon nobility. While many lost their lands to Norman lords, some were kept on as foresters or local officials because of their deep knowledge of the terrain and their martial skill.
*   The "Peaceful Petitioner" Gesture: The act of raising both palms (ostentatio manuum) was a recognised legal and social gesture. It proved the petitioner was unarmed and was a common posture for those seeking mercy or making a formal request of a superior.
*   Maidenly Modesty (Hair and Rings): In the 12th century, loose, uncovered hair was the primary signifier of an unmarried maiden. Once married, a woman was socially and religiously required to wear a wimple or veil. Similarly, the absence of a ring or band on the hand and by naming her father's household, it is all clear enough that she is still under her father's "_mund__" (legal protection/guardianship). If she were married, she would have introduced herself as "Wife of [Name]" or "Of the household of [Name]." 
*   The Lamprey Legend: Henry I was famously fond of lampreys (eel-like jawless vertebrates). His death in 1135 was famously attributed by the chronicler Henry of Huntingdon to a "surfeit of lampreys," which the King ate against his physician's advice.
*   Queen Matilda’s Secret Heritage: Though the court called her by her Norman name, Matilda, she was born a Saxon princess named Edith. Her marriage to Henry I was a calculated political move to appease the English population. Because of her own Saxon roots, the Queen’s eventual "softening" toward Beatrice carries a deeper historical weight—she was, in a sense, welcoming another "She-Wolf" into the royal fold.

---


# **Teacher & Parent Notes**  
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

**Challenge:**  
Why might the king remember the Red‑Wolf even if many years have passed?

---

## **Chapter 2 — The King’s Demand**
1. What does the king want from the people of Stan‑Way?  
2. How do the villagers react to the king’s order?  
3. Why is Beatrice troubled by the king’s demand?  
4. What does this chapter show about the king’s personality?  
5. Creative: If you were in Beatrice’s place, what would you do?

**Challenge:**  
Is the king being unfair, or is he acting as a medieval king normally would? Explain your reasoning.

---

## **Chapter 3 — The King’s Frustration**
1. Why is the king angry in this chapter?  
2. How does the queen try to calm or advise him?  
3. What does this scene reveal about their relationship?  
4. Why does the king feel trapped by his own vow?  
5. Creative: Write one sentence of dialogue the queen *might* have said but didn’t.

**Challenge:**  
Why is a vow so difficult for a medieval king to break, even if it causes trouble?

---

## **Chapter 4 — Sir Guy’s Spite**
1. What does Sir Guy do that shows his spiteful nature?  
2. How does Beatrice respond to his behaviour?  
3. What does this chapter reveal about the difference between Beatrice and Sir Guy?  
4. Why might Sir Guy feel threatened by Beatrice?  
5. Creative: Describe Sir Guy using an animal metaphor (e.g., “as sly as…”).

**Challenge:**  
Is Sir Guy’s behaviour caused by pride, jealousy, or fear? Defend your answer.

---

## **Chapter 5 — The Goose Hunt**
1. What causes chaos in the king’s hall?  
2. How does the king react to the goose’s behaviour?  
3. What does Beatrice do when she enters the hall?  
4. Why is she afraid, and what helps her find courage?  
5. Creative: Draw or describe the goose chase in the hall.

**Challenge:**  
Why does the king spare the goose? Is it mercy, amusement, or something deeper?

---

## **Chapter 6 — The Red‑Wolf’s Daughter (Hall Scene)**
1. How does the king recognise Beatrice’s father?  
2. What story does Henry remember about his brother?  
3. Why does Henry decide to visit the Red‑Wolf?  
4. What does the king’s treatment of Sir Guy reveal about leadership?  
5. Creative: Write a short speech Henry might give when he visits Stan‑Way.

**Challenge:**  
Why does Henry value the Red‑Wolf’s old deed more than Sir Guy’s present service?

---

## **Chapter 7 — The Queen Remembers the Vow**
1. What vow does the queen remember?  
2. Why does the vow cause trouble now?  
3. How does the queen feel about the king’s promise?  
4. What does this chapter show about royal responsibility?  
5. Creative: Write a diary entry from the queen’s point of view.

**Challenge:**  
Is the queen more concerned with honour, politics, or her son’s future? Explain.

---

## **Chapter 8 — A Courtship No One Expected**
1. How does Godfrey react to meeting Beatrice?  
2. What surprises the court about their interaction?  
3. How does Beatrice behave during the courtship?  
4. What does this chapter reveal about Godfrey’s character?  
5. Creative: Imagine a short conversation between Beatrice and Godfrey after the feast.

**Challenge:**  
Why might Beatrice be a better match for Godfrey than the noble brides the queen prefers?

---

## **Chapter 9 — The Goose Bride**
1. How does the story resolve the king’s vow?  
2. What happens to Beatrice and Godfrey at the end?  
3. How does the goose play a role in the final outcome?  
4. What lesson does the king learn?  
5. Creative: Write a one‑sentence moral for the story.

**Challenge:**  
What is the true “gift” Beatrice brings to the royal family — and why is it more valuable than gold or tribute?

---


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

(C) 2024-2026 Andrew Kingdom all rights reserved. Licensed to 'Greek Fairy Tales'. May be reproduced for educational use.
